import {
  Box,
  Button,
  color,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useTheme,
} from "@chakra-ui/react";

import Image from "next/image";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { getTeams } from "../../requests/teams";
import { useRecoilState, useRecoilValue } from "recoil";
import { Todo, todoInfo, todosState } from "../../state/todos";
import { Chapter } from "../../components/chapter";
import { Stepper } from "../../components/stepper";
import {
  Chapters,
  ChaptersAttributes,
  GetChapterResponse,
  GetTeamsResult,
  StepAttributes,
  Team,
  TeamAttributes,
} from "../../types/cms";

import * as stepperUtils from "../../utils/stepper";
import { getChapters } from "../../requests/chapters";
import { hasCompleted as hasCompletedState } from "../../state/user";
import { hasSeenAllSteps as hasSeenAllStepsState } from "../../state/user";
import { hasSeen as hasSeenState } from "../../state/user";
import Lottie from "lottie-react";
import partyAnimation from "../../public/party-time.json";

type HomepageProps = {
  teams: TeamAttributes[];
  globalChapters: ChaptersAttributes[];
};

const Home: NextPage<HomepageProps> = ({ teams }) => {
  const router = useRouter();
  const [localTodos, setLocalTodos] = useRecoilState(todosState);
  const [hasCompleted, setHasCompleted] = useRecoilState(hasCompletedState);
  const [hasSeen, setHasSeen] = useRecoilState(hasSeenState);
  const todoInfoState = useRecoilValue(todoInfo);
  const [hasSeenAllSteps, setHasSeenAllSteps] =
    useRecoilState(hasSeenAllStepsState);

  const { step, chapter, teamName } = router.query;

  console.log(todoInfoState.total.length, " todoInfoState.total.length");
  console.log(
    todoInfoState?.notCompleted?.length,
    "  todoInfoState?.notCompleted?.length"
  );

  const numStep = Number(step);
  const numChapter = Number(chapter);

  const newTeams = [...teams];

  if (!teamName) {
    return <> oops no teamname was provided </>;
  }

  const currentTeam: TeamAttributes | undefined = stepperUtils.getCurrentTeam(
    newTeams,
    teamName
  );

  //remove the global chapters
  let chapters: ChaptersAttributes[] | undefined = stepperUtils.getAttributes(
    currentTeam?.chapters?.data ?? []
  );

  useEffect(() => {
    //also runs when there are
    if (hasSeenAllSteps && chapters && todoInfoState.notCompleted.length > 0) {
      // first we modify the object by filtering out all completed steps
      for (const chapter of chapters) {
        console.log("chapter", chapter.steps.data);
        const stepsWithTodos = chapter.steps.data.filter(
          (step) => step.attributes.todos.data.length
        );

        console.log("stepsWithTodos", stepsWithTodos);

        for (const step of stepsWithTodos) {
          step.attributes.todos.data = step.attributes.todos.data.filter(
            (todo) => {
              return todoInfoState.notCompleted.some((item) => {
                console.log(item, "item");
                return item.id === todo.attributes.identifier;
              });
            }
          );
        }

        console.log(stepsWithTodos, "setting to ");

        chapter.steps.data = stepsWithTodos;
      }

      chapters =
        chapters.filter((chapter) => chapter.steps.data.length > 0) || [];
    }
  }, [hasSeenAllSteps, todoInfoState]);

  const currentChapterInfo = stepperUtils.findChapterByIndex(
    Number(chapter),
    chapters
  );

  currentChapterInfo?.steps?.data?.sort(
    (a, b) => a.attributes.prio - b.attributes.prio
  );

  if (!currentChapterInfo && todoInfoState.notCompleted.length < 0) {
    return <h1>that chapter does not exist for this team</h1>;
  }

  if (!step || !chapter) {
    return <> no step or chapter specified </>;
  }

  const handleModalClose = () => {
    const updatedState = { ...hasSeen };

    updatedState.openTodosModal = true;

    setHasSeen({ ...updatedState });
  };

  const isFirstStep = () => numStep === 1;
  const isLastStep = () => currentChapterInfo?.steps.data.length === numStep;
  const steps = stepperUtils.getAttributes(
    currentChapterInfo?.steps?.data ?? []
  );
  const currentStep: StepAttributes | undefined = steps.at(numStep - 1);

  const stepHasImage = !!currentStep?.image?.data;

  const isInLocalStore = (id: string) =>
    localTodos?.some((localTodo: Todo) => localTodo.id === id);

  const handleNextStep = () => {
    const isLastStepAndChapter =
      Number(chapter) === chapters?.length &&
      Number(step) === currentChapterInfo?.steps.data.length;

    let link;

    const todo = currentStep?.todos?.data?.at(0)?.attributes;

    if (todo && localTodos && !isInLocalStore(todo.identifier)) {
      setLocalTodos([
        ...localTodos,
        { completed: false, title: todo.title, id: todo.identifier },
      ]);
    }

    //if the todo was not completed set it to the store as uncompleted

    const incrementStep = () => (isLastStep() ? 1 : numStep + 1);

    //when the step is the last step
    const incrementChapter = () =>
      isLastStep() ? Number(chapter) + 1 : chapter;

    if (isLastStepAndChapter) {
      link = `/onboarding/${teamName}?chapter=1&step=1`;
    } else {
      link = `/onboarding/${teamName}?chapter=${incrementChapter()}&step=${incrementStep()}`;
    }

    router.push(link, undefined, {
      shallow: true,
    });
  };
  const handlePreviousStep = () => {
    const decrementStep = () =>
      isFirstStep()
        ? stepperUtils.findChapterByIndex(Number(chapter) - 1, chapters)?.steps
            ?.data?.length
        : numStep - 1;

    const decrementChapter = () =>
      isFirstStep() ? Number(chapter) - 1 : chapter;

    router.push(
      `/onboarding/${teamName}?chapter=${decrementChapter()}&step=${decrementStep()}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  console.log(currentChapterInfo, "currentChapterInfo.steps.data");
  console.log(
    todoInfoState.notCompleted.length,
    "todoInfoState.notCompleted.length"
  );

  return (
    <div>
      <Head>
        <title>Mijn onboarding</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {hasSeenAllSteps &&
        !hasSeen.openTodosModal &&
        todoInfoState.notCompleted.length > 0 && (
          <Modal isOpen={true} onClose={handleModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>You still have todo's!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                You have gone trough all the steps, but have not completed all
                todos. We have filtered out the ones that you already completed
                so you can just go back and complete the other ones at your own
                pace
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

      <Box as="main" display="flex" justifyContent="center">
        <Layout>
          <GridItem colSpan={12}>
            <Grid
              templateColumns="repeat(12, 1fr)"
              templateRows="100px 100px 100px 100px 100px"
            >
              <GridItem colStart={2} colEnd={12} rowStart={1} rowEnd={6}>
                {hasSeenAllSteps && todoInfoState.notCompleted.length < 1 ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Heading
                      as="h1"
                      size="4xl"
                      marginBottom="6rem"
                      bgGradient="linear(to-l, #9A00A8, #FF93D4)"
                      fontWeight="extrabold"
                      bgClip="text"
                    >
                      {" "}
                      You completed the onboarding!{" "}
                    </Heading>
                    <Lottie animationData={partyAnimation} />
                  </Box>
                ) : (
                  //  @ts-ignore
                  <Chapter
                    currentChapter={numChapter}
                    currentStep={numStep}
                    {...currentChapterInfo}
                    imageMode={stepHasImage}
                  />
                )}
              </GridItem>
              {stepHasImage && (
                <GridItem
                  rounded="md"
                  overflow="hidden"
                  colStart={1}
                  colEnd={4}
                  rowStart={2}
                  rowEnd={5}
                  position="relative"
                >
                  <Image
                    priority
                    src={`http://127.0.0.1:1337${currentStep?.image?.data?.attributes?.formats?.small?.url}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </GridItem>
              )}
            </Grid>
          </GridItem>

          {hasSeenAllSteps && todoInfoState.notCompleted.length < 1 ? null : (
            <Stepper
              chapterCount={{
                current: Number(chapter),
                total: chapters?.length ?? 0,
              }}
              stepCount={{
                current: numStep,
                total: currentChapterInfo?.steps?.data?.length ?? 0,
              }}
              onNextClick={handleNextStep}
              onPreviousClick={handlePreviousStep}
            />
          )}
        </Layout>
      </Box>

      <footer></footer>
    </div>
  );
};

export async function getStaticProps() {
  const teams: GetTeamsResult = await getTeams();
  const chapters: GetChapterResponse = await getChapters();

  const getAttributes = (result: any): [] =>
    result.data.map((item: Team) => item.attributes);

  return {
    props: {
      teams: getAttributes(teams),
      globalChapters: getAttributes(chapters),
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
