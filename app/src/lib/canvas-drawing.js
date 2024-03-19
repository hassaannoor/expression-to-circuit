function mapNodes(nodes) {
    var output = null,
      m = new Map();
    return (
      nodes.forEach(function (node) {
        m.set(node.guid, node);
      }),
      nodes.forEach(function (node) {
        node.input && (node.input = m.get(node.input.guid));
        node.leftInput && (node.leftInput = m.get(node.leftInput.guid));
        node.rightInput && (node.rightInput = m.get(node.rightInput.guid));
        node.output && (node.output = m.get(node.output.guid));
        "OUTPUT" == node.circutType && (output = node);
      }),
      output
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
      "M24.09375 5l2 2.4375S31.75 14.437549 31.75 25s-5.65625 17.5625-5.65625 17.5625l-2 2.4375H41.25c2.408076.000001 7.689699.024514 13.625-2.40625s12.536536-7.343266 17.6875-16.875L71.25 25l1.3125-.71875C62.259387 5.21559 46.006574 5 41.25 5H24.09375z"
    ),
    andPath = new Path2D(
      "M30 5V45H50.47619c11.267908 0 20-9.000045 20-20s-8.732091-20-20-20H30z"
    ),
    notPath = new Path2D(
      "M 28.9688 2.5938 v 44.8125 l 2.1563 -1.0625 l 41.0313 -20 v -1.3748 L 68.022 24.969 A 1 1 0 0 0 77.193 23.935 A 1 1 0 0 0 68.011 24.966 l 3.741 -1.591 z"
    ),
    outputPath = new Path2D(
      "M2410 4433 c-455 -49 -881 -353 -1082 -773 -94 -197 -132 -366 -132 -590 0 -235 34 -387 134 -598 70 -147 146 -250 287 -388 161 -159 165 -167 173 -379 4 -124 10 -168 23 -196 23 -46 79 -103 118 -119 28 -12 29 -14 29 -85 0 -73 19 -146 45 -175 12 -14 10 -23 -15 -74 -23 -45 -30 -72 -30 -115 1 -60 19 -122 44 -149 14 -16 12 -23 -14 -76 -66 -130 -19 -286 104 -346 38 -18 45 -27 55 -67 28 -111 116 -213 228 -265 57 -27 83 -33 159 -36 111 -5 175 11 261 67 76 49 138 129 167 215 19 59 26 68 66 89 54 28 105 92 121 150 16 61 6 148 -25 203 -24 44 -25 48 -10 65 25 28 43 89 44 150 0 43 -7 70 -30 115 -25 51 -27 60 -15 74 26 29 45 102 45 175 0 71 1 73 29 85 39 16 95 73 118 119 13 28 19 72 24 201 7 207 16 226 152 352 560 516 597 1382 83 1938 -264 285 -630 444 -1011 438 -60 -1 -126 -3 -145 -5z m430 -201 c237 -63 420 -170 584 -342 338 -354 422 -880 212 -1326 -67 -142 -138 -237 -277 -374 -107 -105 -133 -137 -161 -195 -32 -68 -33 -74 -38 -237 -5 -159 -6 -168 -29 -192 l-24 -26 -547 0 -547 0 -24 26 c-23 24 -24 33 -29 192 -5 162 -6 169 -38 236 -27 58 -54 91 -160 195 -70 69 -149 157 -175 195 -144 206 -217 436 -217 681 0 313 123 616 340 834 192 194 401 301 690 355 14 2 102 3 195 1 130 -2 188 -8 245 -23z m140 -2931 c0 -52 -3 -62 -26 -80 -26 -20 -38 -21 -394 -21 -356 0 -368 1 -394 21 -23 18 -26 28 -26 80 l0 59 420 0 420 0 0 -59z m-25 -306 c32 -31 33 -80 3 -112 l-21 -23 -376 0 c-371 0 -375 0 -398 22 -32 30 -31 81 2 113 l24 25 371 0 371 0 24 -25z m6 -344 c25 -31 24 -79 -3 -108 l-21 -23 -376 0 c-371 0 -375 0 -398 22 -38 36 -27 109 20 128 12 5 188 8 390 7 l369 -2 19 -24z m-184 -353 c-28 -49 -100 -103 -160 -119 -99 -27 -224 28 -275 120 l-23 41 241 0 242 0 -25 -42z"
    ),
    wireColor = "#093708"
  export function getLogicGateDiagram(tree) {
    var canvas = document.createElement("canvas");
    (canvas.width = 4e3), (canvas.height = 12e3);
    var ctx = canvas.getContext("2d");
    // place background
    addGridBackground(ctx, '#e0e1d1', '#b2b3a3', 1, 15);
    ctx.translate(canvas.width - 100, canvas.height / 2),
      (ctx.font = "30px Arial"),
      positionNodes((tree = mapNodes(tree)), 0, 0),
      // moveNodesCloser(tree),
      // moveNodesCloser(tree),
      // moveNodesCloser(tree),
      // moveNodesCloser(tree),
      // moveNodesCloser(tree),
      // centerNodes(tree),
      // centerNodes(tree),
      // centerNodes(tree),
      // centerNodes(tree),
      // centerNodes(tree),
      drawLogicGates(tree, ctx);
    tree = contextBoundingBox(tree);
    return cropCanvas(
      canvas,
      canvas.width + tree.minX - 100,
      canvas.height / 2 + tree.minY - 50,
      tree.w + 100,
      tree.h + 125
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
  function contextBoundingBox(node, e) {
    return (
      void 0 === e && (e = { minX: node.x, minY: node.y, maxX: node.x, maxY: node.y }),
      node.x > e.maxX && (e.maxX = node.x),
      node.y > e.maxY && (e.maxY = node.y),
      node.x < e.minX && (e.minX = node.x),
      node.y < e.minY && (e.minY = node.y),
      node.leftInput &&
        node.rightInput &&
        (contextBoundingBox(node.leftInput, e), contextBoundingBox(node.rightInput, e)),
      node.input && contextBoundingBox(node.input, e),
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
  
  function drawLogicGates(node, ctx) {
      ctx.save();
    
      ctx.fillStyle = '#c7c8a9' // greenish beige
      ctx.strokeStyle = '#6d0703' // dark red
      switch (node.circutType) {
        case "AND":
          ctx.translate(node.x, node.y);
          ctx.fill(andPath);
          ctx.stroke(andPath);
          break;
    
        case "OR":
          ctx.translate(node.x, node.y);
          ctx.fill(orPath);
          ctx.stroke(orPath);
          break;
    
        case "NOT":
          ctx.translate(node.x, node.y);
          ctx.fill(notPath);
          ctx.stroke(notPath);
          break;
    
        case "INPUT":
          /////
          let x = -500  
          let y = node.inputVaraible == 'A' ? 100 : node.inputVaraible == 'B' ? 200 : node.inputVaraible == 'C' ? 300 : node.inputVaraible == 'C' ? 400 : -1500;
          ctx.fillText(node.inputVaraible, x + 40, y + 35);
          ctx.beginPath();
          ctx.arc(x + 50, y + 25, 20, 0, 2 * Math.PI);
          ctx.lineWidth = 3;
          ctx.stroke();
          /////
          
          // ctx.fillText(node.inputVaraible, node.x + 40, node.y + 35);
          // ctx.beginPath();
          // ctx.arc(node.x + 50, node.y + 25, 20, 0, 2 * Math.PI);
          // ctx.lineWidth = 3;
          // ctx.stroke();
          break;
    
        case "OUTPUT":
          ctx.translate(node.x + 69, node.y + 26);
          ctx.scale(0.015, 0.015);
          ctx.rotate((180 * Math.PI) / 180);
          ctx.fill(outputPath);
          break;
      }
    
      ctx.restore();
    
      if (node.leftInput) {
        drawLogicGates(node.leftInput, ctx);
        if (node.leftInput.circutType !== 'INPUT') {
            drawBetweenNodes(node.leftInput, node, "leftInput", ctx);
          } else {
                drawBetweenNodes({x: -500, y: getSuitableY(node.leftInput) , circutType: 'INPUT'}, node, "leftInput", ctx, getSuitableDistanceFromInput(node.leftInput));
        }
      }
    
      if (node.rightInput) {
        drawLogicGates(node.rightInput, ctx);
        if (node.rightInput.circutType !== 'INPUT') {
            drawBetweenNodes(node.rightInput, node, "rightInput", ctx);
        } else {
          drawBetweenNodes({x: -500, y: getSuitableY(node.rightInput) , circutType: 'INPUT'}, node, "rightInput", ctx, getSuitableDistanceFromInput(node.rightInput));
        }
      }
    
      if (node.input) {
        drawLogicGates(node.input, ctx);
        if (node.input.circutType !== 'INPUT') {
            drawBetweenNodes(node.input, node, "input", ctx);
        } else {
          drawBetweenNodes({x: -500, y: getSuitableY(node.input) , circutType: 'INPUT'}, node, "input", ctx, getSuitableDistanceFromInput(node.input));
        }
      }
  }
  
  function getSuitableY(node) {
      switch (node.inputVaraible) {
          case 'A':
              return 100;
          case 'B':
              return 200;
          case 'C':
              return 300;
          case 'D':
              return 400;
          default:
              // Handle the unexpected case or return a default value
              console.error('Unknown inputVaraible:', node.inputVaraible);
              return null; // or throw new Error('Unknown inputVariable');
      }
  }
  
  function getSuitableDistanceFromInput(node) {
      switch (node.inputVaraible) {
          case 'A':
              return 10;
          case 'B':
              return 20;
          case 'C':
              return 30;
          case 'D':
              return 40;
          default:
              // Handle the unexpected case or return a default value
              console.error('Unknown inputVariable:', node.inputVariable);
              return null; // or throw new Error('Unknown inputVariable');
      }
  }
  
      
      function drawLine(x1, y1, x2, y2, ctx, firstAbsoluteXDistance) {
          if (firstAbsoluteXDistance) {
              var firstXDistance = firstAbsoluteXDistance
          } else {
              var xDist = Math.abs(x1 - x2);
              firstXDistance = xDist / 2
          }
      
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 + firstXDistance, y1);
          ctx.lineTo(x1 + firstXDistance, y2);
          ctx.lineTo(x2, y2);
          
          ctx.lineWidth = 3;
          ctx.strokeStyle = wireColor
          ctx.stroke();
      }
  function getMinAndMax(t) {
    for (var e = t; e.leftInput || e.input; )
      e.leftInput ? (e = e.leftInput) : e.input && (e = e.input);
    for (var n = e.y, i = t; i.rightInput || i.input; )
      i.rightInput ? (i = i.rightInput) : i.input && (i = i.input);
    return { min: n, max: i.y };
  }
  function moveNodesCloser(node) {
    var e;
    node.leftInput && node.rightInput
      ? ((e = getMinAndMax(node.leftInput)),
        (e = getMinAndMax(node.rightInput).min - e.max),
        moveNodes(node.rightInput, e - 2 * ySize),
        moveNodesCloser(node.leftInput),
        moveNodesCloser(node.rightInput))
      : node.input && moveNodesCloser(node.input);
  }
  function moveNodes(node, amount) {
    (node.y = node.y - amount),
      node.leftInput && node.rightInput
        ? (moveNodes(node.leftInput, amount), moveNodes(node.rightInput, amount))
        : node.input && moveNodes(node.input, amount);
  }
  function centerNodes(node) {
    var e, n;
    node.leftInput && node.rightInput
      ? ((e = node.leftInput.y),
        (n = node.rightInput.y),
        (node.y = (e + n) / 2),
        centerNodes(node.leftInput),
        centerNodes(node.rightInput))
      : node.input && ((node.y = node.input.y), centerNodes(node.input));
  }
  function drawBetweenNodes(n1, n2, inputDir, ctx, firstAbsoluteXDistance) {
      const x1 = n1.x + 70;
      const y1 = n1.y + 25;
      let x2 = n2.x + 30;
      let y2 = n2.y + 25;
  
      // Adjust x2 for OR gate connections
      if (n2.circutType == "OR") {
          x2++;
      }
  
      // Determine y2 based on the input direction and circuit type
      if (inputDir == "leftInput") {
          y2 = n2.y + 18;
      } else if (inputDir == "rightInput") {
          y2 = n2.y + 32;
      }
  
      // Draw line based on circuit type combinations
      if ((n1.circutType == "INPUT" && n2.circutType == "NOT") ||
          (n1.circutType == "AND" && n2.circutType == "NOT") ||
          (n1.circutType == "OR" && n2.circutType == "NOT")) {
          drawLine(x1, y1, x2, n2.y + 25, ctx, firstAbsoluteXDistance);
      } else if (n1.circutType == "INPUT" && n2.circutType == "AND" ||
                 n1.circutType == "NOT" && n2.circutType == "AND" ||
                 n1.circutType == "AND" && n2.circutType == "AND" ||
                 n1.circutType == "AND" && n2.circutType == "OR" ||
                 n1.circutType == "INPUT" && n2.circutType == "OR" ||
                 n1.circutType == "NOT" && n2.circutType == "OR" ||
                 n1.circutType == "OR" && n2.circutType == "OR" ||
                 n1.circutType == "OR" && n2.circutType == "AND") {
          drawLine(x1, y1, x2, y2, ctx, firstAbsoluteXDistance);
      }
  }
    
//   function initCanvasDraw() {
//       var t = document.createElement('canvas')
//       t.id = 'loaderCanvas'
//       document.body.append(t);
//   //   var t = document.getElementById("loaderCanvas"),
//       e = t.getContext("2d");
//     (t.width = 500), (t.height = 500);
//     var n = Date.now();
//     e.scale(0.4, 0.4),
//       (e.strokeStyle = "Black"),
//       setInterval(function () {
//         for (
//           e.clearRect(0, 0, t.width / 0.4, t.height / 0.4),
//             time = (Date.now() - n) / 1e3,
//             i = 3;
//           i++ < 11;
  
//         )
//           (a = (i * Math.sin(time)) / 4),
//             e.beginPath(),
//             e.arc(
//               625,
//               625,
//               40 * i,
//               Math.min(time + a, time + 3 * a),
//               Math.max(time + a, time + 3 * a)
//             ),
//             (e.lineWidth = (i * i) / 5),
//             e.stroke();
//       }, 1e3 / 60);
//   }
//   initCanvasDraw();
  
  function addGridBackground(ctx, bgColor, strokeColor, thickness, gridSpacing) {
      ctx.save();
      // Set the canvas background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
      // Set the properties for the grid lines
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = thickness;
  
      // Draw the vertical grid lines
      for (let x = 0; x <= ctx.canvas.width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, ctx.canvas.height);
          ctx.stroke();
      }
  
      // Draw the horizontal grid lines
      for (let y = 0; y <= ctx.canvas.height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(ctx.canvas.width, y);
          ctx.stroke();
      }
      ctx.restore();
  }