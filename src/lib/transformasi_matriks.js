/* Fungsi untuk membuat titik */
function titik(imageData, x, y, r, g, b) {
    let index;
    index = 4 * (x + (y * myCanvas.width));
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
};

/* Algoritma DDA */
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
                titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        } else {
            // Ke kiri
            for (let x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx); // 1/m
                titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        }
    } else {
        // Tambah di sumbu y
        let x = x1;
        if (y2 > y1) {
            // Ke kanan
            for (let y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy);
                titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        } else {
            // Ke kiri
            for (let y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy);
                titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        }
    }
};

/* Fungsi Polygon */
function polygon(imageData, point_array, r, g, b) {
    let point = point_array[0];
    for (let i = 1; i < point_array.length; i++) {
        let point2 = point_array[i];
        dda(imageData, point.x, point.y, point2.x, point2.y, r, g, b);
        point = point2;
    }
    dda(imageData, point.x, point.y, point_array[0].x, point_array[0].y, r, g, b);
};

function lingkaran(imageData, xc, yc, radius, r, g, b) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
        x = xc + radius * Math.cos(theta);
        y = yc + radius * Math.sin(theta);
        titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
    }
};

function elips(imageData, xc, yc, radiusX, radiusY, r, g, b) {
    for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
        x = xc + radiusX * Math.cos(theta);
        y = yc + radiusY * Math.sin(theta);
        titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
    }
};

function circleBrensenham(imageData, xc, radius, r, g, b) {
    let x = xc;
    let y = radius;
    let p = 1 - radius;
    let duax = 2 * x;
    let duay = 2 * y;
    console.log(p, x, y);
    while (x <= y) {
        x++;
        if (p < 0) {
            titik(imageData, x, y, r, g, b);
            p += duax + 1;
            duax = 2 * x;
            duay = 2 * y;
            console.log(p, x, y);
        } else {
            y--;
            titik(imageData, x, y, r, g, b);
            p += duax + 1 - duay;
            duax = 2 * x;
            duay = 2 * y - 2;
            console.log(p, x, y);
        }
    }
};

/* Algoritma Bressenham */
function Bressenham(imageDataTemp, x1, y1, x2, y2, r, g, b) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let d1 = 2 * dy;
    let d2 = 2 * (dy - dx);
    let p = 2 * dy - dx;
    let xEnd;

    if (x1 > x2) {
        x = x2;
        y = y2;
        xEnd = x1;
    } else {
        x = x1;
        y = y1;
        xEnd = x2;
    }
    gambarTitik(imageDataTemp, x, y, r, g, b);

    while (x < xEnd) {
        x++;
        if (p < 0) {
            p = p + d1;
        } else {
            if (y1 > y2) {
                y--;
            } else {
                y++;
                p = p + d2;
            }
        }
        gambarTitik(imageDataTemp, x, y, r, g, b);
    }
};

/* Algoritma floodFill */
function floodFill(imageData, canvas, x0, y0, toFlood, color) {
    let tumpukan = [];
    tumpukan.push({ x: x0, y: y0 });
    while (tumpukan.length > 0) {
        var titikSkrg = tumpukan.shift();
        var indexSkrg = 4 * (titikSkrg.x + titikSkrg.y * canvas.width);
        var r1 = imageData.data[indexSkrg + 0];
        var g1 = imageData.data[indexSkrg + 1];
        var b1 = imageData.data[indexSkrg + 2];
        if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageData.data[indexSkrg + 0] = color.r;
            imageData.data[indexSkrg + 1] = color.g;
            imageData.data[indexSkrg + 2] = color.b;
            imageData.data[indexSkrg + 3] = 255;
            tumpukan.push({ x: titikSkrg.x + 1, y: titikSkrg.y });
            tumpukan.push({ x: titikSkrg.x - 1, y: titikSkrg.y });
            tumpukan.push({ x: titikSkrg.x, y: titikSkrg.y + 1 });
            tumpukan.push({ x: titikSkrg.x, y: titikSkrg.y - 1 });
        }
    }
};

function loadImages(sources, callback){
    let images = {};
    let loadImages = 0;
    let numImages = 0;

    //mendapatkan jumlah source
    for(let src in sources){
        numImages++;
    }
    for(let idx in sources){
        images[idx] = new Image();
        images[idx].onload = function(){
            if(++loadImages>=numImages){
                callback(images);
            }
        };
        images[idx].src = sources[idx];
    }
};
