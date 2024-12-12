let serial; // Serial port
let potValue = 500; // Potentiometer default value
let buttonState = false; // Button state
let circleColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Setup serial communication
  serial = new p5.SerialPort();
  serial.on('connected', () => console.log('Serial connected'));
  serial.on('open', () => console.log('Serial port opened'));
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', () => console.log('Serial port closed'));

  // Replace with the correct port name
  serial.open('/dev/cu.usbmodem0001'); // Example for macOS
}

function draw() {
  background(235, 214, 1);
  
  // Map potentiometer value for circle size
  let bigCircleSize = map(potValue, 0, 1023, 20, 100);
  let smallCircleSize = map(potValue, 0, 1023, 5, 30);

  // Toggle color based on button
  circleColor = buttonState ? color(255, 0, 0) : color(0, 0, 0);

  fill(circleColor);
  noStroke();

  // Bigger circles
  for (let y = 0; y < height; y += 100) {
    for (let x = 0; x < width; x += 100) {
      ellipse(x, y, bigCircleSize);
    }
  }

  // Smaller circles
  for (let y = 0; y < height; y += 50) {
    for (let x = 0; x < width; x += 50) {
      ellipse(x, y, smallCircleSize);
    }
  }

  // Bigger circles in alternate rows
  for (let y = 50; y < height; y += 100) {
    for (let x = 50; x < width; x += 100) {
      ellipse(x, y, bigCircleSize);
    }
  }
}

function serialEvent() {
  let jsonString = serial.readLine(); // Read incoming JSON
  if (jsonString.length > 0) {
    try {
      let json = JSON.parse(jsonString);
      potValue = json.pot; // Potentiometer value
      buttonState = json.button; // Button state
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  }
}

function serialError(err) {
  console.error("Serial error: ", err);
}
