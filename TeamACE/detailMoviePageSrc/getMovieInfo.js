import { recommendMovieById } from "./movieApi.js";
export let movieNameInput = "";
let getMovieId;

/////////////////////////검색기능///////////////////////////////
document.getElementById("searchIcon").addEventListener("click", () => {
  window.whatClicked = "goSearch";
  window.searchText = document.getElementById("searchModal").value;
  window.open("../mainMoviePageHtml/index.html", "_blank");
});

/////////////////////////엔터로검색기능//////////////////////////////
document.getElementById("searchModal").addEventListener("keypress", (e) => {
  const code = e.code;
  if (code === "Enter") {
    window.whatClicked = "goSearch";
    window.searchText = document.getElementById("searchModal").value;
    window.open("../mainMoviePageHtml/index.html", "_blank");
  }
});

////////////////////////홈 기능//////////////////////////////
document.getElementById("homeButton").addEventListener("click", () => {
  window.whatClicked = "goHome";
  window.open("../mainMoviePageHtml/index.html", "_self");
});

export async function setRecommendedMovieByMovieId(movieId) {
  //movie_ID를 이용해서 추천영화생성 => onclick이벤트 만들예정
  getMovieId = movieId;
  const recommendMovieCard = document.getElementById("recommendMovie"); //추천영화 클릭하면 상세페이지 이동
  let recommendMovies = await recommendMovieById(movieId);
  console.log(recommendMovies);
  let results = await recommendMovies.results;
  let total_results;
  let recommendMovieHtmls = "";
  if ((total_results = recommendMovies.total_results < 8)) {
    for (let j = 0; j < total_results; i++) {
      recommendMovieHtmls += setRecommendMovieHtml(
        results[j].id,
        results[j].poster_path,
        results[j].title[j],
        results[j].vote_average
      );
    }
  } else {
    for (let i = 0; i < 8; i++) {
      recommendMovieHtmls += setRecommendMovieHtml(
        results[i].id,
        results[i].poster_path,
        results[i].title,
        results[i].vote_average
      );
    }
  }
  recommendMovieCard.innerHTML = recommendMovieHtmls;
}

function setRecommendMovieHtml(id, posterPath, title, voteAverage) {
  //추천영화목록을 만들기 위한 함수
  let reCommendMovieItems;
  const recommendMovieHtml = `
  <div id="${id}" class="recommendItem" class=${title} onclick="clickedRecommendMovie(${id})">
      <img class="recommendImg" src="https://image.tmdb.org/t/p/w400${posterPath}">
      <p class="recommendMovieTitle">${title}</p>
      <p class="recommendMovieGrade">별점:  ${voteAverage}</p>
      <p class="recommendMovie">영화</p>
  </div>
  `;
  return recommendMovieHtml;
}
