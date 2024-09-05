export function isImageBackgroundLight(
  imageUrl: string,
  callback: (isLight: boolean) => void,
) {
  const img = new Image();
  img.crossOrigin = 'Anonymous'; // Handle cross-origin images
  img.src = `${imageUrl}?t=${new Date().getTime()}`;

  img.onload = function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);

    const imageData = context.getImageData(0, 0, img.width, img.height);
    let totalBrightness = 0;
    let pixelCount = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      const brightness = 0.299 * r + 0.587 * g + 0.114 * b; // Perceived brightness formula
      totalBrightness += brightness;
      pixelCount++;
    }

    const avgBrightness = totalBrightness / pixelCount;

    const isLight = avgBrightness > 120; // Adjust threshold if needed
    callback(isLight);
  };
}
