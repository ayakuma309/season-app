import React from "react";
import Link from "next/link";
import SelectAnswer from "@/components/diagnosis/SelectAnswer";
import { Button, Grid } from "@mui/material";
import { useAnswerContext } from "@/context/AnswerProvider";

const QuestionPage = () => {
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
        setAnswer1,
        setAnswer2,
        setAnswer3,
        setAnswer4,
        setAnswer5,
        setAnswer6,
        setAnswer7,
        setAnswer8,
        setAnswer9,
        setAnswer10,
    } = useAnswerContext();

    return (
        <div className="bg_diagnosis p-24">
            <Grid>
                <p>そうだと思ったら5</p>
                <SelectAnswer
                    title="明るい陽射しの中で過ごすのが好きですか？"
                    value={answer1}
                    setValue={setAnswer1}
                />
                <SelectAnswer
                    title="海やビーチに行くことは好きですか？"
                    value={answer2}
                    setValue={setAnswer2}
                />
                <SelectAnswer
                    title="秋の訪れを感じると、静寂な気持ちになりますか？"
                    value={answer3}
                    setValue={setAnswer3}
                />
                <SelectAnswer
                    title="冬の季節はどんな風景や雰囲気でも楽しめますか？"
                    value={answer4}
                    setValue={setAnswer4}
                />
                <SelectAnswer
                    title="過去の懐かしい思い出を振り返るのは好きですか？"
                    value={answer5}
                    setValue={setAnswer5}
                />
                <SelectAnswer
                    title="新しい場所や経験に向かうとき、不安にならないタイプですか？"
                    value={answer6}
                    setValue={setAnswer6}
                />
                <SelectAnswer
                    title="魔法が使えるとしたら、何をしてみたいか考えたことありますか？"
                    value={answer7}
                    setValue={setAnswer7}
                />
                <SelectAnswer
                    title="友達や家族とのつながりを大切にしていますか？"
                    value={answer8}
                    setValue={setAnswer8}
                />
                <SelectAnswer
                    title="芸術や創造的な活動を楽しんでいますか？"
                    value={answer9}
                    setValue={setAnswer9}
                />
                <SelectAnswer
                    title="お祭りやイベントが好きですか？"
                    value={answer10}
                    setValue={setAnswer10}
                />
                <Link href="/result">
                    <Button>診断結果へ</Button>
                </Link>
                <Link href="/">
                    <p className="p-3 w-20 text-center bg-white rounded-md my-3">
                        戻る
                    </p>
                </Link>
            </Grid>
        </div>
    );
};
export default QuestionPage;
