#include <ArduinoJson.h>

const int potPin = A0;    // Potentiometer connected to A0
const int buttonPin = 2;  // Button connected to pin 2
int potValue = 0;
bool buttonState = false;
bool prevButtonState = false;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);  // Button with pull-up resistor
}

void loop() {
  potValue = analogRead(potPin);  // Read potentiometer value
  buttonState = digitalRead(buttonPin) == LOW;  // Read button state

  // Detect button press and toggle state
  static bool toggleState = false;
  if (buttonState && !prevButtonState) {
    toggleState = !toggleState; // Toggle circle color
  }
  prevButtonState = buttonState;

  // Create JSON object to send data
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["pot"] = potValue;
  jsonDoc["colorToggle"] = toggleState;

  serializeJson(jsonDoc, Serial);
  Serial.println();
  delay(50); // To prevent flooding the serial port
}
