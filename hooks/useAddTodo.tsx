import { useState } from "react";
import { useRecoilState } from "recoil";
import { Todo, todosState } from "../state/todos";
import { TodoAttributes } from "../types/cms";

const removeTodo = (todos: Todo[], id: string) =>
  [...todos].filter((localTodo) => localTodo.id !== id);

export const useSubmitTodo = (): [boolean, (todo: TodoAttributes) => void] => {
  const [localTodos, setTodos] = useRecoilState(todosState);
  const [loading, setLoading] = useState(false);

  const submitTodo = (todo: TodoAttributes) => {
    //todo: refactor to hook because re-used on [teamname]
    const foundTodo = localTodos?.find(
      (localTodo: Todo) => localTodo.id === todo.identifier
    );

    if (foundTodo) {
      if (foundTodo?.completed) {
        setTodos(removeTodo(localTodos, todo.identifier));
      } else {
        setTodos([
          ...removeTodo(localTodos, todo.identifier),
          { completed: true, title: todo.title, id: todo.identifier },
        ]);
      }
    } else {
      setTodos([
        ...localTodos,
        { completed: true, title: todo.title, id: todo.identifier },
      ]);
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  return [loading, submitTodo];
};
