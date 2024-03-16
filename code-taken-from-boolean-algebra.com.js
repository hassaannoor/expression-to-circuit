function mapNodes(t) {
  var e = null,
    n = new Map();
  return (
    t.forEach(function (t) {
      n.set(t.guid, t);
    }),
    t.forEach(function (t) {
      t.input && (t.input = n.get(t.input.guid)),
        t.leftInput && (t.leftInput = n.get(t.leftInput.guid)),
        t.rightInput && (t.rightInput = n.get(t.rightInput.guid)),
        t.output && (t.output = n.get(t.output.guid)),
        "OUTPUT" == t.circutType && (e = t);
    }),
    e
  );
}
function getSizeOfNodes(t) {
  return getSizeOfNodesHelper(t, 0);
}
function getSizeOfNodesHelper(t, e) {
  return (
    t.leftInput && (e += getSizeOfNodesHelper(t.leftInput, 0)),
    t.rightInput && (e += getSizeOfNodesHelper(t.rightInput, 0)),
    t.input && (e += getSizeOfNodesHelper(t.input, 0)),
    "INPUT" == t.circutType && (e += 1),
    e
  );
}
var depthSize = 80,
  ySize = 25,
  orPath = new Path2D(
    "M24.09375 5l2 2.4375S31.75 14.437549 31.75 25s-5.65625 17.5625-5.65625 17.5625l-2 2.4375H41.25c2.408076.000001 7.689699.024514 13.625-2.40625s12.536536-7.343266 17.6875-16.875L71.25 25l1.3125-.71875C62.259387 5.21559 46.006574 5 41.25 5H24.09375zm5.875 3H41.25c4.684173 0 18.28685-.130207 27.96875 17C64.451964 33.429075 58.697469 37.68391 53.5 39.8125 48.139339 42.007924 43.658075 42.000001 41.25 42H30c1.873588-3.108434 4.75-9.04935 4.75-17 0-7.973354-2.908531-13.900185-4.78125-17z"
  ),
  andPath = new Path2D(
    "M30 5V45H50.47619c11.267908 0 20-9.000045 20-20s-8.732091-20-20-20H30zm2.857143 2.857143H50.47619c9.760663 0 16.666667 7.639955 16.666667 17.142857 0 9.502902-7.382195 17.142857-17.142857 17.142857H32.857143V7.857143z"
  ),
  notPath = new Path2D(
    "M 28.9688 2.5938 v 44.8125 l 2.1563 -1.0625 l 41.0313 -20 v -1.3748 L 68.022 24.969 A 1 1 0 0 0 77.193 23.935 A 1 1 0 0 0 68.011 24.966 l 3.741 -1.591 z m 3 4.8125 L 68.0938 25 l -36.125 17.5938 V 7.4063 z"
  ),
  outputPath = new Path2D(
    "M2410 4433 c-455 -49 -881 -353 -1082 -773 -94 -197 -132 -366 -132 -590 0 -235 34 -387 134 -598 70 -147 146 -250 287 -388 161 -159 165 -167 173 -379 4 -124 10 -168 23 -196 23 -46 79 -103 118 -119 28 -12 29 -14 29 -85 0 -73 19 -146 45 -175 12 -14 10 -23 -15 -74 -23 -45 -30 -72 -30 -115 1 -60 19 -122 44 -149 14 -16 12 -23 -14 -76 -66 -130 -19 -286 104 -346 38 -18 45 -27 55 -67 28 -111 116 -213 228 -265 57 -27 83 -33 159 -36 111 -5 175 11 261 67 76 49 138 129 167 215 19 59 26 68 66 89 54 28 105 92 121 150 16 61 6 148 -25 203 -24 44 -25 48 -10 65 25 28 43 89 44 150 0 43 -7 70 -30 115 -25 51 -27 60 -15 74 26 29 45 102 45 175 0 71 1 73 29 85 39 16 95 73 118 119 13 28 19 72 24 201 7 207 16 226 152 352 560 516 597 1382 83 1938 -264 285 -630 444 -1011 438 -60 -1 -126 -3 -145 -5z m430 -201 c237 -63 420 -170 584 -342 338 -354 422 -880 212 -1326 -67 -142 -138 -237 -277 -374 -107 -105 -133 -137 -161 -195 -32 -68 -33 -74 -38 -237 -5 -159 -6 -168 -29 -192 l-24 -26 -547 0 -547 0 -24 26 c-23 24 -24 33 -29 192 -5 162 -6 169 -38 236 -27 58 -54 91 -160 195 -70 69 -149 157 -175 195 -144 206 -217 436 -217 681 0 313 123 616 340 834 192 194 401 301 690 355 14 2 102 3 195 1 130 -2 188 -8 245 -23z m140 -2931 c0 -52 -3 -62 -26 -80 -26 -20 -38 -21 -394 -21 -356 0 -368 1 -394 21 -23 18 -26 28 -26 80 l0 59 420 0 420 0 0 -59z m-25 -306 c32 -31 33 -80 3 -112 l-21 -23 -376 0 c-371 0 -375 0 -398 22 -32 30 -31 81 2 113 l24 25 371 0 371 0 24 -25z m6 -344 c25 -31 24 -79 -3 -108 l-21 -23 -376 0 c-371 0 -375 0 -398 22 -38 36 -27 109 20 128 12 5 188 8 390 7 l369 -2 19 -24z m-184 -353 c-28 -49 -100 -103 -160 -119 -99 -27 -224 28 -275 120 l-23 41 241 0 242 0 -25 -42z"
  );
function getLogicGateDiagram(t) {
  var canvas = document.createElement("canvas");
  (canvas.width = 4e3), (canvas.height = 12e3);
  var ctx = canvas.getContext("2d");
  ctx.translate(canvas.width - 100, canvas.height / 2),
    (ctx.font = "30px Arial"),
    positionNodes((t = mapNodes(t)), 0, 0),
    moveNodesCloser(t),
    moveNodesCloser(t),
    moveNodesCloser(t),
    moveNodesCloser(t),
    moveNodesCloser(t),
    centerNodes(t),
    centerNodes(t),
    centerNodes(t),
    centerNodes(t),
    centerNodes(t),
    drawLogicGates(t, ctx);
  t = contextBoundingBox(t);
  return cropCanvas(
    canvas,
    canvas.width + t.minX - 100,
    canvas.height / 2 + t.minY - 50,
    t.w + 100,
    t.h + 125
  );
}
function cropCanvas(t, e, n, i, u) {
  const r = document.createElement("canvas");
  return (
    (r.width = i),
    (r.height = u),
    r.getContext("2d").drawImage(t, e, n, i, u, 0, 0, i, u),
    r
  );
}
function contextBoundingBox(t, e) {
  return (
    void 0 === e && (e = { minX: t.x, minY: t.y, maxX: t.x, maxY: t.y }),
    t.x > e.maxX && (e.maxX = t.x),
    t.y > e.maxY && (e.maxY = t.y),
    t.x < e.minX && (e.minX = t.x),
    t.y < e.minY && (e.minY = t.y),
    t.leftInput &&
      t.rightInput &&
      (contextBoundingBox(t.leftInput, e), contextBoundingBox(t.rightInput, e)),
    t.input && contextBoundingBox(t.input, e),
    (e.w = e.maxX - e.minX),
    (e.h = e.maxY - e.minY),
    e
  );
}
function positionNodes(t, e, n) {
  var i, u;
  t.leftInput && t.rightInput
    ? ((i = getSizeOfNodes(t.leftInput) * ySize),
      (u = getSizeOfNodes(t.rightInput) * ySize),
      ("OR" != t.circutType && "AND" != t.circutType) ||
        ((t.x = -e * depthSize), (t.y = n)),
      positionNodes(t.leftInput, e + 1, n - i),
      positionNodes(t.rightInput, e + 1, n + u))
    : t.input
    ? (getSizeOfNodes(t.input),
      ("NOT" != t.circutType && "OUTPUT" != t.circutType) ||
        ((t.x = -e * depthSize), (t.y = n)),
      positionNodes(t.input, e + 1, n))
    : "INPUT" == t.circutType && ((t.x = -e * depthSize), (t.y = n));
}
function drawLogicGates(t, e) {
  e.save(),
    "AND" == t.circutType && (e.translate(t.x, t.y), e.fill(andPath)),
    "OR" == t.circutType && (e.translate(t.x, t.y), e.fill(orPath)),
    "NOT" == t.circutType && (e.translate(t.x, t.y), e.fill(notPath)),
    "INPUT" == t.circutType &&
      (e.fillText(t.inputVaraible, t.x + 40, t.y + 35),
      e.beginPath(),
      e.arc(t.x + 50, t.y + 25, 20, 0, 2 * Math.PI),
      (e.lineWidth = 3),
      e.stroke()),
    "OUTPUT" == t.circutType &&
      (e.translate(t.x + 69, t.y + 26),
      e.scale(0.015, 0.015),
      e.rotate((180 * Math.PI) / 180),
      e.fill(outputPath)),
    e.restore(),
    t.leftInput &&
      (drawLogicGates(t.leftInput, e),
      drawBetweenNodes(t.leftInput, t, "leftInput", e)),
    t.rightInput &&
      (drawLogicGates(t.rightInput, e),
      drawBetweenNodes(t.rightInput, t, "rightInput", e)),
    t.input &&
      (drawLogicGates(t.input, e), drawBetweenNodes(t.input, t, "input", e));
}
function drawLine(t, e, n, i, u) {
  var r = Math.abs(t - n);
  u.beginPath(),
    u.moveTo(t, e),
    u.lineTo(t + r / 2, e),
    u.lineTo(t + r / 2, i),
    u.lineTo(n, i),
    (u.lineWidth = 3),
    u.stroke();
}
function getMinAndMax(t) {
  for (var e = t; e.leftInput || e.input; )
    e.leftInput ? (e = e.leftInput) : e.input && (e = e.input);
  for (var n = e.y, i = t; i.rightInput || i.input; )
    i.rightInput ? (i = i.rightInput) : i.input && (i = i.input);
  return { min: n, max: i.y };
}
function moveNodesCloser(t) {
  var e;
  t.leftInput && t.rightInput
    ? ((e = getMinAndMax(t.leftInput)),
      (e = getMinAndMax(t.rightInput).min - e.max),
      moveNodes(t.rightInput, e - 2 * ySize),
      moveNodesCloser(t.leftInput),
      moveNodesCloser(t.rightInput))
    : t.input && moveNodesCloser(t.input);
}
function moveNodes(t, e) {
  (t.y = t.y - e),
    t.leftInput && t.rightInput
      ? (moveNodes(t.leftInput, e), moveNodes(t.rightInput, e))
      : t.input && moveNodes(t.input, e);
}
function centerNodes(t) {
  var e, n;
  t.leftInput && t.rightInput
    ? ((e = t.leftInput.y),
      (n = t.rightInput.y),
      (t.y = (e + n) / 2),
      centerNodes(t.leftInput),
      centerNodes(t.rightInput))
    : t.input && ((t.y = t.input.y), centerNodes(t.input));
}
function drawBetweenNodes(t, e, n, i) {
  "INPUT" == t.circutType && "NOT" == e.circutType
    ? drawLine(t.x + 70, t.y + 25, e.x + 30, e.y + 25, i)
    : ("INPUT" == t.circutType && "AND" == e.circutType) ||
      ("NOT" == t.circutType && "AND" == e.circutType) ||
      ("AND" == t.circutType && "AND" == e.circutType)
    ? "leftInput" == n
      ? drawLine(t.x + 70, t.y + 25, e.x + 30, e.y + 18, i)
      : "rightInput" == n && drawLine(t.x + 70, t.y + 25, e.x + 30, e.y + 32, i)
    : ("AND" == t.circutType && "OR" == e.circutType) ||
      ("INPUT" == t.circutType && "OR" == e.circutType) ||
      ("NOT" == t.circutType && "OR" == e.circutType)
    ? "leftInput" == n
      ? drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 18, i)
      : "rightInput" == n && drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 32, i)
    : "OR" == t.circutType && "NOT" == e.circutType
    ? drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 25, i)
    : "OR" == t.circutType && "OR" == e.circutType
    ? "leftInput" == n
      ? drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 18, i)
      : "rightInput" == n && drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 32, i)
    : "AND" == t.circutType && "NOT" == e.circutType
    ? drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 25, i)
    : "OR" == t.circutType && "AND" == e.circutType
    ? "leftInput" == n
      ? drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 18, i)
      : "rightInput" == n && drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 32, i)
    : "leftInput" == n
    ? drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 18, i)
    : "rightInput" == n
    ? drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 32, i)
    : "input" == n && drawLine(t.x + 70, t.y + 25, e.x + 31, e.y + 25, i);
}
function initCanvasDraw() {
  var t = document.getElementById("loaderCanvas"),
    e = t.getContext("2d");
  (t.width = 500), (t.height = 500);
  var n = Date.now();
  e.scale(0.4, 0.4),
    (e.strokeStyle = "Black"),
    setInterval(function () {
      for (
        e.clearRect(0, 0, t.width / 0.4, t.height / 0.4),
          time = (Date.now() - n) / 1e3,
          i = 3;
        i++ < 11;

      )
        (a = (i * Math.sin(time)) / 4),
          e.beginPath(),
          e.arc(
            625,
            625,
            40 * i,
            Math.min(time + a, time + 3 * a),
            Math.max(time + a, time + 3 * a)
          ),
          (e.lineWidth = (i * i) / 5),
          e.stroke();
    }, 1e3 / 60);
}
initCanvasDraw();
