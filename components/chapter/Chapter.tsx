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
      p="2rem 2rem 2rem 20rem"
      bg="secondary.800"
      rounded="md"
      display="flex"
      justifyContent="space-between"
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
        {title}
      </Heading>
      {stepInfo && <Step {...stepInfo} />}
    </Box>
  );
};
