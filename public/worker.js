/** Apply filter, multiply the RED property for each pixel by X. */
function applyFilter(buffer) {
    const startTime = Date.now();
    const filteredBuffer = buffer.map((value, index) => index % 4 === 0 ? value * 1.25 : value);
    console.log(`Worker: Handler took: ${Date.now() - startTime}ms`);
    return filteredBuffer;
}

const processImage = ({width, height, data}) => new ImageData(applyFilter(data), width, height);

addEventListener('message', ({data}) => {
    const imageData = processImage(data);
    postMessage(imageData, [imageData.data.buffer])
});
