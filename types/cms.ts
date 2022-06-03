export interface GetChapterResponse {
  data: Chapters;
  meta: Meta;
}

export interface GetTeamsResult {
  data: Team[];
  meta: Meta;
}

export interface Team {
  id: number;
  attributes: TeamAttributes;
}

export interface TeamAttributes {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  alias: string;
  chapters: Chapters;
  badgeImage: any;
  description: string;
}

export interface Chapters {
  data: ChaptersData[];
}

export interface ChaptersData {
  id: number;
  attributes: ChaptersAttributes;
}

export interface ChaptersAttributes {
  title: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  steps: Steps;
  global: boolean;
}

export interface Steps {
  data: StepsData[];
}

export interface StepsData {
  id: number;
  attributes: StepAttributes;
}

export interface StepAttributes {
  title: string;
  prio: number;
  canBeCompleted: boolean;
  body: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  todos: Todos;
  image: any;
}

export interface Todos {
  data: TodosData[];
}

export interface TodosData {
  id: number;
  attributes: TodoAttributes;
}

export interface TodoAttributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  identifier: string;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
