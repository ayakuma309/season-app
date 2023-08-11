import React from 'react';
import { getCharacterType } from '@/types/diagnosis';
import Layout from '@/components/common/Layout';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useAnswerContext } from '@/context/AnswerProvider';

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
    <Layout>
      <Box>
        <div>あなたの診断結果</div>
        <div>
          {matchingCharacterType.name}
        </div>
        <Image
          width={320}
          src={matchingCharacterType.imagePath}
          alt={matchingCharacterType.name}
          objectFit="cover"
        />
        <Typography>
          {`${matchingCharacterType.name}は`}
        </Typography>
        <Typography>
          {matchingCharacterType.description}
        </Typography>
      </Box>
    </Layout>
  );
};

export default ResultPage;
