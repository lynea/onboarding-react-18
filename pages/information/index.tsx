import {
  Box,
  Button,
  GridItem,
  Heading,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
import { todosState } from "../../state/todos";
import { hasSeenAllSteps } from "../../state/user";

const Information: NextPage = ({ teams }) => {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length < 3) return;

    router.push("/onboarding");
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
          <GridItem
            colSpan={12}
            margin="0 2rem"
            display="flex"
            justifyContent="center"
            textAlign="center"
            flexDirection="column"
          >
            <Heading
              as="h1"
              size="4xl"
              lineHeight="6rem"
              marginBottom="2.5rem"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              fontWeight="extrabold"
              bgClip="text"
            >
              Lets get to know each other
            </Heading>
            <form>
              <FormControl color="gray.100">
                <FormLabel htmlFor="username" fontSize="2xl">
                  What is your name?
                </FormLabel>
                <Input
                  fontSize="2xl"
                  colorScheme="secondary"
                  placeholder="super awesome developer"
                  color="gray.100"
                  border="none"
                  bg="secondary.700"
                  id="username"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>
              <Button
                my="2rem"
                size="lg"
                type="submit"
                colorScheme="secondary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </form>
          </GridItem>
        </Layout>
      </Box>

      <footer></footer>
    </div>
  );
};

export default Information;
