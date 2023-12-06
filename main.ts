/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Michael Bruneau
 * Created on: Dec 2023
 * This program ...
*/

// variables
let distanceFromObject: number = 0

// setup
radio.setGroup(7)
basic.showIcon(IconNames.Happy)

input.onButtonPressed(Button.A, function () {
  basic.clearScreen()

  // checking distance
  distanceFromObject = sonar.ping(
    DigitalPin.P1, 
    DigitalPin.P2, 
    PingUnit.Centimeters
  )
  basic.showNumber(distanceFromObject)
  basic.pause(500)

  // if distanceFromObject is less then or equal to 10 display to close if not dislay ok
  if (distanceFromObject <= 10) {
    radio.sendString('To close.')
  } else {
    radio.sendString('Good.')
  }
})

// waiting for string from other microbit
radio.onReceivedString(function (receivedString) {
  basic.clearScreen()
  basic.showString(receivedString)
  basic.pause(500)
  basic.showIcon(IconNames.Happy)
})
