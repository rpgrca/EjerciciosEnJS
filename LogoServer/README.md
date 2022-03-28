## Backend Coding Exercise

### Overview

This purpose of this test is to build a TCP server implementing a simple protocol very loosely inspired by [LOGO](https://en.wikipedia.org/wiki/Logo_(programming_language)). When a client connects, it will be able to send simple commands to the server to draw on a canvas. It will also call ask the server to render the current canvas.

[Read all](https://frontapp.github.io/front-backend-exercise/2019-06-14-dbd77b/)

### Instructions

Simple approach in plain C. Working with unicode characters is painful as the few string functions available only work with ASCII so had to revert working with bytes instead making the render method hard to understand.

Compile with GCC (tried under Ubuntu).

```
# gcc server.c -o server -Wall
# ./server
Waiting connections at port 8124...
```

Then run tests from another console with *npm test*.
