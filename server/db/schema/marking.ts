import { pgTable, integer, serial, decimal } from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { SubmissionTable } from "./submission";

export const MarkingTable = pgTable("marking", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").references(() => SubmissionTable.id, {
    onDelete: "cascade",
  }),
  score: decimal("score"),
});

export type MarkingTable = InferModel<typeof MarkingTable>;
export type InsertMarkingTable = InferModel<typeof MarkingTable, "insert">;
