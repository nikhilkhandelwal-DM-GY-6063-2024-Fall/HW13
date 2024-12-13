const int potPin = A0;    // Potentiometer pin
const int buttonPin = 2;  // Button pin
int potValue = 0;         // Potentiometer reading
bool buttonState = false; // Button state
bool prevButtonState = false;
bool toggleState = false; // Toggle state for button

void setup() {
  Serial.begin(9600);      // Start serial communication
  pinMode(buttonPin, INPUT_PULLUP);  // Configure button with pull-up resistor
}

void loop() {
  // Wait for a synchronization signal from p5.js
  if (Serial.available() > 0) {
    byte command = Serial.read();
    if (command == 0xAB) {
      potValue = analogRead(potPin);  // Read potentiometer
      buttonState = digitalRead(buttonPin) == LOW;  // Read button state
      
      // Toggle state when button is pressed
      if (buttonState && !prevButtonState) {
        toggleState = !toggleState;
      }
      prevButtonState = buttonState;

      // Send data as JSON (Potentiometer and Toggle State)
      Serial.print(potValue);
      Serial.print(",");
      Serial.println(toggleState);
    }
  }
}
