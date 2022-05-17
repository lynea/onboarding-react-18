import { Box, Button, GridItem, Heading, Text } from "@chakra-ui/react";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import Link from "next/link";

import { GetTeamsResult, Team, TeamAttributes } from "../../types/cms";

import { TeamBadgeProps } from "../../components/teamBadge/Teambadge";
import dynamic from "next/dynamic";

const TeamBadge = dynamic<TeamBadgeProps>(
  () => import("../../components/teamBadge").then((module) => module.TeamBadge),
  { ssr: false }
);
import { getTeams } from "../../requests/teams";

type TeamspageProps = {
  teams: TeamAttributes[];
};

const Teams: NextPage<TeamspageProps> = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(
    undefined
  );
  const [description, setDescription] = useState<string | undefined>();

  const handleTeamClick = (id: string) => {
    setSelectedTeam(id);
  };

  useEffect(() => {
    const currentTeam = teams.find((team) => team.name === selectedTeam);
    setDescription(currentTeam?.description);
  }, [selectedTeam]);

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
              marginBottom="2.5rem"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              fontWeight="extrabold"
              bgClip="text"
            >
              The teams
            </Heading>
          </GridItem>

          {teams.map((team) => (
            <TeamBadge
              key={team.slug}
              image={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${team.badgeImage.data.attributes.formats.thumbnail.url}`}
              name={team.name}
              selected={selectedTeam === team.name}
              onClick={handleTeamClick}
              identifier={team.name}
            />
          ))}

          <GridItem
            visibility={description ? "visible" : "hidden"}
            colSpan={12}
            rounded="lg"
            background="#31203F"
            color="#E1E1E1"
            p="2rem"
            my="4rem"
          >
            <Text fontSize="lg" fontWeight="bold">
              {description}
            </Text>
          </GridItem>

          <GridItem colStart={5} colEnd={9}>
            <Link href={`/onboarding/${selectedTeam}?chapter=1&step=1`}>
              <Button
                w="100%"
                size="lg"
                fontWeight="bold"
                fontSize="4xl"
                py="2.5rem"
                color="#F2F2F2"
                bgColor="#7928CA"
                disabled={!selectedTeam}
                _hover={{ bg: "#7928CA" }}
              >
                continue
              </Button>
            </Link>
          </GridItem>
        </Layout>
      </Box>

      <footer></footer>
    </div>
  );
};

export async function getStaticProps() {
  const teams: GetTeamsResult = await getTeams();

  const getAttributes = (result: GetTeamsResult): TeamAttributes[] =>
    result.data.map((team: Team) => team.attributes);

  return {
    props: {
      teams: getAttributes(teams),
    },
  };
}

export default Teams;
