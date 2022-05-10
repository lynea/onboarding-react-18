import { ChaptersAttributes } from "../../types/cms";
import { IStep } from "../step";

export type IChapter = {
  title: string;
  steps: IStep[];
};

export type ChapterProps = ChaptersAttributes & {
  currentStep: number;
};
