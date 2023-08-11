import React, { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ColorResult, SketchPicker } from "react-color";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import Style from "@/styles/gradation.module.css";
import Layout from "@/components/common/Layout";

const Gradation = () => {
    const [hexStart, setHexStart] = useState("#93fd85");
    const [hexEnd, setHexEnd] = useState("#3b3ef2");
    const [midPoint, setMidPoint] = useState("50%");
    const [firstGradationWidth, setFirstGradationWidth] = useState<number>(0);
    const [copied, setCopied] = useState(false);
    const gradation =
        "linear-gradient(to right," +
        hexStart +
        "," +
        midPoint +
        "," +
        hexEnd +
        ")";
    const gradationCode = `background: linear-gradient(to right, ${hexStart}, ${midPoint}, ${hexEnd});`;

    const handleChangeStart = (color: ColorResult) => {
        setHexStart(color.hex);
    };
    const handleChangeEnd = (color: ColorResult) => {
        setHexEnd(color.hex);
    };

    const gradationPadding = 10;
    const barWidth = 20;
    const barPositionAdjust = gradationPadding * 2 + barWidth;

    useEffect(() => {
        setFirstGradationWidth(Math.ceil(window.innerWidth * 0.9));
    }, []);

    let maxPosition = firstGradationWidth - barPositionAdjust;
    const minPosition = gradationPadding * 2 - barWidth;

    let useWidth = firstGradationWidth - barPositionAdjust;

    const gradationWidth = useRef<HTMLDivElement | null>(null);
    if (gradationWidth.current) {
        useWidth = gradationWidth.current.offsetWidth - barPositionAdjust;
        maxPosition = gradationWidth.current.offsetWidth - barPositionAdjust;
    }

    const [currentX, setCurrentX] = useState(
        firstGradationWidth / 2 - barWidth,
    );

    const barDrag = (event: DraggableEvent, data: DraggableData) => {
        if (event) {
            const currentPer = Math.floor((data.x / useWidth) * 100);
            if (currentPer >= 100) {
                setMidPoint("100%");
                setCurrentX(maxPosition - barWidth);
            } else if (currentPer <= 0) {
                setMidPoint("0%");
                setCurrentX(minPosition);
            } else {
                setMidPoint(currentPer + "%");
                setCurrentX(data.x);
            }
        }
    };

    const gradationClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const whiteSpace = (document.body.offsetWidth * (1 - 90 / 100)) / 2;
        const relativePosition = event.clientX - whiteSpace - gradationPadding;
        const relativePer = Math.max(
            0,
            Math.min(100, (relativePosition / useWidth) * 100),
        );

        setCurrentX(
            Math.max(minPosition, Math.min(maxPosition, relativePosition)),
        );
        setMidPoint(relativePer + "%");
    };

    return (
        <Layout>
            <div
                ref={gradationWidth}
                onClick={gradationClick}
                className={Style.gradation}
                style={{
                    padding: gradationPadding + "px",
                    background: gradation,
                }}
            >
                <Draggable
                    onDrag={barDrag}
                    bounds="parent"
                    axis="x"
                    position={{
                        x: currentX,
                        y: 0,
                    }}
                >
                    <div
                        className={Style.bar}
                        style={{
                            width: barWidth + "px",
                        }}
                    ></div>
                </Draggable>
            </div>
            <div className={Style.color_picker}>
                <div>
                    <p className="text-2xl my-3">①1色めを選ぶ</p>
                    <SketchPicker
                        color={hexStart}
                        onChange={handleChangeStart}
                    />
                </div>
                <div>
                    <p className="text-2xl my-3">②2色めを選ぶ</p>
                    <SketchPicker color={hexEnd} onChange={handleChangeEnd} />
                </div>
            </div>
            <div>
                <p className="text-2xl my-3">③コピーする</p>
                <div
                    className={Style.color_image}
                    style={{
                        background: gradation,
                    }}
                />
                <code className={Style.code}>
                    background: linear-gradient(to right,{hexStart},{midPoint},
                    {hexEnd})
                </code>
                <div className="text-center">
                    <CopyToClipboard
                        text={gradationCode}
                        onCopy={() => setCopied(true)}
                    >
                        <button
                            className={Style.code_button}
                            style={{
                                background: gradation,
                            }}
                        >
                            コピー
                        </button>
                    </CopyToClipboard>
                    <br />
                    {copied && <span>コピーしました！</span>}
                </div>
            </div>
        </Layout>
    );
};

export default Gradation;
