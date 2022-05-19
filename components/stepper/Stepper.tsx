import {
  GridItem,
  Flex,
  Button,
  Box,
  Progress,
  Text,
  useTheme,
} from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { StepperProps } from "./types";

export const Stepper: FunctionComponent<StepperProps> = ({
  onNextClick,
  onPreviousClick,
  stepCount,
  chapterCount,
}) => {
  const theme = useTheme();

  return (
    <GridItem
      colStart={2}
      colEnd={12}
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
          leftIcon={<GrFormPreviousLink color="red" />}
          colorScheme="secondary"
          color="gray.100"
          variant="solid"
          onClick={onPreviousClick}
          w="20%"
        >
          Previous step
        </Button>
        <Box w="80%" margin="0 4rem" textAlign="center">
          {/* <Text fontSize="xl" marginBottom="1rem" color="white">
          <strong>step: </strong> {`${stepCount.current}/${stepCount.total}`}
        </Text> */}
          <Progress
            value={(stepCount.current / stepCount.total) * 100}
            bg="gray.100"
            colorScheme="pink"
          />
        </Box>

        <Button
          w="20%"
          rightIcon={<GrFormNextLink />}
          colorScheme="secondary"
          color="gray.100"
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
};
