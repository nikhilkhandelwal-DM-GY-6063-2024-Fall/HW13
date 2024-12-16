let mSerial;
let connectButton;
let potValue = 0;
let buttonState = 0;
let toggleColor = false;
let circleSize = 30;
let circleColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(235, 214, 1);

  mSerial = createSerial();

  // Add a connect button
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2 - 50, height / 2);
  connectButton.mousePressed(connectToSerial);

  // Default circle color
  circleColor = color(0, 0, 0);
}

function draw() {
  background(235, 214, 1);

  // Receive data if serial is available
  if (mSerial.opened() && mSerial.availableBytes() > 0) {
    receiveSerial();
  }

  // For the Bigger Circles
  for (let y = 0; y < height; y += 100) {
    for (let x = 0; x < width; x += 100) {
      fill(circleColor);
      ellipse(x, y, circleSize); // Size controlled dynamically
    }
  }

  // For the Smaller Circles
  for (let y = 0; y < height; y += 50) {
    for (let x = 0; x < width; x += 50) {
      fill(circleColor);
      ellipse(x, y, circleSize / 3); // Smaller circles scaled down
    }
  }

  // For the Bigger Circles in Alternate Rows
  for (let y = 50; y < height; y += 100) {
    for (let x = 50; x < width; x += 100) {
      fill(circleColor);
      ellipse(x, y, circleSize); // Size controlled dynamically
    }
  }
}

// Connect to serial port
function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);
    connectButton.hide();
  }
}

// Receive data from Arduino
function receiveSerial() {
  let jsonString = mSerial.readUntil("\n"); // Read incoming JSON data
  if (jsonString) {
    try {
      let data = JSON.parse(jsonString);
      potValue = data.potValue;         
      buttonState = data.buttonState;    

      // Update circle size based on potentiometer value (30–100)
      circleSize = map(potValue, 0, 1023, 30, 100);

      // Change circle color dynamically when button is pressed
      if (buttonState === 1) {
        if (!toggleColor) {
          circleColor = color(random(255), random(255), random(255));
          toggleColor = true;
        }
      } else {
        toggleColor = false; // Reset toggle state when button is released
      }

    } catch (e) {
      console.error("JSON Parse Error:", e);
    }
  }
}
