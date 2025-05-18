import request from "./request";

export type GetUploadLinkResponse = {
  url: string;
  key: string;
  fields: Record<string, string>;
};

export const getUploadLink = (): Promise<GetUploadLinkResponse> =>
  request
    .get(process.env.NEXT_PUBLIC_API + "/upload/submissionLink")
    .then((res) => res.data as GetUploadLinkResponse);

export type GetLastSubmissionResponse = string | null;
export const getLastSubmission = (): Promise<GetLastSubmissionResponse> =>
  request
    .get(process.env.NEXT_PUBLIC_API + "/upload/lastSubmission")
    .then((res) => res.data as GetLastSubmissionResponse);

export const markSubmissionReady = (key: string): Promise<void> =>
  request
    .post(process.env.NEXT_PUBLIC_API + "/upload/submission/ready", { key })
    .then((res) => res.data);

export type GetSubmissionStatus = {
  submission: {
    id: number;
    dateSubmitted: string;
    markingOutput: string | null;
  };
  marked: boolean;
}[];

export const getSubmissionStatus = (): Promise<GetSubmissionStatus> =>
  request
    .get(process.env.NEXT_PUBLIC_API + "/upload/status")
    .then((res) => res.data as GetSubmissionStatus);
