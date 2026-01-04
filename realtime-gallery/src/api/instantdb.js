import { init } from "@instantdb/react";
import schema from "../instant.schema";

// 🔥 HARD-CODED APP ID (WORKING & SAFE FOR NOW)
const appId = "0b99c891-82a4-4ec1-84c6-1102fc8cb1b7";

console.log("INSTANT APP ID:", appId);

export const db = init({
  appId,
  schema,
});
