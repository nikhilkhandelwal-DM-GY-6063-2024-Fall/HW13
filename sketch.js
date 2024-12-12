let serial;                     // Serial communication object
let potValue = 0;               // Potentiometer value
let circleColor;                // Circle color
let circleSize = 30;            // Default circle size
let toggleColor = false;        // State for button toggle

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleColor = color(0, 0, 0); // Default color: Black

  // Setup serial communication
  serial = new p5.SerialPort();
  serial.open('/dev/tty.usbmodemXXXX'); // Replace with your port
  serial.on('data', serialEvent);
}

function draw() {
  background(235, 214, 1); // Background color

  // Map potentiometer to circle size
  circleSize = map(potValue, 0, 1023, 10, 100);

  // Update circle color based on toggle
  circleColor = toggleColor ? color(255, 0, 0) : color(0, 0, 0); // Red or Black

  // Draw the grid of circles
  for (let y = 0; y < height; y += 100) {
    for (let x = 0; x < width; x += 100) {
      fill(circleColor);
      noStroke();
      ellipse(x, y, circleSize);
    }
  }
}

function serialEvent() {
  let data = serial.readLine(); // Read serial data
  if (data.length > 0) {
    try {
      let json = JSON.parse(data);
      potValue = json.pot;
      toggleColor = json.colorToggle; // Toggle state from button
    } catch (err) {
      console.log("Error parsing JSON:", err);
    }
  }
}
