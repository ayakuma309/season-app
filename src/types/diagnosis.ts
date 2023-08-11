import { StaticImageData } from 'next/image';

import AdventureAlicia from 'public/diagnosis/AdventureAlicia.jpg';
import ArtisticAnnette from 'public/diagnosis/ArtisticAnnette.jpg';
import AugustineAutumn from 'public/diagnosis/AugustineAutumn.jpg';
import CarnivalCarter from 'public/diagnosis/CarnivalCarter.jpg';
import ConnectCarina from 'public/diagnosis/ConnectCarina.jpg';
import EnchantingEric from 'public/diagnosis/EnchantingEric.jpg';
import MiracleMarina from 'public/diagnosis/MiracleMarina.jpg';
import RetroRoland from 'public/diagnosis/RetroRoland.jpg';
import SunnySpringfield from 'public/diagnosis/SunnySpringfield.jpg';
import WinterWillow from 'public/diagnosis/WinterWillow.jpg';

export interface CharacterTypeInfo {
  name: string;
  description: string;
  imagePath: StaticImageData;
}


export const CharacterTypesInfo: Array<CharacterTypeInfo> = [
  {
    name: 'サニー・スプリングフィールド',
    description:
      '明るく元気な春の診断を担当するキャラクター。笑顔とポジティブなエネルギーが魅力',
    imagePath: SunnySpringfield,
    },
  {
    name: 'ミラクル・マリーナ',
    description:
      '海辺や夏の冒険をテーマにした診断を行うマーメイドのキャラクター。夏の輝く瞬間に癒しと希望をもたらす存在。',
    imagePath: MiracleMarina,
    },
  {
    name: 'オーガスティン・オータム',
    description:
      '秋の静寂と成熟を象徴する診断キャラクター。哲学的で深い思考',
    imagePath: AugustineAutumn,
    },
  {
    name: 'ウィンター・ウィロウ',
    description: '冬の静けさと冷静な洞察を持つキャラクター。内省的な診断で新たな視点を提供。',
    imagePath: WinterWillow,
  },
  {
    name: 'レトロ・ローランド',
    description:
      '過去のノスタルジアやレトロな要素をテーマにした診断を行うキャラクター。懐かしさと新しさを融合させる存在。',
    imagePath: RetroRoland,
  },
  {
    name: 'アドベンチャー・アリシア',
    description:
      '冒険と挑戦をテーマにした診断を提供するキャラクター。夢や目標に向かって進む勇気を鼓舞する存在。',
    imagePath: AdventureAlicia,
  },
  {
    name: 'エンチャンティング・エリック',
    description:
      '魔法やファンタジーをテーマにした診断を行う魔法使いのキャラクター。想像力を刺激する存在。',
    imagePath: EnchantingEric,
  },
  {
    name: 'コネクト・カリーナ',
    description:
      '人間関係や友情をテーマにした診断を提供するキャラクター。人々を結びつける力を持つ存在。',
    imagePath: ConnectCarina,
  },
  {
    name: 'アーティスティック・アネット',
    description:
      '芸術や創造性をテーマにした診断を行うアーティストのキャラクター。個性と表現力を引き出す存在。',
    imagePath: ArtisticAnnette,
  },
  {
    name: 'カーニバル・カーター',
    description:
      '祭りや楽しみをテーマにした診断を提供するキャラクター。人々を笑顔にするお祭りのような存在',
    imagePath: CarnivalCarter,
  },
];

//高評価な答えに対しての質問番号を返す
export const getHighScoreQuestionNumbers = (answers: number[]): number[] => {
  const highScoreQuestionNumbers: number[] = [];

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === 5) {
      highScoreQuestionNumbers.push(i);
    }
  }
  return highScoreQuestionNumbers;
};
//質問番号を受け取って、CharacterTypesInfoの中から該当するキャラクターを返す
export const getCharacterType = (answers: number[]): CharacterTypeInfo => {
  const highScoreQuestionNumbers = getHighScoreQuestionNumbers(answers);
  if (highScoreQuestionNumbers.length === 0) {
    //ランダムで返す
    const randomIndex = Math.floor(Math.random() * CharacterTypesInfo.length);
    return CharacterTypesInfo[randomIndex];
  }
  //それ以外は、高評価な答えに対しての質問番号を受け取って、CharacterTypesInfoの中から該当するキャラクターをランダムで返す
  const randomIndex = Math.floor(Math.random() * highScoreQuestionNumbers.length);
  const randomQuestionNumber = highScoreQuestionNumbers[randomIndex];
  const characterType = CharacterTypesInfo[randomQuestionNumber];
  return characterType;
};
