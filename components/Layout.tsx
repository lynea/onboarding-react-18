import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";

import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { FcTodoList } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { todosState } from "../state/todos";
import Link from "next/link";

const TodoSelection = () => {
  const [todos, setTodos] = useRecoilState(todosState);

  // const isAlreadyCompleted = (id:string) => todos.find((localTodo) => localTodo.id === id)?.completed;

  const handleCheck = (e: any) => {
    const updatedTodos = JSON.parse(JSON.stringify([...todos]));

    for (const todo of updatedTodos) {
      if (todo.id === e.target.value) {
        todo.completed = !todo.completed;
        break;
      }
    }

    setTodos(updatedTodos);
    // if (e.target.checked) {
    //   const updatedTodos = JSON.parse(JSON.stringify([...todos]));

    //   for (const todo of updatedTodos) {
    //     if (todo.id === e.target.value) {
    //       todo.completed = !todo.completed;
    //       break;
    //     }
    //   }
    //   setTodos(updatedTodos);
    // } else {
    //   const updatedTodos = JSON.parse(JSON.stringify([...todos]));

    //   for (const todo of updatedTodos) {
    //     if (todo.id === e.target.value) {
    //       todo.completed = !todo.completed;
    //       break;
    //     }
    //   }

    //   setTodos(updatedTodos);
    // }
  };
  return (
    <>
      <Heading as="h5" size="sm" marginBottom="1rem">
        Getting started
      </Heading>
      <Stack spacing={5} direction="column">
        {todos.length === 0 && <> no todos yet </>}
        {todos.map((todo) => (
          <Checkbox
            value={todo.id}
            onChange={handleCheck}
            colorScheme="green"
            defaultChecked={todo.completed}
            key={todo.id}
          >
            {todo.title}
          </Checkbox>
        ))}
      </Stack>
      <Divider marginTop="1rem" />
    </>
  );
};

type SidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SidePanel: FunctionComponent<SidePanelProps> = ({ isOpen, onClose }) => (
  <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
    <DrawerOverlay />
    <DrawerContent background="#31203F" color="gray.100">
      <DrawerCloseButton />
      <DrawerHeader fontWeight="bold" fontSize="2xl">
        To do
      </DrawerHeader>

      <DrawerBody>
        <TodoSelection />
      </DrawerBody>

      <DrawerFooter></DrawerFooter>
    </DrawerContent>
  </Drawer>
);

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const [sidePanelIsOpen, setSidepanelIsOpen] = useState(false);
  const [shouldSeetips, setShouldSeeTips] = useState(false);
  const handleSideBar = () => {
    setSidepanelIsOpen(!sidePanelIsOpen);
  };

  useEffect(() => {
    let timer = setTimeout(() => setShouldSeeTips(true), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box minHeight="100vh" width="1700px" display="flex" alignItems="center">
      <Box
        boxShadow="md"
        padding=" 0 2rem"
        w="100%"
        h="5rem"
        position="fixed"
        left="0"
        top="0"
        justifyContent="space-between"
        alignItems="center"
        display="flex"
      >
        <Heading as="h2" size="lg" color="gray.100">
          <Link href="/">Mijn onboarding</Link>
        </Heading>

        <Popover
          returnFocusOnClose={false}
          isOpen={shouldSeetips}
          onClose={() => {
            setShouldSeeTips(false);
          }}
          placement="top"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton
              colorScheme="secondary"
              aria-label="Search database"
              icon={<FcTodoList />}
              onClick={handleSideBar}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Tip:</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>you can view your todos here</PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>

      <SidePanel isOpen={sidePanelIsOpen} onClose={handleSideBar} />
      <Grid
        rowGap={0}
        marginTop="7rem"
        w="100%"
        templateColumns="repeat(12, 1fr)"
        gap={12}
      >
        {children}
      </Grid>
    </Box>
  );
};
