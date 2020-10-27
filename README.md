# Keplr
Simple ProcessingJS-like canvas editor

## CDN

Link Directly to this repository

```HTML
<script src="https://cdn.jsdelivr.net/gh/gemgames/keplr@1.0/keplr.min.js"></script>
```
## Demos

[Hello World](https://gemgames.github.io/keplr/docs/helloworld.html)

[Embed](https://gemgames.github.io/keplr/docs/embed.html)

[All Shapes](https://gemgames.github.io/keplr/docs/allshapes.html)

## Demo

### HTML

Keplr is rendered on a canvas. Set width and height using the parameters below.

```HTML
<canvas class="keplr-canvas" width="400" height="400"></canvas>
```
Add the keplr.min.js file to your page. 

```HTML
<script src="https://cdn.jsdelivr.net/gh/gemgames/keplr@1.0/keplr.min.js"></script>
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

### SYSTEM

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
| `log(str)` | String |  | Logs to the console.
| `warn(str)` | String |  | Puts a warning in the console.
| `error(str)` | String |  | Puts an error in the console.
| `animate()` |  |  | Starts drawing frames for animation.

### MATH

| **Properties** | Type | Description
| --- | --- | --- |
| `EULER` | Number | Euler's number.
| `PI` | Number | Pi (3.14).
| `TAU` | Number | Tau (6.28). Equivalent to `2 * PI`


| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `round(n)` | Number | Number | Rounds give number. 
| `power(n,power)` | Number, Number | Number | Set `n` to a power of `power`.
| `sqrt(n)` | Number | Number | Returns the square root of given number.
| `abs(n)` | Number | Number | Returns the absolute value of a given number.
| `ceil(n)` | Number | Number | Returns the number rounded up
| `floor(n)` | Number | Number | Returns the number rounded down
| `min(a,b,c, ...)` | Number, Number(optional), Number(optional) ... | Number | Returns the smallest number
| `max(a,b,c, ...)` | Number, Number(optional), Number(optional) ... | Number | Returns the biggest number
| `squ(n)` | Number | Number | Returns the given number squared.
| `random(m)` | Number | Number | Returns a random number from 0 to `m`
| `randInt(m)` | Number | Number | Returns a random Integer from 0 to `m`
| `dist(x1,y1,x2,y2)` | Number x4 | Number | Returns the 2-dimensional length from coordinate 1 to 2
| `mag(x,y)` | Number, Number | Number | Returns the 2-dimensional length from (0,0) to give coordinate
| `norm(num,low,high)` | Number, Number, Number | Number | Normalizes a number from another range into a value between 0 and 1. 
| `map(num, low1, high1, low2, high2)` | Number x5 | Number | Re-maps a number from one range to another.
| `lerp(low,high,amount)` | Number, Number, Number | Number | Calculates a number between two numbers at a specific increment.



### TRIGONOMETRY

| **Properties** | Type | Description
| --- | --- | --- |
| `angleMode` | String | The anglemode. Either degrees ( "DEG" ) or radians ( "RAD" )


| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `angleModeIsDeg()` |  | Boolean | Returns if the angle mode is Degrees.
| `deg(n)` | Number | Number | Converts `n` from radians to degrees.
| `rad(n)` | Number | Number | Converts `n` from degrees to radians.
| `sin(n)` | Number | Number | Returns the sine of `n`.
| `cos(n)` | Number | Number | Returns the cosine of `n`.
| `tan(n)` | Number | Number | Returns the tangent of `n`.
| `asin(n)` | Number | Number | Returns the arc sine of `n`.
| `acos(n)` | Number | Number | Returns the arc cosine of `n`.
| `atan(n)` | Number | Number | Returns the arc tangent of `n`.
| `atan2(x,y)` | Number | Number | Calculates the angle a coordinate is to the origin. **NOTE: X, then Y.**

### TRANSFORM

| **Properties** | Type | Description
| --- | --- | --- |
| `rotateAngle` |  | System purposes. The angle future shapes are rotated to.


| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `translate(x,y)` | Number, Number |  | Translates the canvas, moving the origin by `(x ,y)`.
| `scale(x,y)` | Number, Number |  | Scales the canvas along `x` and `y` scaling factors
| `rotate(amount)` | Number |  | Rotates **just the next shape** by `amount`.
| `rotateAll(amount)` | Number |  | Rotates the canvas around the origin by `amount` .


### CANVAS CTX

| **Properties** | Type | Description
| --- | --- | --- |
| `fillStyle` | String | The fill style used in filling future elements. (Use `fill()` to change)
| `strokeStyle` | String | The stroke style used in coloring the outlines in future elements. (Use `stroke()` to change)
| `lineWidth` | Number | The width of the outlines in future elements (Use `strokeWidth()` or `lineWidth()` to change)
| `width` | Number | The width of the canvas element
| `height` | Number | The height of the canvas element

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `rect(x,y,w,h)` | Number x4 |  | Draws a rectangle on the canvas with the top left being at `(x,y)` stretching to `(w,h)`
| `circle(x,y,s)` | Number x3 |  | Draws a circle on the canvas with the middle being at `(x,y)` and diameter as `s`.
| `ellipse(x,y,w,h)` | Number x4 |  | Draws an ellipse on the canvas with the middle being at `(x,y)`, diameter x as `w`, and diameter y as `h`.
| `line(x1,y1,x2,y2)` | Number x4 |  | Draws a line on the canvas with the starting coordinate as `(x1,y1)` and ending coordinate as `(x2,y2)`.
| `triangle(x1,y1,x2,y2,x3,y3)` | Number x6 |  | Draws a triangle on the canvas at coordinates.
| `quad(x1,y1,x2,y2,x3,y3,x4,y4)` | Number x8 |  | Draws a quadrilateral on the canvas at coordinates.
| `point(x,y)` | Number, Number |  | Draws a point on the canvas at coordinate `(x,y)`.
| `bezier(x1,y1,cx1,cy1,cx2,cy2,x2,y2)` | Number x8 |  | Draws a bezier starting at `(x1,y1)` ending at `(x2,y2)` with control points `(cx1,cy1), (cx2,cy2)`.
| `quadBezier(x1,y1,cx,cy,x2,y2)` | Number x6 |  | Draws a quadratic bezier starting at `(x1,y1)` ending at `(x2,y2)` with a control point `(cx,cy)`.
| `path(d)` | String |  | Draws a path using [SVG Path](https://www.w3schools.com/graphics/svg_path.asp) Notation.
| `background(col)` | String |  | Wipes the canvas clean with the color `col`.
| `fill(col)` | String |  | Fills future shapes with color `col`.
| `noFill()` | String |  | Future shapes will have a transparent fill area.
| `stroke(col)` | String |  | Fills future shape outlines with color `col`.
| `noStroke(col)` | String |  | Future shapes will not have an outline.
| `strokeWidth(n)` OR `strokeWeight(n)` OR `lineWidth(n)` | Number |  | Future shapes will have a outline with width `n`.
| `strokeJoin(mode)` OR `lineJoin(mode)` | String |  | Changes the mode on how lines look bent. `mode` can be "bevel", "round", or "miter". Defaults to "round".

### IMAGES

| **Properties** | Type | Description
| --- | --- | --- |
| `images` | Object | An object filled with the loaded images

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `loadImage(name, src)` | String, String |  | Used in setup. Loads an image into `.images` with the nickname `name`.
| `image(name, x,y)` | String, Number, Number |  | Draws an the name of the image on screen at given coordinates

### COLORS

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `linearGradient(x1,y1,x2,y2,colors)` | Number x4, Array of Arrays |  | Creates a linear gradient in [CanvasGradient])https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient) form moving from `(x1,y1)` to `(x2,y2)`. Colors are in arrays next to their position. eg. `linearGradient(0,0,100,100,[ [0, "red"], [0.5, "yellow"], [1, "blue"] ])`.
| `radialGradient(x,y,r0,r1,colors)` | Number x4, Array of Arrays |  | Creates a radial gradient in [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient) form at coordinate `(x,y)` with a starting radius `r0` and ending radius `r1`. Colors are in arrays next to their position. eg. `linearGradient(0,0,100,100,[ [0, "red"], [0.5, "yellow"], [1, "blue"] ])`.
| `rgb(r,g,b)` | Number x3 | String | Makes a color in RGB form. `r`, `g`, and `b` are out of 255.
| `rgba(r,g,b,a)` | Number x4 | String | Makes a color in RGBA form. `r`, `g`, `b`, and `a` are out of 255.
| `hsl(h,s,l)` | Number x3 | String | Makes a color in HSL form. `h` is out of 360. `s` and `l` are out of 100.
| `hsla(h,s,l,a)` | Number x4 | String | Makes a color in HSLA form. `h` is out of 360. `s` and `l` are out of 100. `a` is out of 1.
| `hsv(h,s,v)` OR `hsb(h,s,b)` | Number x3 | String | Makes a color in HSV / HSB form. `h` is out of 360. `s` and `v` or `b` are out of 100.
| `hsva(h,s,v)` OR `hsba(h,s,b)` | Number x4 | String | Makes a color in HSVA / HSBA form. `h` is out of 360. `s` and `v` or `b` are out of 100. `a` is out of 1.

### TEXT

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `font(font,size)` | String, Number |  | Sets the font for future text elements.
| `textAlign(align)` | String |  | Sets the alignment for future text elements. Options: "start", "end", "left", "center", "right", 
| `text(str,x,y)` | String, Number, Number |  | Draws Text on the canvas.
| `textWidth(str)` | String | Number | Returns the width of measured text by string.

### TIME

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `day()` |  | Number | Returns the date.
| `month()` |  | Number | Returns the month
| `year()` |  | Number | Returns the year
| `hour()` |  | Number | Returns the hour
| `minute()` |  | Number | Returns the minutes (out of 60)
| `second()` |  | Number | Returns the seconds
| `millis()` |  | Number | Returns the amount of milliseconds

### KEYBOARD

| **Properties** | Types  | Description |
| --- | --- | --- |
| `keyPressed` | Function | Called when a key is pressed
| `keyTyped` | Function | Called when a key is typed
| `keyReleased` | Function | Called when a key is released

### MOUSE

| **Properties** | Types  | Description |
| --- | --- | --- |
| `mouseClicked` | Function | Called when the mouse is clicked.
| `mousePressed` | Function | Called when the mouse is pressed.
| `mouseReleased` | Function | Called when the mouse is released.
| `mouseMoved` | Function | Called when the mouse is moved.
| `mouseOver` | Function | Called when the mouse is over the canvas.
| `mouseOut` | Function | Called when the mouse is out of the canvas.

### EMBED

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| embed(embed) | String |  | Draws a Keplr Embed

#### Keplr Embed Examples
| Keplr Embed | JS Equivalent |
| --- | --- |
| `<rect 0,0,100,100>` | rect(0,0,100,100); |
| `<rect 0,0,100,100 fill="#FF0000">` | fill("#FF0000"); rect(0,0,100,100); |
| `<image "dog",100,100>` | image("dog",100,100);
| `<text "Hello World!",100,100 font="Arial",20 fill="blue">` | fill("blue"); font("Arial",20); text("Hello World!",100,100);

### PROTOTYPE

#### Array Methods

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `equals(array)` | Array | Boolean | Returns if `this` array equals `array`
| `last(i)` | Number | Mixed | Returns the `i`th to last index (If blank, returns the last index)
| `swap(a,b)` | Number |  | Swaps the value at index `a` with index `b`.

#### String Methods

| **Methods** | Types | returns | Description |
| --- | --- | --- | --- |
| `last(i)` | Number | Mixed | Returns the `i`th to last character (If blank, returns the last character)
| `replaceAll(a,b)` | String, String |  | Replaces All parts of `a` with `b`.


## Feel free to make pull requests!
