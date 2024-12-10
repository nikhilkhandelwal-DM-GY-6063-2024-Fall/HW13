#include <ArduinoJson.h>

const int potPin = A0;     // Potentiometer Pin
const int buttonPin = 2;   // Button Pin
int potValue = 0;
bool buttonState = false;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLDOWN); // Use internal pull-down resistor
}

void loop() {
  potValue = analogRead(potPin);      // Read potentiometer value
  buttonState = digitalRead(buttonPin); // Read button state
  
  // Create JSON object
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["pot"] = potValue;
  jsonDoc["button"] = buttonState;

  // Serialize and send JSON data
  serializeJson(jsonDoc, Serial);
  Serial.println();

  delay(100); // Avoid spamming serial port
}
