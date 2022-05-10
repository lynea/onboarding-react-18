import { GridItem, Heading } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { StepAttributes } from "../../types/cms";
import { Step } from "../step";
import * as stepperUtils from "../../utils/stepper";

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
      {stepInfo && <Step {...stepInfo} />}
    </GridItem>
  );
};
