// api/instantdb.js
import { init } from "@instantdb/react";

const db = init({
  appId: import.meta.env.VITE_INSTANT_APP_ID,
});

// Helper functions for transactions
export const insertReaction = (data) => {
  return db.transact([
    {
      $action: "insert",
      reaction: data,
    },
  ]);
};

export const insertComment = (data) => {
  return db.transact([
    {
      $action: "insert",
      comment: data,
    },
  ]);
};

export { db };