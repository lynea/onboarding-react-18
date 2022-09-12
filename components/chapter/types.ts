import { ChaptersAttributes } from "../../types/cms";
import { IStep } from "../step";

export type IChapter = {
  title?: string;
  steps: IStep[];
};

export type ChapterProps = ChaptersAttributes & {
  title?: string | undefined;
  currentStep: number;
  currentChapter: number;
  imageMode: boolean;
};
