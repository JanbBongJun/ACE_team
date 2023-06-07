import {getNowPageNum,now_page_num,btnMake} from "./main.js";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI'
    }
};
let movie_db,movie_db_length;
export let total_page;

export async function loadPage(all_content_container,apiInfo,searchKeyword,genreId,page_index) {
    // let getPageNumber = now_page_num//이전에 저장된 pageIndex
    change_color_btn(
        btnMake[(now_page_num - 1) % 5],
        btnMake[(page_index - 1) % 5]
      );
    getNowPageNum(page_index)
    //클릭된 페이지에 대한 정보를 clicked_page_num에 저장해서 main으로 export
    //메인에서 export한 clicked_page_num를 now page num에 저장
    all_content_container.innerHTML='';
    let apiAddress;
    switch (apiInfo) {
        case 'top_rated':
            console.log('top_rated')
            apiAddress = `https://api.themoviedb.org/3/movie/top_rated?language=ko&page=${page_index}`;
            break;
        case 'genre':
            console.log('genre')
            apiAddress = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=${page_index}&sort_by=popularity.desc&with_genres=${genreId}`;
            break;
        case 'keyword':
            const searchQuery = encodeURIComponent(searchKeyword);
            console.log("keyword"+searchQuery)
            apiAddress = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=ko&page=${page_index}`;
            break;
        case 'nowPlaying':
            console.log('nowPlaying')
            apiAddress = `https://api.themoviedb.org/3/movie/now_playing?language=ko&page=${page_index}`;
            break;
    }
    await fetch(apiAddress, options)
        .then(response => response.json())
        .then(async response => {
            console.log(apiAddress)
            console.log(response)
            movie_db = await response.results;
            movie_db_length = movie_db.length;
            total_page = response.total_pages;

            console.log(movie_db)
            await movie_db.forEach((element) => { //한페이지에 담길 영화들 all_content_container에 추가 
                all_content_container.innerHTML += makeMovieDirectory(element.id, element.poster_path, element.title,element.vote_average, element.release_date, element.genre_ids);
            })
        })
}
function makeMovieDirectory(id, poster_path, title, vote_average, release_date, genre_ids) {
    const starRating = '⭐'.repeat(Math.floor(vote_average / 2));
    const genres = getGenres(genre_ids);
    const imgUrl = poster_path ? 'https://image.tmdb.org/t/p/w200' + poster_path : 'images/no_image.jpg';
    return `
                <div class="card">        
                    <ul class="card-content">
                        <img src="${imgUrl}" alt="${title}" class="card-image" onclick="clickedDirectory(${id})"/>
                        <h3 class="card-title">${title}</h3>                     
                        <li class="card-genre">${genres}</li>
                        <li class="card-release-date">${release_date}</li>
                        <li class="card-rating">${starRating}</li>
                    </ul>
                </div>
            `;
}

function getGenres(genre_ids) {
    const genreMap = {
        28: '액션',
        12: '모험',
        16: '애니메이션',
        35: '코미디',
        80: '범죄',
        99: '다큐멘터리',
        18: '드라마',
        10751: '가족',
        14: '판타지',
        36: '역사',
        27: '공포',
        10402: '음악',
        9648: '미스터리',
        10749: '로맨스',
        878: 'SF',
        10770: 'TV 영화',
        53: '스릴러',
        10752: '전쟁',
        37: '서부',
    };
    const genres = genre_ids.map((id) => genreMap[id]);
    return genres.join(', ');
}

function change_color_btn(beforeElement, afterElement) {
    //이전페이지와 현재 클릭된 페이지의 색과 글자굵기를 변경
    beforeElement.style.backgroundColor = "white";
    beforeElement.style.fontWeight = "normal";
    afterElement.style.backgroundColor = "#C48CE3";
    afterElement.style.fontWeight = "bold";
  }

