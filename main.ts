/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Michael Bruneau
 * Created on: Dec 2023
 * This program ...
*/

// setup
radio.setGroup(7)
basic.showIcon(IconNames.Happy)

input.onButtonPressed(Button.A, function () {
  sonar.ping(
    DigitalPin.P1, 
    DigitalPin.P2, 
    PingUnit.Centimeters
  )
})
