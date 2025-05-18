import { and, desc, eq } from "drizzle-orm";
import db from "../db/db";
import { MarkingTable } from "../db/schema/marking";
import { SubmissionTable, InsertSubmission } from "../db/schema/submission";

export const createSubmission = async (submission: InsertSubmission) => {
  const newSubmission = await db
    .insert(SubmissionTable)
    .values({ dateSubmitted: new Date().toISOString(), ...submission })
    .returning();

  return newSubmission;
};

export const deleteSubmission = async (submissionId: number) => {
  const response = await db
    .delete(SubmissionTable)
    .where(eq(SubmissionTable.id, submissionId));
  return response.rowCount;
};

export const getLastSubmissionForGroup = async (groupName: string) => {
  const submission = await db
    .select()
    .from(SubmissionTable)
    .where(
      and(
        eq(SubmissionTable.groupName, groupName),
        eq(SubmissionTable.readyToMark, true)
      )
    )
    .leftJoin(MarkingTable, eq(SubmissionTable.id, MarkingTable.submissionId))
    .orderBy(desc(SubmissionTable.dateSubmitted))
    .limit(1);

  if (!submission[0]) {
    return undefined;
  }

  return submission[0];
};

export const markSubmissionReady = async (submissionKey: string) => {
  const update = await db
    .update(SubmissionTable)
    .set({ readyToMark: true })
    .where(eq(SubmissionTable.fileKey, submissionKey));
  return update.rowCount;
};

export const setSubmissionMarkingOutput = async (
  submissionId: number,
  logs: string
) => {
  const update = await db
    .update(SubmissionTable)
    .set({ markingOutput: logs })
    .where(eq(SubmissionTable.id, submissionId));
  return update.rowCount;
};

export const getAllSubmissions = async () => {
  return await db
    .select()
    .from(SubmissionTable)
    .where(eq(SubmissionTable.readyToMark, true))
    .leftJoin(MarkingTable, eq(SubmissionTable.id, MarkingTable.submissionId));
};

export const getSubmissionsForGroup = async (groupName: string) => {
  return await db
    .select()
    .from(SubmissionTable)
    .where(
      and(
        eq(SubmissionTable.groupName, groupName),
        eq(SubmissionTable.readyToMark, true)
      )
    )
    .leftJoin(MarkingTable, eq(SubmissionTable.id, MarkingTable.submissionId))
    .orderBy(desc(SubmissionTable.dateSubmitted));
};
