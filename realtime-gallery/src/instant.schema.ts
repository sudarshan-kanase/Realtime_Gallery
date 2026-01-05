import { i } from "@instantdb/core";

const schema = i.schema({
  entities: {
    reactions: i.entity({
      createdAt: i.number().indexed(),
      emoji: i.string(),
      imageId: i.string().indexed(),
      userId: i.string(),
    }),

    comments: i.entity({
      createdAt: i.number().indexed(),
      imageId: i.string().indexed(),
      text: i.string(),
      userId: i.string(),
    }),
  },
});

export default schema;
