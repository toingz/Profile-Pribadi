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

function logo(imageDataTemp, point_array, r,g,b) {
    let point = point_array[0];

    for(let i = 1; i < point_array.length; i++) {
        let point2 = point_array[i];
        dda(imageDataTemp, point.x, point.y, point2.x, point2.y, r,g,b);
        point = point2;
    }
    dda(imageDataTemp, point.x, point.y, point_array[0].x, point_array[0].y, r,g,b);
}
let pointArray = [
            {x:170, y:170},
            {x:270, y:100},
            {x:370, y:170},
            {x:270, y:300},
        ];

logo(imageData, pointArray, 100,200,150);
/* Algoritma floodFill */
function floodFill(imageDataTemp, canvas, x0,y0, toFlood, color) {
    let tumpukan = [];
    tumpukan.push({x : x0, y : y0});
    while(tumpukan.length > 0) {
       var titikSkrg = tumpukan.shift();
       var indexSkrg = 4 * (titikSkrg.x + titikSkrg.y * canvas.width);
       var r1 = imageDataTemp.data[indexSkrg + 0];
       var g1 = imageDataTemp.data[indexSkrg + 1];
       var b1 = imageDataTemp.data[indexSkrg + 2];
       if((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageDataTemp.data[indexSkrg + 0] = color.r;
            imageDataTemp.data[indexSkrg + 1] = color.g;
            imageDataTemp.data[indexSkrg + 2] = color.b;
            imageDataTemp.data[indexSkrg + 3] = 255;

            tumpukan.push({x:titikSkrg.x+1, y:titikSkrg.y});
            tumpukan.push({x:titikSkrg.x-1, y:titikSkrg.y});
            tumpukan.push({x:titikSkrg.x, y:titikSkrg.y+1});
            tumpukan.push({x:titikSkrg.x, y:titikSkrg.y-1});
        }
    }
}
floodFill(imageData,canvasKita,210,150,{r:0,g:0,b:0},{r:0,g:150,b:255});

ctx.putImageData(imageData, 0, 0);

ctx.font = 'bold italic 70pt Times';
ctx.fillStyle = 'white';
ctx.textAlign = 'center'; //left, center, right
ctx.fillText('R', 265, 220, 200, 100);