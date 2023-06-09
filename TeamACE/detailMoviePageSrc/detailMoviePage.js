import { setRecommendedMovieByMovieId, setWatchList, showMovieDetailByMovieId, watchListGet } from "./getMovieInfo.js";
import {makeComment,fillCommentContainer,loginId } from "./loginComment.js";
export let movie_id;
window.onload = async () => {
  //html문서가 준비되면 실행
  let movieId = movie_id = await window.opener.sharedMovieId;
  await setRecommendedMovieByMovieId(movieId);
  await showMovieDetailByMovieId(movieId);
  document.getElementById("writeComment").addEventListener("click", makeComment);
  fillCommentContainer()
  
  await watchListGet();
  document.getElementById('watchListBtn').addEventListener('click',setWatchList)

};

