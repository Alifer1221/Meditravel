const Jimp = require('jimp');

async function processImage() {
    try {
        const image = await Jimp.read('public/Logo.png');
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];
            
            // If pixel is white or close to white, make transparent
            if (red >= 235 && green >= 235 && blue >= 235) {
                this.bitmap.data[idx + 3] = 0; // Set Alpha to 0
            }
        });
        
        await image.writeAsync('public/Logo.png');
        console.log('Background removed successfully');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
