import { atom, selector } from "recoil";

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

const todosState = atom({
  key: "todos",
  default: [] as Todo[],
});

const todoInfo = selector({
  key: "infoValue",
  get: ({ get }) => ({
    total: get(todosState).length,
    completed: get(todosState).filter((todo) => todo.completed).length,
    notCompleted: get(todosState).filter((todo) => !todo.completed).length,
  }),
});

export { todosState, todoInfo };
