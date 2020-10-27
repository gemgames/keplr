/* Keplr 1.0 */
Array.prototype.equals = function(array) {
  if (!array) return false;
  if (this.length != array.length) return false;
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] !== array[i]) {
      return false;
    }
  }
  return true;
};
Array.prototype.last = function(a) {
  return this[this.length - (a == undefined ? 1 : a)];
};
Array.prototype.swap = function(a, b) {
  let t = this[a];
  this[a] = this[b];
  this[b] = t;
};
String.prototype.last = function(a) {
  return this[this.length - (a == undefined ? 1 : a - 1)];
};
String.prototype.replaceAll = function(a, b) {
  return this.replace(new RegExp(a, "g"), b);
};
HTMLCollection.prototype.last = function(a) {
  return this[this.length - (a == undefined ? 1 : a)];
};

var Keplr = class {
  constructor(canvas) {
    //SYSTEM    element,ctx,log,warn,error,noop,tk,toogleAnimate
    this.element = document.querySelector(canvas);
    if (this.element == null) throw new Error("Query Selector returned null.");
    this.ctx = this.element.getContext("2d");
    this.log = console.log;
    this.warn = console.warn;
    this.error = console.error;
    this.noop = () => {};
    this.tk = 0;
    this.tab = String.fromCharCode(9);
    this.toggleAnimate = 1;
    this.lastTarget = { outerHTML: "a" };
    this.checkTarget = function() {
      return this.lastTarget.outerHTML.substring(1, 6) != "input";
    };

    this.CREDITS = "Made by Gem Games (2020)";

    //CTX SETUP
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = "#ffffff";
    this.ctx.strokeStyle = "black";
    this.ctx.font = "20px Arial";

    this.FunctionNames =
      "element,ctx,log,warn,error,noop,tk,tab,toggleAnimate,lastTarget,checkTarget" +
      "EULER,pi,tau,round,power,sqrt,abs,ceil,floor,min,max,squ,random,randInt,dist,mag,norm,map,lerp," +
      "angleMode,angleModeisDeg,deg,rad,sin,cos,tan,asin,acos,atan," +
      "rotateAngle,translate,scale,rotate,rotateShape,undoRotateShape," +
      "fillStyle,strokeStyle,lineWidth,width,height,beginPath,fillPath,closePath,drawPath,rect,circle,ellipse,line,triangle,quad,point,bezier,quadBezier,background,fill,noFill,stroke,noStroke,strokeWidth,likeWidth,strokeJoin,lineJoin," +
      "image,images,loadImage," +
      "linearGradient,radialGradient,rgb,rgba,hsl,hsla,hsv,hsva,hsb,hsba,lerpColor," +
      "day,month,year,hour,minute,second,millis," +
      "keyPressed,keyReleased,keyTyped,keyMatch,matchKeys," +
      "mouseClicked,mousePressed,mouseReleased,mouseMoved,mouseOver,mouseOut,mouseInCanvas," +
      "runFunction,embedPack,embed," +
      "CREDITS".split(",");

    //MATH    EULER,pi,tau,round,power,sqrt,abs,ceil,floor,min,max,squ,random,randInt,dist,mag,norm,map,lerp,
    this.EULER = Math.E;
    this.pi = Math.PI;
    this.tau = Math.PI * 2;
    this.round = Math.round;
    this.power = Math.pow;
    this.sqrt = Math.sqrt;
    this.abs = Math.abs;
    this.ceil = Math.ceil;
    this.floor = Math.floor;
    this.min = Math.min;
    this.max = Math.max;
    this.squ = p => p * p;
    this.random = m => Math.random() * m;
    this.randInt = function(m) {
      return this.floor(Math.random() * m);
    };
    this.dist = function(x1, y1, x2, y2) {
      return this.sqrt(
        this.squ(this.abs(x2 - x1)) + this.squ(this.abs(y2 - y1))
      );
    };
    this.mag = function(x, y) {
      return this.dist(0, 0, x, y);
    };
    this.norm = (num, low, high) => (num - low) / (high - low);
    this.map = function(num, low1, high1, low2, high2) {
      if (num < low1 || num > high1) return NaN;
      return this.norm(num, low1, high1) * (high2 - low2) + low2;
    };
    this.lerp = (a, b, A) => A * (b - a) + a;

    //TRIGONOMETRY    angleMode,angleModeisDeg,deg,rad,sin,cos,tan,asin,acos,atan,
    this.angleMode = "DEG";
    this.angleModeisDeg = a =>
      this.angleMode.toUpperCase().substring(0, 3) == "DEG";
    this.deg = rad => (rad * Math.PI) / 180;
    this.rad = deg => (deg / Math.PI) * 180;
    this.sin = function(p) {
      return this.angleModeIsDeg() ? Math.sin(this.deg(p)) : Math.sin(p);
    };
    this.cos = function(p) {
      return this.angleModeIsDeg() ? Math.sin(this.deg(p)) : Math.sin(p);
    };
    this.tan = function(p) {
      return this.angleModeIsDeg() ? Math.tan(this.deg(p)) : Math.tan(p);
    };
    this.asin = function(p) {
      return this.angleModeIsDeg() ? this.deg(Math.asin(p)) : Math.asin(p);
    };
    this.acos = function(p) {
      return this.angleModeIsDeg() ? this.deg(Math.acos(p)) : Math.acos(p);
    };
    this.atan = function(p) {
      return this.angleModeIsDeg() ? this.deg(Math.atan(p)) : Math.atan(p);
    };
    this.atan2 = function(x, y) {
      return this.angleModeIsDeg()
        ? this.deg(Math.atan2(y, x))
        : Math.atan2(y, x);
    };

    //Transform    rotateAngle,translate,scale,rotate,rotateShape,undoRotateShape,
    this.rotateAngle = 0;
    this.translate = function(x, y) {
      this.ctx.translate(x, y);
    };
    this.scale = function(x, y) {
      this.ctx.scale(x, y);
    };
    this.rotate = function(deg) {
      this.rotateAngle = this.angleModeisDeg() ? this.deg(deg) : deg;
    };
    this.rotateShape = function(x, y) {
      if (this.rotateAngle == 0) return;
      this.ctx.translate(x, y);
      this.ctx.rotate(this.rotateAngle);
      this.ctx.translate(-x, -y);
    };
    this.undoRotateShape = function(x, y) {
      if (this.rotateAngle == 0) return;
      this.ctx.translate(x, y);
      this.ctx.rotate(-this.rotateAngle);
      this.ctx.translate(-x, -y);
    };

    //CANVAS CTX    fillStyle,strokeStyle,lineWidth,width,height,beginPath,fillPath,closePath,drawPath,rect,circle,ellipse,line,triangle,quad,point,bezier,quadBezier,background,fill,noFill,stroke,noStroke,strokeWidth,likeWidth,strokeJoin,lineJoin
    this.fillStyle = "#ffffff";
    this.strokeStyle = "black";
    this.lineWidth = 2;
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.beginPath = function(x, y) {
      this.rotateShape(x, y);
      this.ctx.beginPath();
    };
    this.fillPath = function() {
      if (this.fillStyle !== false) {
        this.ctx.fill();
      } else {
        this.ctx.stroke();
      }
      this.ctx.beginPath();
    };
    this.closePath = function(x, y) {
      if (this.fillStyle !== false) {
        this.ctx.stroke();
      }
      this.undoRotateShape(x, y);
      this.rotateAngle = 0;
    };
    this.drawPath = {
      circle: (x, y, s) => {
        this.ctx.arc(x, y, s / 2, 0, 2 * this.pi);
      },
      ellipse: (x, y, w, h) => {
        this.ctx.moveTo(x + w / 2, y);
        this.ctx.ellipse(x, y, w / 2, h / 2, 0, 0, this.tau);
      },
      line: (x1, y1, x2, y2) => {
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
      },
      triangle: (x1, y1, x2, y2, x3, y3) => {
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x1, y1);
        this.ctx.closePath();
      },
      quad: (x1, y1, x2, y2, x3, y3, x4, y4) => {
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x4, y4);
        this.ctx.lineTo(x1, y1);
        this.ctx.closePath();
      }
    };
    this.rect = function(x, y, w, h) {
      this.rotateShape(x + w, y + h);

      if (this.fillStyle !== false) {
        this.ctx.fillRect(x, y, w, h);
        this.ctx.strokeRect(x, y, w, h);
      } else {
        this.ctx.strokeRect(x, y, w, h);
      }

      this.undoRotateShape(x + w, y + h);
    };
    this.circle = function(x, y, s) {
      this.beginPath(x, y);
      this.drawPath.circle(x, y, s);
      this.fillPath();
      this.drawPath.circle(x, y, s);
      this.closePath(x, y);
    };
    this.ellipse = function(x, y, w, h) {
      this.beginPath(x, y);
      this.drawPath.ellipse(x, y, w, h);
      this.fillPath();
      this.drawPath.ellipse(x, y, w, h);
      this.closePath(x, y);
    };
    this.line = function(x1, y1, x2, y2) {
      let x = this.lerp(x1, x2, 0.5);
      let y = this.lerp(y1, y2, 0.5);
      this.beginPath(x, y);
      this.drawPath.line(x1, y1, x2, y2);
      this.fillPath();
      this.drawPath.line(x1, y1, x2, y2);
      this.closePath(x, y);
    };
    this.triangle = function(x1, y1, x2, y2, x3, y3) {
      let x = this.lerp(this.min(x1, x2, x3), this.max(x1, x2, x3), 0.5);
      let y = this.lerp(this.min(y1, y2, y3), this.max(y1, y2, y3), 0.5);
      this.beginPath(x, y);
      this.drawPath.triangle(x1, y1, x2, y2, x3, y3);
      this.fillPath();
      this.drawPath.triangle(x1, y1, x2, y2, x3, y3);
      this.closePath(x, y);
    };
    this.quad = function(x1, y1, x2, y2, x3, y3, x4, y4) {
      let x = this.lerp(
        this.min(x1, x2, x3, x4),
        this.max(x1, x2, x3, x4),
        0.5
      );
      let y = this.lerp(
        this.min(y1, y2, y3, y4),
        this.max(y1, y2, y3, y4),
        0.5
      );
      this.beginPath(x, y);
      this.drawPath.quad(x1, y1, x2, y2, x3, y3, x4, y4);
      this.fillPath();
      this.drawPath.quad(x1, y1, x2, y2, x3, y3, x4, y4);
      this.closePath(x, y);
    };
    this.point = function(x, y) {
      this.ctx.lineWidth = 0;
      this.circle(x, y, this.lineWidth);
      this.ctx.lineWidth = this.lineWidth;
    };
    this.bezier = function(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
      let a = b => {
        this.ctx.moveTo(x1, y1);
        this.ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
      };
      this.beginPath(x1, y1);
      a();
      this.fillPath();
      a();
      this.closePath(x1, y1);
    };
    this.quadBezier = function(x1, y1, cx, cy, x2, y2) {
      let a = b => {
        this.ctx.moveTo(x1, y1);
        this.ctx.quadraticCurveTo(cx, cy, x2, y2);
      };
      this.beginPath(x1, y1);
      a();
      this.fillPath();
      a();
      this.closePath(x1, y1);
    };
    this.path = function(d) {
      let D = new Path2D(d);
      if (this.fillStyle !== false) this.ctx.fill(D);
      this.ctx.stroke(D);
    };
    this.background = function(col) {
      this.ctx.fillStyle = col;
      this.ctx.strokeStyle = col;
      this.rect(0, 0, this.width, this.height);
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.strokeStyle = this.strokeStyle;
    };
    this.fill = function(col) {
      this.ctx.fillStyle = this.fillStyle = col;
    };
    this.noFill = function() {
      this.fillStyle = false;
    };
    this.stroke = function(col) {
      this.ctx.strokeStyle = this.strokeStyle = col;
    };
    this.noStroke = function() {
      this.ctx.strokeStyle = false;
    };
    this.strokeWidth = this.strokeWeight = this.lineWidth = function(width) {
      this.ctx.lineWidth = this.lineWidth = width;
    };
    this.strokeJoin = this.lineJoin = function(mode) {
      switch (mode.toLowerCase()) {
        case "bevel":
          this.ctx.lineJoin = "bevel";
          break;
        case "round":
          this.ctx.lineJoin = "round";
          break;
        case "miter":
          this.ctx.lineJoin = "miter";
          break;
        default:
          this.ctx.lineJoin = "round";
          break;
      }
    };

    //IMAGES    image,images,loadImage
    this.images = {};
    this.loadImage = function(name, src) {
      this.images[name] = new Image();
      this.images[name].src = src;
    };
    this.image = function(name, x, y) {
      let img = this.images[name];
      if (this.images[name] == [][0])
        throw new Error("Image name not set. Use .loadImage in setup.");
      let X = x + img.offsetWidth / 2;
      let Y = y + img.offsetHeight / 2;
      this.rotateShape(X, Y);
      this.ctx.drawImage(img, x, y);
      this.undoRotateShape(X, Y);
    };

    //COLORS    linearGradient,radialGradient,rgb,rgba,hsl,hsla,hsv,hsva,hsb,hsba,lerpColor,
    this.linearGradient = function(x1, y1, x2, y2, colors) {
      let g = this.ctx.createLinearGradient(x1, y1, x2, y2),
        i;
      for (i of colors) {
        g.addColorStop(i[0], i[1]);
      }
    };
    this.radialGradient = function(x, y, r0, r1, colors) {
      let g = this.ctx.createRadialGradient(x, y, r0, x, y, r1),
        i;
      for (i of colors) {
        g.addColorStop(i[0], i[1]);
      }
    };
    this.rgb = function(r, g, b) {
      let e = a => a.toString(16).padStart(2, "0");
      return "#" + e(r) + e(g) + e(b);
    };
    this.rgba = function(r, g, b, a) {
      let e = p => p.toString(16);
      return "#" + e(r) + e(g) + e(b) + e(a);
    };
    this.hsl = function(H, S, L) {
      let h = H / 360,
        s = S / 100,
        l = L / 100,
        r,
        g,
        b,
        J,
        R = this.round;

      if (s == 0) {
        r = g = b = l;
      } else {
        J = function(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
          //return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = J(p, q, h + 1 / 3);
        g = J(p, q, h);
        b = J(p, q, h - 1 / 3);
      }

      return this.rgb(R(r * 255), R(g * 255), R(b * 255));
    };
    this.hsla = function(h, s, l, a) {
      return "#" + this.hsl(h, s, l) + (a * 255).toString(16);
    };
    this.hsv = this.hsb = function(H, S, V) {
      var r, g, b, i, f, p, q, t;
      var h = H / 360,
        s = S / 100,
        v = V / 100,
        R = this.round;
      if (arguments.length === 1) {
        (s = h.s), (v = h.v), (h = h.h);
      }
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          (r = v), (g = t), (b = p);
          break;
        case 1:
          (r = q), (g = v), (b = p);
          break;
        case 2:
          (r = p), (g = v), (b = t);
          break;
        case 3:
          (r = p), (g = q), (b = v);
          break;
        case 4:
          (r = t), (g = p), (b = v);
          break;
        case 5:
          (r = v), (g = p), (b = q);
          break;
      }
      return this.rgb(R(r * 255), R(g * 255), R(b * 255));
    };
    this.hsva = this.hsba = function(h, s, v, a) {
      return "#" + this.hsv(h, s, v) + (a * 255).toString(16);
    };
    this.lerpColor = function(c1, c2) {
      let a = c1.split(""),
        b = c2.split(""),
        c = [1, 3, 5],
        i,
        e = "#",
        p = A => parseInt(A, 16);
      for (i of c) {
        e += Math.round((p(a[i] + a[i + 1]) + p(b[i] + b[i + 1])) / 2);
      }
    };

    //TEXT    font,textAlign,text,textWidth
    this.font = function(font, size) {
      this.ctx.font = `${size || 20}px ${font}`;
    };
    this.textAlign = function(align) {
      this.ctx.textAlign = align;
    };
    this.text = function(text, x, y) {
      this.ctx.fillText(text, x, y);
    };
    this.textWidth = function(text) {
      return this.ctx.measureText(text).width;
    };

    //TIME    day,month,year,hour,minute,second,millis,
    this.day = a => new Date().getDate();
    this.month = a => new Date().getMonth();
    this.year = a => new Date().getFullYear();
    this.hour = a => new Date().getHours();
    this.minute = a => new Date().getMinutes();
    this.second = a => new Date().getSeconds();
    this.millis = a => this.loadTime - new Date().getTime();

    //KEYBOARD    keyPressed,keyReleased,keyTyped,keyMatch,matchKeys,
    this.keyPressed = () => {};
    this.keyReleased = () => {};
    this.keyTyped = () => {};
    this.keyCodes = [];
    this.keyMatch = [];
    this.matchKeys = function(k) {
      let K = this.keyCodes;
      return this.keyMatch.map((n, i) =>
        typeof n == "number" ? K[n] : !n.every(N => !K[N])
      );
    };

    //MOUSE    mouseClicked,mousePressed,mouseReleased,mouseMoved,mouseOver,mouseOut,mouseInCanvas,
    this.mouseClicked = () => {};
    this.mousePressed = () => {};
    this.mouseReleased = () => {};
    this.mouseMoved = () => {};
    this.mouseOver = () => {};
    this.mouseOut = () => {};
    this.mouseInCanvas = false;

    //EMBED    runFunction,embedPack,embed,
    this.runFunction = function(a) {
      let b = [],
        c = [],
        d,
        e = a[1]
          .replaceAll(this.tab, " ")
          .replaceAll("⩶", "=")
          .split(",");
      a.forEach(n => {
        if (n.includes("=")) {
          b.push(n.split("=")[0]);
          c.push(n.split("=")[1]);
        }
      });
      b.forEach((n, i) => {
        d = c[i].split(",");
        this[n](d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7]);
      });
      e = e.map(n => (n * 1 == n ? n * 1 : n.replaceAll("≖", ",")));
      this[a[0]](e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]);
    };
    this.embedPack = function(p) {
      let e = "",
        a,
        m = 0,
        i;
      for (i = 0; i < p.length; i++) {
        a = p[i];
        if (m == 0) {
          if (a == '"') {
            m++;
          } else {
            e += a;
          }
        } else {
          if (a == '"') {
            m = 0;
          } else {
            e += a == " " ? this.tab : a == "=" ? "⩶" : a == "," ? "≖" : a;
          }
        }
      }
      return e;
    };
    this.embed = function(p) {
      let data = this.embedPack(p.replaceAll(this.tab, ""))
          .replaceAll("\n", " ")
          .replaceAll("<", "< ")
          .replaceAll(">", " >")
          .split(" "),
        m = 0,
        b = [];
      data.forEach(n => {
        if (m == 0) {
          if (n == "<") m++;
        } else {
          if (n == ">") {
            this.runFunction(b);
            b = [];
            m = 0;
          } else {
            b.push(n);
          }
        }
      });
    };
  }
  set draw(x) {
    let t = this,
      A = function(event) {
        t.lastTarget = event.target;
      };
    document.addEventListener("mousedown", A);
    document.addEventListener("mouseup", A);
    this.element.addEventListener("click", function(event) {
      t.mouseX = event.offsetX;
      t.mouseY = event.offsetY;
      t.mouseClicked(event);
    });
    this.element.addEventListener("mousedown", function(event) {
      t.mouseX = event.offsetX;
      t.mouseY = event.offsetY;
      t.mousePressed(event);
    });
    this.element.addEventListener("mouseup", function(event) {
      t.mouseX = event.offsetX;
      t.mouseY = event.offsetY;
      t.mouseReleased(event);
    });
    this.element.addEventListener("mousedown", function(event) {
      t.mouseX = event.offsetX;
      t.mouseY = event.offsetY;
      t.mousePressed(event);
    });
    this.element.addEventListener("mousemove", function(event) {
      t.mouseX = event.offsetX;
      t.mouseY = event.offsetY;
      t.mouseMoved(event);
    });
    this.element.addEventListener("mouseenter", function(event) {
      t.mouseX = event.offsetX;
      t.mouseY = event.offsetY;
      t.mouseInCanvas = true;
      t.mouseOver(event);
    });
    this.element.addEventListener("mouseleave", function(event) {
      t.mouseX = event.offsetX;
      t.mouseY = event.offsetY;
      t.mouseInCanvas = false;
      t.mouseOut(event);
    });

    document.addEventListener("keydown", function(event) {
      if (t.checkTarget()) {
        t.key = event.key;
        t.keyCode = event.keyCode;
        t.keyCodes[event.keyCode] = true;
        t.keyPressed(event);
      }
    });
    document.addEventListener("keyup", function(event) {
      if (t.checkTarget()) {
        t.key = event.key;
        t.keyCode = event.keyCode;
        t.keyCodes[event.keyCode] = false;
        t.keyReleased(event);
      }
    });
    document.addEventListener("keypress", function(event) {
      if (t.checkTarget()) {
        t.key = event.key;
        t.keyCode = event.keyCode;
        t.keyTyped(event);
      }
    });
    this.animate = function() {
      x();
      t.tk++;
      requestAnimationFrame(t.animate);
    };
    t.loadTime = new Date().getTime();
    if (typeof t.setup == "function") t.setup();
    if (t.toggleAnimate == true) {
      t.animate();
    }
  }
};
