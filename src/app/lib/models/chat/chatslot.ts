export type ChatslotFromDB = {
  lastmodified?: Date;
  id: number;
  title: string;
  userid: number;
  messages: Mess[];
};

export type Mess = {
  id: string;
  createdAt?: Date;
  role: "user" | "assistant" | "data" | "system";
  content: string;
};
