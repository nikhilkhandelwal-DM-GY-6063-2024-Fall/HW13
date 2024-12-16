const int potPin = A0;   
const int buttonPin = 2;  
int potValue = 0; 
int buttonState = 0;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  potValue = analogRead(potPin);
  buttonState = digitalRead(buttonPin) == LOW ? 1 : 0;

  // Send data as a JSON string
  Serial.print("{\"potValue\":");
  Serial.print(potValue);
  Serial.print(",\"buttonState\":");
  Serial.print(buttonState);
  Serial.println("}");

  delay(50);
}
