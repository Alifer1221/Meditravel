const Jimp = require('jimp');

async function run() {
    try {
        const img = await Jimp.read('public/Logo.png');
        let minX = img.bitmap.width, minY = img.bitmap.height, maxX = 0, maxY = 0;
        
        img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
            const a = this.bitmap.data[idx + 3];
            // If completely transparent, ignore. If even slightly visible, count it.
            if (a > 5) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        });

        if (maxX >= minX && maxY >= minY) {
            let w = maxX - minX + 1;
            let h = maxY - minY + 1;
            img.crop(minX, minY, w, h);
            await img.writeAsync('public/Logo_tight.png');
            console.log(`Strictly cropped to boundaries: ${w}x${h}`);
        } else {
            console.log('Empty image or no crop possible.');
        }
    } catch (e) {
        console.error(e);
    }
}
run();
