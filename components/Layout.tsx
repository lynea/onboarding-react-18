import {
  Box,
  Button,
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
  GridItem,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { FunctionComponent, ReactNode, useState } from "react";
import { FcTodoList } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { todosState } from "../state/todos";

const TodoSelection = () => {
  const [todos, setTodos] = useRecoilState(todosState);

  // const isAlreadyCompleted = (id:string) => todos.find((localTodo) => localTodo.id === id)?.completed;

  const handleCheck = (e: any) => {
    if (e.target.checked) {
      const newLocalTodos = [...todos];

      for (const todo of newLocalTodos) {
        if (todo.id === e.target.value) {
          setTodos(newLocalTodos);
          break;
        }
      }
    } else {
      const filteredTodos = [...todos].filter(
        (localTodo) => localTodo.id !== e.target.value
      );

      setTodos(filteredTodos);
    }
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
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader fontWeight="bold" fontSize="2xl">
        To do
      </DrawerHeader>

      <DrawerBody>
        <TodoSelection />
      </DrawerBody>

      <DrawerFooter>
        <Button colorScheme="blue">Save</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const [sidePanelIsOpen, setSidepanelIsOpen] = useState(false);
  const handleSideBar = () => {
    setSidepanelIsOpen(!sidePanelIsOpen);
  };

  return (
    <Box minHeight="100vh" background="blackAlpha.900" width="1700px">
      <Box
        boxShadow="md"
        padding=" 0 2rem"
        bg="white"
        w="100%"
        h="5rem"
        position="fixed"
        left="0"
        top="0"
        justifyContent="space-between"
        alignItems="center"
        display="flex"
      >
        <Heading as="h2" size="lg">
          Mijn onboarding
        </Heading>
        <IconButton
          colorScheme="purple"
          aria-label="Search database"
          icon={<FcTodoList />}
          onClick={handleSideBar}
        />
      </Box>

      <SidePanel isOpen={sidePanelIsOpen} onClose={handleSideBar} />
      <Grid marginTop="7rem" w="100%" templateColumns="repeat(12, 1fr)" gap={4}>
        {children}
      </Grid>
    </Box>
  );
};
