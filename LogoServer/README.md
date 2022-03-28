## Backend Coding Exercise

### Overview

This purpose of this test is to build a TCP server implementing a simple protocol very loosely inspired by [LOGO](https://en.wikipedia.org/wiki/Logo_(programming_language)). When a client connects, it will be able to send simple commands to the server to draw on a canvas. It will also call ask the server to render the current canvas.

We recommend you use whatever language or frameworks you feel strongest in. It doesn’t have to be one we use – we believe good engineers can be productive in any language. The provided client and tests are implemented using Node.js, but should work with your server regardless of language choice.

Note: please don’t publish your code online, as we intend to reuse this test.

Good luck (and good skills)!

### Setup

Download the starter files to the left. Install the latest version of node.js and run npm install inside of the folder. Then, run npm test to run the test suite. It will connect to your server, run several commands and verify the output.

### Specification

When a client connects, the server will allocate a canvas. The state of the canvas is defined by:

    - The canvas itself: a 30x30 buffer.
    - The cursor, which is initially located at (15,15).
    - The current direction, which is initially set to top.

The server will then receive commands to modify this state and draw on the canvas.

### The LOGO Server

The server should open a local TCP socket on port 8124. The server accepts commands separated by newlines (\r\n). All server responses are also terminated by \r\n.

    - steps <n>: move the cursor n steps in the current direction.
    - left <n>, right <n>: change the direction (see “Directions” below).
    - hover, draw, eraser: set the brush mode (see “Drawing” below).
    - coord: print the current coordinates of the cursor with the format (x,y).
    - render: print the current canvas.
    - clear: erase the current canvas, while keeping the current cursor and direction.
    - quit: closes the current connection.

At any time, the client can send the render command to print the current canvas (surrounded by a frame for clarity). For example, the following commands will result in this output:

```
> steps 1
> render
╔══════════════════════════════╗
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║               *              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
║                              ║
╚══════════════════════════════╝
```

The font makes the canvas appear rectangular, but it’s actually a 30x30 square.

### Directions

The server supports 8 directions: top, top-right, right, bottom-right, bottom, bottom-left, left and top-left. The *left* and *right* commands can cycle through directions. The initial direction is *top*.

For example, if the current direction is top, *right 3* will set it to bottom-right.

### Coordinates

The top left coordinate is (0, 0). X increases when you move to the right, while Y increase when you move to the bottom.

### Drawing

The *steps 1* command will (possibly) modify the current position and move the cursor 1 step in the current direction. *steps <n>* simply repeat the operation multiple times. How the current coordinate is modified depends on the drawing mode:

    - hover: do not change the canvas.
    - draw: leave * behind.
    - eraser: leave ` ` (space) behind.

If a steps command would cause the cursor to move outside of the boundaries, the cursor will stop at the boundary.

### Rendering

The canvas is always surrounded by a frame when rendered by the server (see previous example). Each line is separated by *\r\n*. The final line is followed by *\r\n\r\n* to indicate the end of the command.

The outer frame should use the appropriate characters from the [Unicode box-drawing character set](https://en.wikipedia.org/wiki/Box-drawing_character).

## Wrapping up

### Testing

The starter code for the exercise includes an example client and a collection of tests which you can use to check the basic functionality of your code. You will notice that these tests will verify whether your server responed as expected, but do not give any details on the correct expected output for each case.

As always, remember that while unit tests can provide useful guidance, passing the tests does not guarantee that the server code is 100% correct.

When testing your server against the example client, you can assume that the client is correct: That is, the completed server you submit should be able to interact with the client as given without making any changes to the *client.js* file.

## Submitting your code

Your final submission for this exercise should be a zip file or tarball including:

    - The source code for the completed program.
    - A brief *README* containing a description of your approach and instructions on how to build and run the server.
    - Any additional libraries or frameworks needed to run your code, or instructions for installing them.

Before submitting, take a moment to ensure that your code is clear and legible: While production-quality code isn’t strictly necessary in this context, readability goes a long way.

We’ll review the submission based on correctness, architecture, and coding style.
