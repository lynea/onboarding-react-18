import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { StepAttributes } from "../../types/cms";
import { Step } from "../step";
import * as stepperUtils from "../../utils/stepper";
import Image from "next/image";

import { ChapterProps } from "./types";

export const Chapter: FunctionComponent<ChapterProps> = ({
  title,
  steps,
  currentStep,
  currentChapter,
  imageMode,
}) => {
  const stepsAttributes: StepAttributes[] = stepperUtils.getAttributes(
    steps?.data
  );
  const stepInfo = stepsAttributes.at(currentStep - 1);

  return (
    <Box
      margin="0 2rem"
      boxShadow="md"
      color="gray.100"
      p={imageMode ? "2rem 2rem 2rem 20rem" : "2rem 2rem 2rem 2rem"}
      bg="secondary.800"
      rounded="md"
      display="flex"
      justifyContent="flex-start"
      flexDirection="column"
      h="100%"
    >
      <Heading
        as="h1"
        size="2xl"
        marginBottom="2.5rem"
        bgGradient="linear(to-l, #9A00A8, #FF93D4)"
        fontWeight="extrabold"
        bgClip="text"
      >
        Chapter {currentChapter} : {title}
      </Heading>
      {stepInfo && <Step {...stepInfo} />}
    </Box>
  );
};
