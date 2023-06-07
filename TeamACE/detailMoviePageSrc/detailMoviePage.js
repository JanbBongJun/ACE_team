import { setRecommendedMovieByMovieId } from "./getMovieInfo.js";

window.onload = async () => {
  //html문서가 준비되면 실행
  let movieId = await window.opener.sharedMovieId;
  await setRecommendedMovieByMovieId(movieId);
};
