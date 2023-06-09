import {
  loadPage, //loadPage
} from "./makeDirectory.js";
import { btnSet, setUpNextBtn, setUpPrevBtn } from "./pagination.js";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
export let btnMake;
export let now_page_num = 1; // nowPageNum선언할 장소 찾기
export let all_content_container;
export let apiInfo = "top_rated";
export let searchKeyword = null;
export let genre_ids = null;

window.onload = async () => {
  all_content_container = document.getElementById("movieCategory");

  btnMake = Array.from(document.getElementsByClassName("btn"));
  if (window.opener && window.opener.whatClicked) {
    let whatClicked = window.opener.whatClicked;
    if (whatClicked === "goSearch") {
      searchInput.value = window.opener.searchText;
      await searchFunction();
      console.log(searchKeyword);
      btnSet(btnMake, 1);
      return;
    }
  }
  btnSet(btnMake, 1);

  loadPage(all_content_container, "nowPlaying", null, null, now_page_num);
  searchInput.addEventListener("keydown", async (event) => {
    //엔터로 검색
    if (event.key === "Enter") {
      await searchFunction();
    }
  });
};

const searchFunction = async() => {
  const searchQuery = searchInput.value;
  if (searchQuery.trim() !== "") {
    searchKeyword = searchQuery;
    apiInfo = "keyword";
    await loadPage(all_content_container, apiInfo, searchQuery, null, 1);
  }
};

export const getNowPageNum = (nowPageNum) => {
  now_page_num = nowPageNum;
  console.log(now_page_num);
};

const clickedHomeButton = () => {
  apiInfo = "nowPlaying";
  searchKeyword = null;
  loadPage(all_content_container, apiInfo, searchKeyword, null, 1);
};

searchBtn.addEventListener("click", searchFunction);
document.getElementById("next").addEventListener("click", setUpNextBtn);
document.getElementById("prev_btn").addEventListener("click", setUpPrevBtn);
document
  .getElementById("homeButton")
  .addEventListener("click", clickedHomeButton);

const genreButton = Array.from(document.getElementsByClassName("genre"));

genreButton.forEach((element) => {
  let genreId = element.value;
  element.addEventListener("click", () => {
    genre_ids = genreId;
    apiInfo = "genre";
    searchKeyword = null;
    loadPage(all_content_container, apiInfo, null, genre_ids, 1);
    btnSet(btnMake,1)

  });
});
