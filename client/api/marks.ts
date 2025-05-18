import request from "./request";

export const getMarks = async (): Promise<{
  qMarks: number[];
  svyMarks: number[];
  losAlgosMarks: number[];
  deepTradeMarks: number[];
  cookieAlgoMarks: number[];
  bigkneesMarks: number[];
  bearsBullsMarks: number[];
  algorithmicMarks: number[];
}> => {
  const [
    qMarks,
    svyMarks,
    losAlgosMarks,
    deepTradeMarks,
    cookieAlgoMarks,
    bigkneesMarks,
    bearsBullsMarks,
    algorithmicMarks,
  ] = await Promise.all([
    request
      .get(process.env.NEXT_PUBLIC_API + "/static/data/q.json")
      .then((res) => res.data as number[]),
    request
      .get(process.env.NEXT_PUBLIC_API + "/static/data/svy.json")
      .then((res) => res.data as number[]),
    request
      .get(process.env.NEXT_PUBLIC_API + "/static/data/losalgos.json")
      .then((res) => res.data as number[]),
    request
      .get(process.env.NEXT_PUBLIC_API + "/static/data/deeptrade.json")
      .then((res) => res.data as number[]),
    request
      .get(process.env.NEXT_PUBLIC_API + "/static/data/cookiealgorists.json")
      .then((res) => res.data as number[]),
    request
      .get(process.env.NEXT_PUBLIC_API + "/static/data/bigknees.json")
      .then((res) => res.data as number[]),
    request
      .get(process.env.NEXT_PUBLIC_API + "/static/data/bearsbulls.json")
      .then((res) => res.data as number[]),
    request
      .get(
        process.env.NEXT_PUBLIC_API + "/static/data/algorithmically_based.json"
      )
      .then((res) => res.data as number[]),
  ]);

  return {
    qMarks,
    svyMarks,
    losAlgosMarks,
    deepTradeMarks,
    cookieAlgoMarks,
    bigkneesMarks,
    bearsBullsMarks,
    algorithmicMarks,
  };
};
