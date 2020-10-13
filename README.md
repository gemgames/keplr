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

```
