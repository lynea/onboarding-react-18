import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";

import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/Layout";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import React, { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { getSteps } from "../../requests/steps";
import { getChapters } from "../../requests/chapters";
import { getTeams } from "../../requests/teams";
import ReactMarkdown from "react-markdown";
import { getTodos } from "../../requests/todos";
import { useRecoilState } from "recoil";
import { todosState } from "../../state/todos";

//www.test.nl?chapter=1&step=1 (check if user is eligable, auto load correct step)
//www.test.nl/completed
//www.test.nl/recourses

// chapters
// steps
// ive done it, ill do it later

type StepperProps = {
  onNextClick: () => void;
  onPreviousClick: () => void;
  stepCount: { total: number; current: number };
  chapterCount: { total: number; current: number };
};

const Stepper: FunctionComponent<StepperProps> = ({
  onNextClick,
  onPreviousClick,
  stepCount,
  chapterCount,
}) => (
  <GridItem
    colSpan={12}
    marginTop="2rem"
    bg="blackAlpha.50"
    boxShadow="md"
    p="6"
    rounded="md"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Flex w="100%" alignItems="flex-end">
      <Button
        disabled={chapterCount.current === 1 && stepCount.current === 1}
        leftIcon={<GrFormPreviousLink />}
        colorScheme="cyan"
        variant="solid"
        onClick={onPreviousClick}
        w="20%"
      >
        Previous step
      </Button>
      <Box w="80%" margin="0 4rem" textAlign="center">
        <Text fontSize="xl" marginBottom="1rem" color="white">
          <strong>step: </strong> {`${stepCount.current}/${stepCount.total}`}
        </Text>
        <Progress
          value={(stepCount.current / stepCount.total) * 100}
          colorScheme="purple"
        />
      </Box>

      <Button
        w="20%"
        rightIcon={<GrFormNextLink />}
        colorScheme="cyan"
        variant="solid"
        onClick={onNextClick}
        disabled={
          chapterCount.current === chapterCount.total &&
          stepCount.current === stepCount.total
        }
      >
        Next step
      </Button>
    </Flex>
  </GridItem>
);

type Step = {
  title: string;
  body: string;
  canBeCompleted: boolean;
  priority: number;
  todos: any;
};

type Chapter = {
  title: string;
  steps: Step[];
};

type ChapterProps = Chapter & {
  currentStep: number;
};

const Step: FunctionComponent<Step> = ({
  body,
  title,
  canBeCompleted,
  todos,
}) => {
  const [loading, setLoading] = useState(false);
  const getAttributes = (result: any) =>
    result.data.map((item: any) => item.attributes);
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

      {todoAttributes?.length > 0 && (
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

//check which chapter it is and inject the steps default step is 1

const Chapter: FunctionComponent<ChapterProps> = ({
  title,
  steps,
  currentStep,
}) => {
  console.log("stepInfo", steps?.data?.map((step: any) => step.attributes)[0]);

  //@ts-ignore
  const stepInfo = steps?.data?.map((step: any) => step.attributes)[
    currentStep - 1
  ];

  return (
    <GridItem
      colSpan={12}
      margin="0 2rem"
      border="1px solid gray"
      boxShadow="md"
      color="gray.100"
      p="6"
      rounded="md"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Heading
        as="h1"
        size="2xl"
        marginBottom="2.5rem"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        fontWeight="extrabold"
        bgClip="text"
      >
        {title}
      </Heading>

      <Step {...stepInfo} />
    </GridItem>
  );
};

type HomepageProps = {
  teams: any;
};

const Home: NextPage<HomepageProps> = ({ teams }) => {
  const router = useRouter();
  const [localTodos, setLocalTodos] = useRecoilState(todosState);

  const { step, chapter, teamName } = router.query;

  console.log("teams", teams);

  const newTeams = [...teams];

  const currentTeam = newTeams?.find((team: any) => team.name === teamName);
  const chapters = currentTeam?.chapters?.data?.map(
    (chapter: any) => chapter.attributes
  );

  const findChapterByIndex = (indexToFind: number) =>
    chapters?.find(
      //@ts-ignore
      (responseChapter: any) => responseChapter.index === indexToFind
    );

  const currentChapterInfo = findChapterByIndex(Number(chapter));

  currentChapterInfo?.steps?.data?.sort(
    (a, b) => a.attributes.prio - b.attributes.prio
  );

  if (!currentChapterInfo) {
    return <h1>that chapter does not exist for this team</h1>;
  }

  if (!step || !chapter) {
    return <> no step or chapter specified </>;
  }
  //@ts-ignore
  // const currentChapter = chapters[chapter];
  const isFirstStep = () => Number(step) === 1;

  const handleNextStep = () => {
    //if the chapter has no more steps increment chapter
    const todo = currentChapterInfo?.steps?.data?.map((s: any) => s.attributes)[
      Number(step) - 1
    ].todos?.data[0]?.attributes;

    console.log("todo", todo);
    console.log("local", localTodos);

    if (
      todo &&
      localTodos &&
      !localTodos?.some((localTodo) => localTodo.id === todo.identifier)
    ) {
      setLocalTodos([
        ...localTodos,
        { completed: false, title: todo.title, id: todo.identifier },
      ]);
    }

    //if the todo was not completed set it to the store as uncompleted

    const isLastStep = () =>
      currentChapterInfo.steps.data.length === Number(step);

    const incrementStep = () => (isLastStep() ? 1 : Number(step) + 1);

    //when the step is the last step
    const incrementChapter = () =>
      isLastStep() ? Number(chapter) + 1 : chapter;

    //@ts-ignore
    const link = `/onboarding/${teamName}?chapter=${incrementChapter()}&step=${incrementStep()}`;

    router.push(
      //@ts-ignore
      link,
      undefined,
      {
        shallow: true,
      }
    );
  };
  const handlePreviousStep = () => {
    const decrementStep = () =>
      isFirstStep()
        ? findChapterByIndex(Number(chapter) - 1).steps.data.length
        : Number(step) - 1;
    const decrementChapter = () =>
      isFirstStep() ? Number(chapter) - 1 : chapter;

    router.push(
      //@ts-ignore
      `/onboarding/${teamName}?chapter=${decrementChapter()}&step=${decrementStep()}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" display="flex" justifyContent="center">
        <Layout>
          <Chapter currentStep={Number(step)} {...currentChapterInfo} />
          <Stepper
            chapterCount={{
              current: Number(chapter),
              total: chapters?.length,
            }}
            stepCount={{
              current: Number(step),
              total: currentChapterInfo.steps.data.length,
            }}
            onNextClick={handleNextStep}
            onPreviousClick={handlePreviousStep}
          />
        </Layout>
      </Box>

      <footer></footer>
    </div>
  );
};

export async function getStaticProps() {
  const teams = await getTeams();
  const todos = await getTodos();

  const getAttributes = (result: any) =>
    result.data.map((team: any) => team.attributes);

  return {
    props: {
      teams: getAttributes(teams),
      todos: getAttributes(todos),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { teamName: "sales" } },
      { params: { teamName: "products" } },
      { params: { teamName: "business" } },
    ],
    fallback: true, // false or 'blocking'
  };
}

export default Home;
