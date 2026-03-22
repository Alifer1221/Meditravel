const fs = require('fs');
const Jimp = require('jimp');

async function processImage() {
    try {
        // Backup original if not already backed up
        if (!fs.existsSync('public/Logo_original.png')) {
            fs.copyFileSync('public/Logo.png', 'public/Logo_original.png');
        }

        const image = await Jimp.read('public/Logo.png');
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const alpha = this.bitmap.data[idx + 3];
            
            // If the pixel is not fully transparent, turn it pure white
            if (alpha > 0) {
                this.bitmap.data[idx + 0] = 255; // R
                this.bitmap.data[idx + 1] = 255; // G
                this.bitmap.data[idx + 2] = 255; // B
            }
        });
        
        await image.writeAsync('public/Logo.png');
        console.log('Logo converted to white successfully');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
