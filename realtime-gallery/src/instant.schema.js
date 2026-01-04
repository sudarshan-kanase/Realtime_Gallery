
const schema = {
  entities: {
    reactions: {
      attributes: {
        imageId: { type: "string", indexed: true },
        emoji: { type: "string" },
        userId: { type: "string", indexed: true },
        createdAt: { type: "number", indexed: true }
      }
    },
    comments: {
      attributes: {
        imageId: { type: "string", indexed: true },
        text: { type: "string" },
        userId: { type: "string", indexed: true },
        createdAt: { type: "number", indexed: true }
      }
    }
  }
};

export default schema;