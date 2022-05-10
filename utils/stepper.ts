import { ChaptersAttributes, TeamAttributes } from "../types/cms";

const getCurrentTeam = (teams: TeamAttributes[], teamName: string | string[]) =>
  teams.find((team: TeamAttributes) => team.name === teamName);

type ItemWithAttributes = {
  attributes: any;
};

const getAttributes = (itemsWitAttributes: ItemWithAttributes[]): any[] =>
  itemsWitAttributes?.map((item) => item.attributes);

const findChapterByIndex = (
  indexToFind: number,
  chapters: ChaptersAttributes[]
) =>
  chapters?.find(
    (responseChapter: ChaptersAttributes) =>
      responseChapter.index === indexToFind
  );

export { getCurrentTeam, getAttributes, findChapterByIndex };
