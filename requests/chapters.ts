import { GetChapterResponse } from "./../types/cms";
import { stringify } from "qs";

const query = stringify(
  {
    populate: {
      populate: ["steps", "steps.todos"],
    },
  },
  {
    encodeValuesOnly: true,
  }
);

const getChapters = async () => {
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
  const teams: GetChapterResponse = await response.json();
  return teams;
};

export { getChapters };
