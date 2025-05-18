export type SubmissionReport = {
  submission: {
    id: number;
    groupName: string;
    isIndividual: boolean;
    dateSubmitted: string;
  };
  marking: {
    id: number;
    score: string | null;
  } | null;
};

export type SubmissionStatus = {
  submission: {
    id: number;
    dateSubmitted: string;
    markingOutput: string | null;
  };
  marked: boolean;
};
