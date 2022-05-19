import { Heading, Box, Button, Grid } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { MdDone } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { useRecoilState } from "recoil";
import { Todo, todosState } from "../../state/todos";
import { StepAttributes, Todos } from "../../types/cms";
import * as stepperUtils from "../../utils/stepper";

export const Step: FunctionComponent<StepAttributes> = ({
  body,
  title,
  todos,
}) => {
  const [loading, setLoading] = useState(false);

  const [localTodos, setTodos] = useRecoilState(todosState);

  //todo: refactor so we only pass current todo
  const todoAttributes = todos
    ? stepperUtils.getAttributes(todos.data)
    : undefined;

  const todo = todos?.data[0]?.attributes;

  const removeTodo = (todos: Todo[]) =>
    [...todos].filter((localTodo) => localTodo.id !== todo.identifier);

  const submitTodo = () => {
    //todo: refactor to hook because re-used on [teamname]
    const foundTodo = localTodos?.find(
      (localTodo) => localTodo.id === todo.identifier
    );

    if (foundTodo) {
      if (foundTodo?.completed) {
        setTodos(removeTodo(localTodos));
      } else {
        setTodos([
          ...removeTodo(localTodos),
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

  return (
    <>
      <Heading as="h2" size="lg" marginBottom="2.5rem" color="gray.100">
        {title}
      </Heading>

      <Box
        maxH="25rem"
        overflowY="scroll"
        fontSize="1.2rem"
        scrollBehavior="smooth"
        fontWeight="medium"
        pr="1rem"
      >
        <ReactMarkdown>{body}</ReactMarkdown>
      </Box>

      {todoAttributes && todoAttributes?.length > 0 && (
        <Button
          marginTop="2rem"
          w="fit-content"
          py="1rem"
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
