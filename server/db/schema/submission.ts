import { pgTable, text, integer, boolean, serial } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const SubmissionTable = pgTable("submission", {
  id: serial("id").primaryKey(),
  groupName: text("group_name"),
  fileKey: text("file_key"),
  isIndividual: boolean("is_individual").notNull().default(false),
  readyToMark: boolean("ready_to_mark").notNull().default(false),
  dateSubmitted: text("date_submitted"), // String date stamp,
  markingOutput: text("marking_output"),
  submittedBy: text("submitted_by"),
});

export type Submission = InferModel<typeof SubmissionTable>; // return type when queried
export type InsertSubmission = InferModel<typeof SubmissionTable, "insert">; // insert type
