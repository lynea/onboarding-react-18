import {
  Box,
  Button,
  CircularProgress,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { hasSeen as hasSeenState } from "../state/user";

import { useRecoilState } from "recoil";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsloading] = useState(true);
  const [hasSeen, setHasSeen] = useRecoilState(hasSeenState);

  const handleClose = () => {
    setIsOpen(false);
    setHasSeen({ modal: true, todoTip: false });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!hasSeen?.modal && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Welcome to Mijndomein</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              This application was developed as a hobby project by some of our
              developers and is currently in alfa, if you experience any
              difficulty or if you have tips on how we can improve the
              onboarding please let us know
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

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
              fontSize="8rem"
              marginBottom="2.5rem"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              fontWeight="extrabold"
              bgClip="text"
            >
              My onboarding
            </Heading>
          </GridItem>
          <GridItem colStart={3} colEnd={11} height="60rem" position="relative">
            <Spline scene="https://prod.spline.design/8-XX3fWBmbcS9if7/scene.splinecode" />{" "}
            {/* <Image src="/homepage-banner.png" layout="fill" /> */}
          </GridItem>
          <GridItem colStart={5} colEnd={9}>
            <Link href="/onboarding">
              <Button
                w="100%"
                size="lg"
                fontWeight="bold"
                fontSize="4xl"
                py="2.5rem"
                color="#F2F2F2"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                _hover={{ bg: "primary" }}
              >
                Start onboarding
              </Button>
            </Link>
          </GridItem>
        </Layout>
      </Box>

      <Box as="footer" marginTop="4rem" className={styles.footer}>
        Created with{" "}
        {
          <span style={{ padding: "0 0.5rem", color: "red" }}>
            {" "}
            <AiFillHeart></AiFillHeart>
          </span>
        }{" "}
        by: Rene van Dijk
      </Box>
    </div>
  );
};

export default Home;
