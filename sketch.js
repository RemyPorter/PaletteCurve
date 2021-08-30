let lab = culori.lab65;
let lch = culori.lch65;
let rgb = culori.rgb;

function colorFromForm(id) {
  let v = document.getElementById(id).value;
  let l = lab(v);
  return $V([l.l,l.a,l.b]);
}

function getControlsLine() {
  return [colorFromForm("end0"), colorFromForm("end1")];
}

function getColors() {
  return [
    colorFromForm("cp0"),
    colorFromForm("cp1"),
    colorFromForm("cp2"),
    colorFromForm("cp3")
  ]
}

function rotateColors(amount, colors, controls) {
  let l = $L(controls[0], controls[1]);
  let res = colors.map((c) => c.rotate(amount, l));
  return res;
}

function doRotation(colors, controls) {
  let a = parseFloat(document.getElementById("rot").value);
  let th = millis()/1000 * a;
  return rotateColors(th, colors, controls);
}

function genPalette(p, n) {
  let res = [];
  for (let i = 0; i < n; i++) {
    let prog = (p.length-1)*i/n;
    let l = floor(prog);
    let h = ceil(prog);
    let q = prog-l;
    let c = lerpColor(p[l], p[h], q);
    res.push(c);
  }
  return res;
}

function $c(vec) {
  let l = {l: vec.e(1), a: vec.e(2), b: vec.e(3), mode:'lab65'};
  let c = rgb(l);
  return color(c.r*255, c.g*255, c.b*255);
}

function $vfill(vec) {
  fill($c(vec));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  let bsize = width/5;
  let [a,b,c,d] = getColors();
  let [p,q] = getControlsLine();
  noStroke();
  let res = doRotation([a,b,c,d], [p,q]);
  [a,b,c,d] = res;
  let pal = genPalette([$c(a), $c(b), $c(c), $c(d)], width);
  let w = 1;
  pal.forEach((c, i) => {
    fill(c);
    rect(i*w, 0, w, height);
  });
}
