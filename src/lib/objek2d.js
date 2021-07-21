const canvasKita = document.getElementById('myCanvas');
canvasKita.width = 500;
canvasKita.height = 500;
const ctx = canvasKita.getContext('2d');

const imageData = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);
// Fungsi pembuatan titik
function gambarTitik(imageDataTemp, x, y, r, g, b) {
    let index;
    index = 4 * (x + (y * myCanvas.width));
    imageDataTemp.data[index + 0] = r;	// R
    imageDataTemp.data[index + 1] = g;	// G
    imageDataTemp.data[index + 2] = b;	// B
    imageDataTemp.data[index + 3] = 255;	// A
}

// Looping fungsi pembuatan titik untuk membentuk objek persegi
// for(let i = 0; i < 100; i++) {
//     for(let j = 0; j < 100; j++) {
//         gambarTitik(imageData, 100 + i, 100 + j, 0, 0, 0);
//     }
// }

function dda(imageData, x1, y1, x2, y2, r, g, b) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    if (Math.abs(dx) > Math.abs(dy)) {
        // Tambah di sumbu x
        let y = y1;
        if (x2 > x1) {
            // Ke kanan
            for (let x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx);
                gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        } else {
            // Ke kiri
            for (let x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx); // 1/m
                gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        }
    } else {
        // Tambah di sumbu y
        let x = x1;
        if (y2 > y1) {
            // Ke kanan
            for (let y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy);
                gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        } else {
            // Ke kiri
            for (let y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy);
                gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        }
    }
};

function polygon(imageDataTemp, point_array, r,g,b) {
    let point = point_array[0];
    for(let i = 1; i < point_array.length; i++) {
        let point2 = point_array[i];
        dda(imageDataTemp, point.x, point.y, point2.x, point2.y, r,g,b);
        point = point2;
    }
    dda(imageDataTemp, point.x, point.y, point_array[0].x, point_array[0].y, r,g,b);
}
// let pointArray = [
//             {x:200, y:100},
//             {x:250, y:100},
//             {x:250, y:150},
//             {x:200, y:200},
//         ];

// polygon(imageData, pointArray, 255,0,0);

function lingkaran(imageDataTemp, xc, yc, radius, r, g, b) {
    for (let theta = 0; theta < Math.PI*2; theta += 0.01) {
        x = xc + radius * Math.cos(theta);
        y = yc + radius * Math.sin(theta);

        gambarTitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
    }
}

// lingkaran(imageData, 100, 200, 50, 0, 0, 0);

function elips(imageDataTemp, xc, yc, radiusX, radiusY, r, g, b) {
    for (let theta = 0; theta < Math.PI*2; theta += 0.01) {
        x = xc + radiusX * Math.cos(theta);
        y = yc + radiusY * Math.sin(theta);

        gambarTitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
    }
}

// elips(imageData, 200, 200, 100, 200, 255, 0, 0);

// Segitiga
// ctx.beginPath();
// ctx.moveTo(250, 100);
// ctx.lineTo(400, 400);
// ctx.lineTo(100, 400);
// ctx.closePath();
// ctx.lineWidth = 5;
// ctx.strokeStyle = "black";
// ctx.stroke();
// ctx.fill();


//lingkaran
lingkaran(imageData, 200, 400, 50, 0, 0, 0);
lingkaran(imageData, 300, 400, 50, 0, 0, 0);

ctx.putImageData(imageData, 0, 0);

// kotak
ctx.rect(25,25, 100, 100);
ctx.lineWidth = 1;
ctx.strokeRect(215,150, 70,200);

