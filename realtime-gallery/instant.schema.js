// Docs: https://www.instantdb.com/docs/modeling-data
import { i } from "@instantdb/core";

const schema = i.schema({
  entities: {
    reactions: i.entity({
      imageId: i.string().indexed(),
      emoji: i.string(),
      userId: i.string(),
      createdAt: i.number().indexed(),
    }),

    comments: i.entity({
      imageId: i.string().indexed(),
      text: i.string(),
      userId: i.string(),
      createdAt: i.number().indexed(),
    }),
  },
});

export default schema;
