"""
Created by: Michael Bruneau
Created on: Dec 2023
This module is a Micro:bit MicroPython program
"""

from microbit import *
import radio


class HCSR04:
    # this class abstracts out the functionality of the HC-SR04 and
    #   returns distance in mm
    # Trig: pin 1
    # Echo: pin 2
    def __init__(self, tpin=pin1, epin=pin2, spin=pin13):
        self.trigger_pin = tpin
        self.echo_pin = epin
        self.sclk_pin = spin

    def distance_mm(self):
        spi.init(
            baudrate=125000,
            sclk=self.sclk_pin,
            mosi=self.trigger_pin,
            miso=self.echo_pin,
        )
        pre = 0
        post = 0
        k = -1
        length = 500
        resp = bytearray(length)
        resp[0] = 0xFF
        spi.write_readinto(resp, resp)
        # find first non zero value
        try:
            i, value = next((ind, v) for ind, v in enumerate(resp) if v)
        except StopIteration:
            i = -1
        if i > 0:
            pre = bin(value).count("1")
            # find first non full high value afterwards
            try:
                k, value = next(
                    (ind, v)
                    for ind, v in enumerate(resp[i : length - 2])
                    if resp[i + ind + 1] == 0
                )
                post = bin(value).count("1") if k else 0
                k = k + i
            except StopIteration:
                i = -1
        dist = -1 if i < 0 else round(((pre + (k - i) * 8.0 + post) * 8 * 0.172) / 2)
        return dist


# variables
sonar = HCSR04()


# setup
radio.on()
radio.config(group=7)
display.show(Image.HAPPY)

# loop
while True:
    if button_a.is_pressed():
        # checking distance
        distance = sonar.distance_mm() / 10
        display.scroll((str(distance)) + ("cm"))
        sleep(500)

        # if distance is less than or equal to 10 send to close if not send good
        if distance <= 10:
            radio.send("to close")
        else:
            radio.send("good")

    message = radio.receive()

    # if message is sent display message to other microbit
    if message:
        display.clear()
        display.scroll(message)
