# Keplr
Simple ProcessingJS-like canvas editor

## CDN

Link Directly to this repository

```HTML
<script src="https://cdn.jsdelivr.net/gh/gemgames/keplr/keplr.min.js"></script>
```

## Demo

### HTML

Keplr is rendered on a canvas. Set width and height using the parameters below.

```HTML
<canvas class="keplr-canvas" width="400" height="400"></canvas>
```
Add the keplr.min.js file to your page. 

```HTML
<script src="https://cdn.jsdelivr.net/gh/gemgames/keplr/keplr.min.js"></script>
```
The rest will be added in a `<script>` tag.
```HTML
<script>
  // Code Goes Here
</script>
```

### JS
```JS
//Create a new "Keplr" canvas ( ".keplr-canvas" is a query selector for our canvas element.)

let canvas = new Keplr(".keplr-canvas");

...
//  Create a new "Keplr" canvas ( ".keplr-canvas" is a query selector for our canvas element.)

  let canvas = new Keplr(".keplr-canvas");

  //  .setup - Called on load.

  canvas.setup = function() {
    //  .log(text) - Log to the console - See Console logs with CTRL + SHIFT + I and click Console

    canvas.log("Hi Console!");
  };

  var x = 100, y=75;
  var directionX = 3, directionY = 3;
  
  //  .draw - Called every frame, used for animation

  canvas.draw = function() {
    //  .background(color) - Wipes the canvas clean with the color

    canvas.background("white");

    //  .fill(color) - Fills future shapes with the color

    canvas.fill("#FF0000"); // Hex Color Code for Red

    //  .stroke(color) - Fills future shapes' outline with the color

    canvas.stroke("#BB0000"); //Hex Color Code for Dark Red

    //  .circle(x, y, s) - Draws a circle at Coordinates x and y, with size s.

    canvas.circle(50, 50, 25);

    //  .rgb(r, g, b) - Creates a color in the format RGB.

    var blue = canvas.rgb(0, 128, 255);
    
    var darkblue = canvas.rgb(0, 100, 200);

    
    
    canvas.fill(blue);
    
    canvas.stroke(darkblue);

    //  .rect(x, y, w, h) - Draws a rectangle at Coordinates x and y, with width w and height h.

    canvas.rect(50, 50, 25, 25);
    
    //  .hsl(H, S, L) - Creates a color in the format HSL. S and L are percentages.
    
    var yellow = canvas.hsl(59,82,50);
    
    //  .hsv(H, S, V) OR .hsb(H, S, B) - Creates a color in the format HSV / HSB. S and V/B are percentages.
    
    var darkyellow = canvas.hsv(59, 91, 55) || canvas.hsb(59, 91, 55); 
    
    
    
    canvas.fill(yellow);
    
    canvas.stroke(darkyellow);
    
    //  .triangle(x1, y1, x2, y2, x3, y3) - Draws a triangle with each point at coordinates (x1, y1), (x2, y2), and (x3, y3).
    
    canvas.triangle(75, 62.5, 85.825,81.25,  64.175, 81.25);
    
    //  .font(font, size) - Changes future texts with the font and size
    
    canvas.font("Arial", 20);
    
    //  .text(text, x, y) - Draws Text.
    
    canvas.fill("black");
    
    canvas.text("Hello World!", 280, 50);
    
    
    //Create a ball that bounced on the edges of the canvas
    x += directionX;
    y += directionY;
    //canvas.log(x);
    if(x >= canvas.width - 25){ // .width - Gets width of canvas
      directionX = -3;
    }else if(x <= 25){
      directionX = 3;
    }
    
    if(y > canvas.height - 25){ // .height - Gets height of canvas
      directionY = -3;
    }else if(y < 25){
      directionY = 3;
    }
    
    canvas.fill("green");
    canvas.circle(x, y, 25);
  };
```

## Docs

### System

| **Properties** | Type | Description
| --- | --- | --- |
| `element` | HTMLCanvasElement | The element the library is working on.
| `ctx` | HTMLCanvasContext2D | The canvas context for the element above.
| `noop` | Function | No operation, eg `function() {}` or `()=>{}`
| `setup` | Function | The setup code. Runs when the document loads.
| `draw` | Function | The drawing code. Runs every frame for animation.
| `tk` | Number | Short for ticker. "Ticks" up every time .draw is called.
| `tab` | String | The "tab" character in a string. Some file editors replace tabs with spaces.
| `toggleAnimate` | Boolean | Whether or not to start drawing when the document loads or when `.animate()` is called.

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `.log(str)` | String |  | Logs to the console.
| `.warn(str)` | String |  | Puts a warning in the console.
| `.error(str)` | String |  | Puts an error in the console.
| `.animate()` |  |  | Starts drawing frames for animation.

### Math

| **Properties** | Type | Description
| --- | --- | --- |
| `EULER` | Number | Euler's number.
| `PI` | Number | Pi (3.14).
| `TAU` | Number | Tau (6.28). Equivalent to `2 * PI`


| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `.round(n)` | Number | Number | Rounds give number.
| `.power(n,power)` | Number, Number | Number | Set `n` to a power of `power`.
| `.sqrt(n)` | Number | Number | Returns the square root of given number.
| `.abs(n)` | Number | Number | Returns the absolute value of a given number.
| `.ceil` | Number | Number | 
| `.` |  | 
| `.` |  | 

### 

| **Properties** | Type | Description
| --- | --- | --- |
| `` |  | 
| `` |  | 
| `` |  | 
| `` |  | 


| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `.` |  |  |
| `.` |  |  |
| `.` |  |  |
| `.` |  |  |

### 

| **Properties** | Type | Description
| --- | --- | --- |
| `` |  | 
| `` |  | 
| `` |  | 
| `` |  | 


| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `.` |  |  |
| `.` |  |  |
| `.` |  |  |
| `.` |  |  |
