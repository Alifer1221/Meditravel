const Jimp = require('jimp');

async function processImage() {
    try {
        const image = await Jimp.read('public/Logo.png');
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // Make white/light gray background transparent
            if (r > 220 && g > 220 && b > 220) {
                this.bitmap.data[idx + 3] = 0; // Alpha to 0
            }
        });
        
        // Autocrop transparent borders
        image.autocrop();
        
        await image.writeAsync('public/Logo.png');
        console.log('Processed newly downloaded logo: transparent background, tight crop, original colors.');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}
processImage();
