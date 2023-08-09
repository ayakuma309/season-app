import React, { useState } from 'react';

const Pixel = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [pixelizedImage, setPixelizedImage] = useState<string | null>(null);

  // handleImageUpload 関数内でのファイル存在確認
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };
  const handlePixelize = () => {
    if (image) {
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        const pixelSize = 5; // ピクセルの大きさを小さく設定
        const pixelizedWidth = img.width / pixelSize;
        const pixelizedHeight = img.height / pixelSize;

        const canvas = document.createElement('canvas');
        canvas.width = pixelizedWidth;
        canvas.height = pixelizedHeight;
        const context = canvas.getContext('2d');


        if (context) {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);

          const outputCanvas = document.createElement('canvas');
          outputCanvas.width = img.width;
          outputCanvas.height = img.height;
          const outputCtx = outputCanvas.getContext('2d');
          
          if (outputCtx) {
            for (let y = 0; y < img.height; y += pixelSize) {
              for (let x = 0; x < img.width; x += pixelSize) {
                const pixelData = context.getImageData(x / pixelSize, y / pixelSize, 1, 1);
                const avgColor = getAverageColor(pixelData);
                outputCtx.fillStyle = `rgb(${avgColor.r},${avgColor.g},${avgColor.b})`;
                outputCtx.fillRect(x, y, pixelSize, pixelSize);
              }
            }

            setPixelizedImage(outputCanvas.toDataURL());
          }
        }
      };
    }
  };


  const getAverageColor = (pixelData: ImageData) => {
    let totalR = 0,
      totalG = 0,
      totalB = 0;

    for (let i = 0; i < pixelData.data.length; i += 4) {
      totalR += pixelData.data[i];
      totalG += pixelData.data[i + 1];
      totalB += pixelData.data[i + 2];
    }

    const numPixels = pixelData.data.length / 4;
    const avgR = Math.floor(totalR / numPixels);
    const avgG = Math.floor(totalG / numPixels);
    const avgB = Math.floor(totalB / numPixels);

    return { r: avgR, g: avgG, b: avgB };
  };

  return (
    <div>
      <h1>画像ピクセル化アプリ</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handlePixelize}>ピクセル化</button>
      {pixelizedImage && (
        <div>
          <h2>ピクセル化された画像</h2>
          <img src={pixelizedImage} alt="Pixelized" />
        </div>
      )}
    </div>
  );
};

export default Pixel;
