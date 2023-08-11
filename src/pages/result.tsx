import React from "react";
import { getCharacterType } from "@/types/diagnosis";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useAnswerContext } from "@/context/AnswerProvider";
import Link from "next/link";

const ResultPage = () => {
    const {
        answer1,
        answer2,
        answer3,
        answer4,
        answer5,
        answer6,
        answer7,
        answer8,
        answer9,
        answer10,
    } = useAnswerContext();
    const userAnswers = [
        Number(answer1),
        Number(answer2),
        Number(answer3),
        Number(answer4),
        Number(answer5),
        Number(answer6),
        Number(answer7),
        Number(answer8),
        Number(answer9),
        Number(answer10),
    ];
    const matchingCharacterType = getCharacterType(userAnswers);

    return (
        <div className="bg_diagnosis">
            <div className="p-10 shadow-lg w-1/2 mx-auto">
                <div className="text-3xl font-bold text-center my-2">
                    {matchingCharacterType.name}
                </div>
                <Image
                    width={320}
                    src={matchingCharacterType.imagePath}
                    alt={matchingCharacterType.name}
                    objectFit="cover"
                    className="rounded-md mx-auto"
                />
                <Typography>{`${matchingCharacterType.name}は`}</Typography>
                <Typography>{matchingCharacterType.description}</Typography>
            </div>
            <Link href="/">
                <p className="mx-auto p-3 w-20 text-center bg-white rounded-md my-3">
                    戻る
                </p>
            </Link>
        </div>
    );
};

export default ResultPage;
