import { Heading, Box, Button, Grid } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { MdDone } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useRecoilState } from "recoil";
import { Todo, todosState } from "../../state/todos";
import { StepAttributes } from "../../types/cms";
import * as stepperUtils from "../../utils/stepper";
import { useSubmitTodo } from "../../hooks/useAddTodo";

export const Step: FunctionComponent<StepAttributes> = ({
  body,
  title,
  todos,
}) => {
  const [localTodos] = useRecoilState(todosState);

  const [loading, submitTodo] = useSubmitTodo();

  const todoAttributes = todos
    ? stepperUtils.getAttributes(todos.data)
    : undefined;

  const todo = todos?.data[0]?.attributes;

  const newTheme = {
    code: (props: any) => {
      const { children } = props;
      return (
        <SyntaxHighlighter language="javascript" style={dracula}>
          {children}
        </SyntaxHighlighter>
      );
    },
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
        <ReactMarkdown
          components={ChakraUIRenderer(newTheme)}
          children={body}
          skipHtml
        />
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
            localTodos?.find(
              (localTodo: Todo) => localTodo.id === todo.identifier
            )?.completed
              ? "red"
              : "green"
          }
          variant="solid"
          rightIcon={<MdDone />}
          onClick={() => submitTodo(todo)}
        >
          {localTodos?.find(
            (localTodo: Todo) => localTodo.id === todo.identifier
          )?.completed
            ? "mark as uncompleted"
            : "mark as completed"}
        </Button>
      )}
    </>
  );
};
