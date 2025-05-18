import db from "../db/db";
import { MarkingTable } from "../db/schema/marking";

export const markSubmission = async (submissionId: number, score: number) => {
  return await db
    .insert(MarkingTable)
    .values({
      score: score.toFixed(6),
      submissionId,
    })
    .returning();
};
