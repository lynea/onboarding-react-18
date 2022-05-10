import { Heading, Box, Button } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { MdDone } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { useRecoilState } from "recoil";
import { todosState } from "../../state/todos";
import { StepAttributes, Todos } from "../../types/cms";

export const Step: FunctionComponent<StepAttributes> = ({
  body,
  title,
  todos,
}) => {
  const [loading, setLoading] = useState(false);
  const getAttributes = (todos: Todos) =>
    todos.data.map((todo) => todo.attributes);

  const [localTodos, setTodos] = useRecoilState(todosState);

  const todoAttributes = todos ? getAttributes(todos) : undefined;

  const todo = todos?.data[0]?.attributes;

  const submitTodo = () => {
    const foundTodo = localTodos?.find(
      (localTodo) => localTodo.id === todo.identifier
    );

    if (foundTodo) {
      if (foundTodo?.completed) {
        const filteredTodos = [...localTodos].filter(
          (localTodo) => localTodo.id !== todo.identifier
        );

        setTodos(filteredTodos);
      } else {
        const filteredTodos = [...localTodos].filter(
          (localTodo) => localTodo.id !== todo.identifier
        );
        setTodos([
          ...filteredTodos,
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Heading as="h2" size="lg" marginBottom="2.5rem">
        {title}
      </Heading>

      <Box>
        <ReactMarkdown>{body}</ReactMarkdown>
      </Box>

      {todoAttributes && todoAttributes?.length > 0 && (
        <Button
          marginTop="2rem"
          w="fit-content"
          alignSelf="center"
          loadingText="Submitting"
          isLoading={loading}
          colorScheme={
            localTodos?.find((localTodo) => localTodo.id === todo.identifier)
              ?.completed
              ? "red"
              : "green"
          }
          variant="solid"
          rightIcon={<MdDone />}
          onClick={() => submitTodo()}
        >
          {localTodos?.find((localTodo) => localTodo.id === todo.identifier)
            ?.completed
            ? "mark as uncompleted"
            : "mark as completed"}
        </Button>
      )}
    </>
  );
};
