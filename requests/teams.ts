import { stringify } from "qs";
import { GetTeamsResult } from "../types/cms";

const query = stringify(
  {
    populate: {
      chapters: {
        populate: ["steps", "steps.todos", "steps.image"],
      },
      badgeImage: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

const getTeams = async () => {
  const response = await fetch(
    `${"http://127.0.0.1:1337/api"}/teams?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const teams: GetTeamsResult = await response.json();
  return teams;
};

export { getTeams };
