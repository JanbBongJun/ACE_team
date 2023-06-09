import { loadPage, total_page } from "./makeDirectory.js";
import {
  all_content_container,
  apiInfo,
  searchKeyword,
  genre_ids,
  now_page_num,
  btnMake,
  
} from "./main.js";



export let now_page_num_pagination;

export function btnSet(btnMake, page_first_index) {
  btnMake.forEach((element, index) => {
    const page_index = page_first_index + index;
    element.value = page_index;
    element.innerText = page_index;
    element.onclick = () =>
      loadPage(
        all_content_container,
        apiInfo,
        searchKeyword,
        genre_ids,
        page_index
      );
  });
}

 function clicked_next_btn(btnMake,all_content_container) {
  now_page_num_pagination = now_page_num; //이전 페이지 정보저장됨
  //페이지인덱스+1을 적용한 페이지 인덱스
  let page_index = now_page_num / 1 + 1;

  if (now_page_num === total_page) {
    return;
  } else if (now_page_num % 5 !== 0) {
    loadPage(
      all_content_container,
      apiInfo,
      searchKeyword,
      genre_ids,
      page_index
    );
  } else {
    btnMake.forEach((element) => {
      element.value = element.value-(-5);
      element.innerText = element.value;
    });
    btnSet(btnMake, page_index);
    loadPage(
      all_content_container,
      apiInfo,
      searchKeyword,
      genre_ids,
      page_index
    );
  }
}
 async function clicked_prev_btn(btnMake,all_content_container) {
  let page_index = now_page_num / 1 - 1;
  if (now_page_num === 1) {
    return;
  } else if (now_page_num % 5 !== 1) {
    await loadPage(
      all_content_container,
      apiInfo,
      searchKeyword,
      genre_ids,
      page_index
    );
  } else {
    await btnMake.forEach((element) => {
      element.value = element.value - 5;
      element.innerText = element.value;
    });
    btnSet(btnMake, page_index-4);
    loadPage(
      all_content_container,
      apiInfo,
      searchKeyword,
      genre_ids,
      page_index
    );
  }
}
export function setUpNextBtn(){
    clicked_next_btn(btnMake,all_content_container)
}
export function setUpPrevBtn(){
    clicked_prev_btn(btnMake,all_content_container)
}
