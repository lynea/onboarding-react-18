import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  Input,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/Layout";

import Link from "next/link";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    cookies.set("onboarding_auth", password, {
      path: "/",
    });

    router.push("/");
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
          <GridItem
            colSpan={6}
            colStart={4}
            margin="0 2rem"
            display="flex"
            justifyContent="center"
            textAlign="center"
            flexDirection="column"
          >
            <form>
              <FormControl color="gray.100">
                <FormLabel htmlFor="username" fontSize="2xl">
                  Password
                </FormLabel>
                <Input
                  fontSize="2xl"
                  colorScheme="secondary"
                  color="gray.100"
                  border="none"
                  bg="secondary.700"
                  id="username"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormHelperText>
                  {" "}
                  The password should have been provided by the lead developer
                  of your team{" "}
                </FormHelperText>
              </FormControl>
              <Button
                my="2rem"
                size="lg"
                type="submit"
                colorScheme="secondary"
                onClick={handleSubmit}
              >
                Button
              </Button>
            </form>
          </GridItem>
        </Layout>
      </Box>

      <footer>
        Created with{" "}
        {
          <span style={{ padding: "0 0.5rem", color: "red" }}>
            {" "}
            <AiFillHeart></AiFillHeart>
          </span>
        }{" "}
        by: Rene van Dijk
      </footer>
    </div>
  );
};

export default Login;
