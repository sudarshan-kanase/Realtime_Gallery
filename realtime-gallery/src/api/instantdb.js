import { init } from "@instantdb/core";
import schema from "../instant.schema";

// Hard-coded InstantDB App ID
// Note: This is currently working as expected
// In production, it is recommended to move this to an environment variable
const appId = "0b99c891-82a4-4ec1-84c6-1102fc8cb1b7";

// Debug log to verify App ID during developmentq
// console.log("INSTANT APP ID:", appId);

// Initialize InstantDB with App ID and schema
// This creates the database connection instance
export const db = init({
  appId,   // Unique InstantDB application identifier
  schema,  // Database schema defining entities and relations
});
