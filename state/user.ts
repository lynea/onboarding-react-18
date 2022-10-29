import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type hasSeen = {
  modal: boolean;
  todoTip: boolean;
  openTodosModal: boolean;
};

const hasCompleted = atom({
  key: "hasCompleted",
  default: false as boolean,
  effects_UNSTABLE: [persistAtom],
});

const hasSeenAllSteps = atom({
  key: "hasSeenAllSteps",
  default: false as boolean,
  effects_UNSTABLE: [persistAtom],
});

const hasSeen = atom({
  key: "isFirstVisit",
  default: { modal: false, todoTip: false, openTodosModal: false } as hasSeen,
  effects_UNSTABLE: [persistAtom],
});

export { hasSeen, hasCompleted, hasSeenAllSteps };
