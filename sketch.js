let mSerial;                 // Serial object
let connectButton;           // Button to connect to serial
let readyToReceive;          // Flag to track readiness
let cBackgroundColor;        // Background color value

function receiveSerial() {
  let mLine = mSerial.readUntil("\n"); // Read serial data line
  let sensorVal = int(mLine);          // Convert to integer
  print(mLine, sensorVal);             // Print for debugging
  
  // Map potentiometer value (0-1023) to background color (0-255)
  cBackgroundColor = map(sensorVal, 0, 1023, 0, 255, true);
  readyToReceive = true;  // Ready to send the next request
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);    // Open serial port with baud rate 9600
    connectButton.hide();  // Hide the connect button
    readyToReceive = true; // Allow sending sync command
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize serial communication
  mSerial = createSerial();

  // Create a button to connect to serial port
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2 - 50, height / 2);
  connectButton.mousePressed(connectToSerial);

  cBackgroundColor = 0;  // Default background color
  readyToReceive = false; // Start as not ready to send
}

function draw() {
  background(cBackgroundColor); // Set background color dynamically

  // If serial port is open and ready to communicate
  if (mSerial.opened() && readyToReceive) {
    mSerial.clear();           // Clear any old data in the buffer
    mSerial.write(0xAB);       // Send sync command to Arduino
    readyToReceive = false;    // Wait until we receive data back
  }

  // Check for available serial data
  if (mSerial.availableBytes() > 0) {
    receiveSerial();  // Handle incoming data
  }
}