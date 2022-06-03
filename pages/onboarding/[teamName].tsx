import {
  Box,
  color,
  Grid,
  GridItem,
  Heading,
  useTheme,
} from "@chakra-ui/react";

import Image from "next/image";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { getTeams } from "../../requests/teams";
import { useRecoilState } from "recoil";
import { Todo, todosState } from "../../state/todos";
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

type HomepageProps = {
  teams: TeamAttributes[];
  globalChapters: ChaptersAttributes[];
};

const Home: NextPage<HomepageProps> = ({ teams }) => {
  const router = useRouter();
  const [localTodos, setLocalTodos] = useRecoilState(todosState);

  const { step, chapter, teamName } = router.query;

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
  const chapters: ChaptersAttributes[] | undefined = stepperUtils.getAttributes(
    currentTeam?.chapters?.data ?? []
  );

  const currentChapterInfo = stepperUtils.findChapterByIndex(
    Number(chapter),
    chapters
  );

  currentChapterInfo?.steps?.data?.sort(
    (a, b) => a.attributes.prio - b.attributes.prio
  );

  if (!currentChapterInfo) {
    return <h1>that chapter does not exist for this team</h1>;
  }

  if (!step || !chapter) {
    return <> no step or chapter specified </>;
  }

  const isFirstStep = () => numStep === 1;
  const isLastStep = () => currentChapterInfo.steps.data.length === numStep;
  const steps = stepperUtils.getAttributes(
    currentChapterInfo?.steps?.data ?? []
  );
  const currentStep: StepAttributes | undefined = steps.at(numStep - 1);

  const stepHasImage = !!currentStep?.image?.data;

  const isInLocalStore = (id: string) =>
    localTodos?.some((localTodo: Todo) => localTodo.id === id);

  const handleNextStep = () => {
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

    const link = `/onboarding/${teamName}?chapter=${incrementChapter()}&step=${incrementStep()}`;

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

  return (
    <div>
      <Head>
        <title>Mijn onboarding</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" display="flex" justifyContent="center">
        <Layout>
          <GridItem colSpan={12}>
            <Grid
              templateColumns="repeat(12, 1fr)"
              templateRows="100px 100px 100px 100px 100px"
            >
              <GridItem colStart={2} colEnd={12} rowStart={1} rowEnd={6}>
                <Chapter
                  currentChapter={numChapter}
                  currentStep={numStep}
                  {...currentChapterInfo}
                  imageMode={stepHasImage}
                />
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

          <Stepper
            chapterCount={{
              current: Number(chapter),
              total: chapters?.length ?? 0,
            }}
            stepCount={{
              current: numStep,
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
