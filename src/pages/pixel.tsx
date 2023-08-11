import React, { useState } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";

const Pixel = () => {
    const [image, setImage] = useState<File | undefined>(undefined);
    const [pixelizedImage, setPixelizedImage] = useState<string | null>(null);
    const [saveImage, setSaveImage] = useState<string | null>(null);
    const [poopToggle, setPoopToggle] = useState<boolean>(false);
    const [gohanToggle, setGohanToggle] = useState<boolean>(false);
    const [luckyGodsToggle, setLuckyGodsToggle] = useState<boolean>(false);
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
                const pixelSize = 7; // ピクセルの大きさを小さく設定
                const pixelizedWidth = img.width / pixelSize;
                const pixelizedHeight = img.height / pixelSize;

                const canvas = document.createElement("canvas");
                canvas.width = pixelizedWidth;
                canvas.height = pixelizedHeight;
                const context = canvas.getContext("2d");

                if (context) {
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const outputCanvas = document.createElement("canvas");
                    outputCanvas.width = img.width;
                    outputCanvas.height = img.height;
                    const outputCtx = outputCanvas.getContext("2d");

                    if (outputCtx) {
                        for (let y = 0; y < img.height; y += pixelSize) {
                            for (let x = 0; x < img.width; x += pixelSize) {
                                const pixelData = context.getImageData(
                                    x / pixelSize,
                                    y / pixelSize,
                                    1,
                                    1,
                                );
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

    const saveAsImage = (uri: string) => {
        const downloadLink = document.createElement("a");

        if (typeof downloadLink.download === "string") {
            downloadLink.href = uri;

            // ファイル名
            downloadLink.download = "avatar.png";
            // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
            document.body.appendChild(downloadLink);
            // ダウンロードリンクが設定された a タグをクリック
            downloadLink.click();
            // Firefox 対策で追加したリンクを削除しておく
            document.body.removeChild(downloadLink);
        } else {
            window.open(uri);
        }
    };

    const onClickSaveImage = () => {
        // 画像に変換する component の id を指定
        const target = document.getElementById("egg-image");
        if (target === null) return;
        html2canvas(target)
            .then((canvas) => {
                const targetImgUri = canvas.toDataURL("img/png");
                console.log(targetImgUri);
                setSaveImage(targetImgUri);
            })
            .then(() => {
                if (saveImage) {
                    saveAsImage(saveImage);
                }
            });
    };

    return (
        <div className="bg_egg">
            <div className="flex  flex-col justify-center items-center p-3">
                <Link href="/">
                    <h1 className="text-2xl font-bold mb-5">
                        たまごっちになれるアプリ
                    </h1>
                </Link>
                <p className="my-2">アバターメーカーで作成した画像を使うとうまくいくかもしれません</p>
                <a
                    href="https://kuma-avatar.vercel.app/"
                    className="bg-red-500 text-white rounded-md p-2 mb-5"
                    target="_blank" rel="noopener noreferrer">
                    ①アバターメーカーはこちら
                </a>
                <input
                    className="bg-white border-2 border-red-500 rounded-md p-3"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md mb-5 mt-3"
                    onClick={handlePixelize}
                >
                    ②ピクセル化
                </button>
            </div>
            <div
                className="w-96 mx-auto relative"
                style={{ position: "relative" }}
            >
                <div id="egg-image" className="bg-white rounded-lg shadow-lg">
                    <img src="./pixel/tamago.svg" alt="Original" />
                    <button
                        onClick={() => setGohanToggle(!gohanToggle)}
                        className="bg-white px-1 z-50 rounded-full"
                        style={{
                            position: "absolute",
                            bottom: 170,
                            right: 115,
                        }}
                    >
                        🍚
                    </button>
                    <button
                        onClick={() => setLuckyGodsToggle(!luckyGodsToggle)}
                        className="bg-white px-1 z-50 rounded-full"
                        style={{
                            position: "absolute",
                            bottom: 158,
                            right: 170,
                        }}
                    >
                        ⛩
                    </button>
                    <button
                        onClick={() => setPoopToggle(!poopToggle)}
                        className="bg-white px-1 z-50 rounded-full"
                        style={{ position: "absolute", bottom: 170, left: 135 }}
                    >
                        💩
                    </button>
                    {pixelizedImage && (
                        <>
                            <img
                                src={pixelizedImage}
                                alt="Pixelized"
                                style={{
                                    position: "absolute",
                                    top: 100,
                                    left: 130,
                                }}
                                className="w-36"
                            />
                            {gohanToggle && (
                                <img
                                    src="./pixel/gohan.png"
                                    alt="gohan"
                                    style={{
                                        position: "absolute",
                                        bottom: 230,
                                        right: 175,
                                    }}
                                    className="w-6"
                                />
                            )}
                            {luckyGodsToggle && (
                                <>
                                    <img
                                        src="./pixel/benten.png"
                                        alt="lucky-gods"
                                        style={{
                                            position: "absolute",
                                            bottom: 300,
                                            right: 230,
                                        }}
                                        className="w-6"
                                    />
                                    <img
                                        src="./pixel/daikoku.png"
                                        alt="lucky-gods"
                                        style={{
                                            position: "absolute",
                                            bottom: 320,
                                            right: 210,
                                        }}
                                        className="w-6"
                                    />
                                    <img
                                        src="./pixel/ebisu.png"
                                        alt="lucky-gods"
                                        style={{
                                            position: "absolute",
                                            bottom: 330,
                                            right: 190,
                                        }}
                                        className="w-6"
                                    />
                                    <img
                                        src="./pixel/bisya.png"
                                        alt="lucky-gods"
                                        style={{
                                            position: "absolute",
                                            bottom: 325,
                                            right: 165,
                                        }}
                                        className="w-6"
                                    />
                                    <img
                                        src="./pixel/fukurokuju.png"
                                        alt="lucky-gods"
                                        style={{
                                            position: "absolute",
                                            bottom: 325,
                                            right: 140,
                                        }}
                                        className="w-6"
                                    />
                                    <img
                                        src="./pixel/jyurou.png"
                                        alt="lucky-gods"
                                        style={{
                                            position: "absolute",
                                            bottom: 310,
                                            right: 120,
                                        }}
                                        className="w-6"
                                    />
                                    <img
                                        src="./pixel/hotei.png"
                                        alt="lucky-gods"
                                        style={{
                                            position: "absolute",
                                            bottom: 290,
                                            right: 110,
                                        }}
                                        className="w-6"
                                    />
                                </>
                            )}
                            {poopToggle && (
                                <img
                                    src="./pixel/poop.png"
                                    alt="poop"
                                    style={{
                                        position: "absolute",
                                        bottom: 230,
                                        right: 130,
                                    }}
                                    className="w-6"
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded-md mb-5 mt-3"
                        onClick={onClickSaveImage}
                    >
                        ③画像を保存する
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pixel;
