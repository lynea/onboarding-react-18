export type StepperProps = {
  onNextClick: () => void;
  onPreviousClick: () => void;
  stepCount: { total: number; current: number };
  chapterCount: { total: number; current: number };
};
