const Jimp = require('jimp');

async function processImage() {
    try {
        const image = await Jimp.read('public/Logo.png');
        
        // Crop transparent bounds
        image.autocrop();
        
        await image.writeAsync('public/Logo.png');
        console.log('Logo cropped successfully');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
