# HW13 - Physical Computing with Arduino and p5.js

## Project Overview  
In this project, I added a physical computing component to a previous p5.js sketch. Using an **Arduino** connected to a **potentiometer** and a **button**, the sketch dynamically changes its behavior:
1. The **potentiometer** controls the **size** of the circles.
2. The **button** toggles the **circle colors** randomly when pressed.

---

## How It Works  

### Arduino Logic
- The **potentiometer** sends values (0–1023) from pin `A0` to the p5.js sketch, which maps them to circle sizes ranging from 20–100 pixels.
- The **button** (connected to pin `D2`) detects when it is pressed and toggles random colors for the circles.

The Arduino sends these values as **JSON strings** over the serial port.

### Circuit Description
1. **Potentiometer**:
   - Center pin → `A0`.
   - Side pins → 5V and GND.
2. **Button**:
   - One pin → `D2`.
   - Other pin → GND (using `INPUT_PULLUP` for simplicity).

---

## Circuit Diagram  
![Circuit Diagram](https://github.com/nikhilkhandelwal-DM-GY-6063-2024-Fall/HW13/blob/main/circuit_13.png)  

---

## p5.js Sketch
The p5.js sketch:
- Receives **serial data** using the `p5.serialport` library.
- Maps the potentiometer value to dynamically adjust circle sizes.
- Uses button input to toggle random circle colors.

---

## Finite State Machine
A simple state machine is implemented for the button:
- **State 0**: Default color (button not pressed).
- **State 1**: Random circle colors (button pressed).

---

## Video Demo  
[Link to Project Demo](https://github.com/nikhilkhandelwal-DM-GY-6063-2024-Fall/HW13/blob/main/IMG_0724.mp4)  

---

## Code Files  
- `arduino_code.ino`: Arduino logic.
- `p5_sketch.js`: p5.js code for the sketch.
