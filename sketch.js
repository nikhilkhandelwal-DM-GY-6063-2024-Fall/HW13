let mSerial;                     // Serial object
let connectButton;               // Button to connect serial port
let cBackgroundColor = 0;        // Background color
let circleColor = 'red';         // Circle color
let potValue = 0;                // Potentiometer value
let toggleState = false;         // Button toggle state

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize serial communication
  mSerial = createSerial();

  // Button to connect to serial port
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2 - 50, height / 2);
  connectButton.mousePressed(connectToSerial);

  readyToReceive = false;        // Initial communication state
}

function draw() {
  background(cBackgroundColor);  // Set dynamic background color

  // Draw circle with toggle-based color
  fill(toggleState ? 'blue' : 'red');
  noStroke();
  ellipse(width / 2, height / 2, 200);

  // Communication logic
  if (mSerial.opened() && readyToReceive) {
    mSerial.clear();
    mSerial.write(0xAB);         // Send synchronization signal to Arduino
    readyToReceive = false;
  }

  // If serial data is available, process it
  if (mSerial.availableBytes() > 0) {
    receiveSerial();
  }
}

function receiveSerial() {
  let mLine = mSerial.readUntil("\n"); // Read the incoming line
  let values = mLine.split(",");       // Split data into two values

  if (values.length == 2) {
    potValue = int(values[0]);         // Potentiometer value
    toggleState = values[1].trim() === "1"; // Button toggle state
    cBackgroundColor = map(potValue, 0, 1023, 0, 255, true); // Map background
  }
  readyToReceive = true;
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);         // Open the serial port
    connectButton.hide();       // Hide the connection button
    readyToReceive = true;      // Ready to send requests
  }
}
