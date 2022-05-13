import { GridItem, Box, Heading } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import Image from "next/image";

type TeamBadgeProps = {
  name: string;
  image: string;
  selected: boolean;
  onClick: (e: any) => void;
  identifier: string;
};

export const TeamBadge: FunctionComponent<TeamBadgeProps> = ({
  image,
  name,
  selected,
  onClick,
  identifier,
}) => (
  <GridItem
    as="button"
    onClick={() => onClick(identifier)}
    cursor={selected ? "default" : "pointer"}
    position="relative"
    colSpan={4}
    display="flex"
    justifyContent="center"
    flexDirection="column"
  >
    <Box
      rounded="full"
      overflow="hidden"
      position="absolute"
      left="0"
      h="7.2rem"
      w="7.2rem"
      boxShadow="xl"
    >
      <Image src={image} alt="Picture of the author" width={500} height={500} />
    </Box>

    <Box
      marginLeft="4rem"
      py="2rem"
      bgGradient={selected ? "linear(to-l, #7928CA, #FF0080)" : "none"}
      backgroundColor={selected ? "none" : "#31203F"}
      rounded="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" size="2xl" color="white" fontWeight="extrabold">
        {name}
      </Heading>
    </Box>
  </GridItem>
);
