/** Apply filter, multiply the RED property for each pixel by X. */
function applyFilter(buffer) {
    const startTime = Date.now();
     buffer.forEach((value, index) => {
        if(index % 4 === 0)
            buffer[index] =  value * 1.25
    });
    console.log(`Worker: Handler took: ${Date.now() - startTime}ms`);
    return buffer;
}

const processImage = ({width, height, data}) => new ImageData(applyFilter(data), width, height);

addEventListener('message', ({data}) => {
    const imageData = processImage(data);
    postMessage(imageData, [imageData.data.buffer]);
    console.log('first', imageData.data.buffer, 'sec', data.data.buffer)
});
