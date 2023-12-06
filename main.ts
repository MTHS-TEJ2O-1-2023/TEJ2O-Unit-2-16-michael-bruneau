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
  distanceFromObject = sonar.ping(
    DigitalPin.P1, 
    DigitalPin.P2, 
    PingUnit.Centimeters
  )
  basic.showNumber(distanceFromObject)
  basic.pause(500)
  if (distanceFromObject <= 10) {
    radio.sendNumber(distanceFromObject)
    basic.pause(500)
    radio.sendString('To close.')
  } else {
    radio.sendNumber(distanceFromObject)
    radio.sendString('Good.')
  }
})

radio.onReceivedString(function (receivedString) {
  basic.clearScreen()
  basic.showString(receivedString)
  basic.pause(500)
  basic.showIcon(IconNames.Happy)
})
