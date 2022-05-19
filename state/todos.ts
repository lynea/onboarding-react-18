import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

const { persistAtom } = recoilPersist();

const todosState = atom({
  key: "todos",
  default: [] as Todo[],
  effects_UNSTABLE: [persistAtom],
});

const todoInfo = selector({
  key: "infoValue",
  get: ({ get }) => ({
    total: get(todosState).length,
    completed: get(todosState).filter((todo: Todo) => todo.completed).length,
    notCompleted: get(todosState).filter((todo: Todo) => !todo.completed)
      .length,
  }),
});

export { todosState, todoInfo };
