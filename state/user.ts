import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type hasSeen = {
  modal: boolean;
  todoTip: boolean;
};

const hasSeen = atom({
  key: "isFirstVisit",
  default: { modal: false, todoTip: false } as hasSeen,
  effects_UNSTABLE: [persistAtom],
});

export { hasSeen };
