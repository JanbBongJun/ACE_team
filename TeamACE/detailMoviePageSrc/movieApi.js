const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI'
    }
};

////////////////////////////메인페이지 API////////////////////////////////////
//Name을 통해 영화정보 GET
//promise를 then으로 벗겨서 전달하기
export async function findMovieBasicByName(getSearchName, setPageNum) {
    let movieInfo;
    //청불true, language ko로 지정 나머지 조건의 경우 매개변수로 할당
    //템플릿리터럴을 통해 변수를 문자열로 자동 형변환
    await fetch(`https://api.themoviedb.org/3/search/movie?query=${getSearchName}&include_adult=true&language=ko&page=${setPageNum}`, options)
        .then(response => response.json())
        .then(response => {
            movieInfo = response;
        })
        .catch(error => { console.log(error) });
    return movieInfo //promise객체를 반환
} //=> 결과로 받아온 promise객체를 async awiat처리 해주기


//장르 아이디를 통해서 영화 출력
export async function findMovieByGenreId(genres_id) {

    let movieInfo;
    await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=ko&page=1&sort_by=popularity.desc&with_genres=${genres_id}`, options)
        .then(response => response.json())
        .then(response => {
            movieInfo = response;
        })
        .catch(err => console.error(err));
    return movieInfo;
}





////////////////////////////상세페이지 API////////////////////////////////////

//메인페이지에서 전달한 movie_id를 통해 메인=>상세페이지로 넘어갈때의 영화정보 GET
export async function findMovieDetailById(movie_id) {
    let movieInfo;
    await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=ko`, options)
        .then(response => response.json())
        .then(response => {
            movieInfo = response;
        })
        .catch(err => console.error(err));
    return movieInfo;
}

// 영화의 collection_id를 통해서 비슷한 영화가 담긴 collection을 가져온다.
export async function findCollectionByCollectionId(collection_id) {
    let collectionInfo;
    fetch(`https://api.themoviedb.org/3/search/collection?query=${collection_id}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {
            collectionInfo = response;
        })
        .catch(err => console.error(err));
    return collectionInfo
} //매개변수로 입력한 ID와 비슷한장르의 영화추천

export async function recommendMovieById(movie_id) { //매개변수로 입력한 ID와 비슷한장르의 영화추천
    let movieInfo;
    await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?language=ko&page=1`, options)
        .then(response => response.json())
        .then(response => {
            movieInfo = response;
        })
        .catch(err => console.error(err));
    return movieInfo;
}

///////////////////////////watchlist///////////////////////////////////////////////////////////


// const options = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI'
//     },
//     body: JSON.stringify({ media_type: 'movie', media_id: 101, watchlist: true })
//   };

export const setWatchListById = async (movie_id) => {
    const setWatchListOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: `${movie_id}`,
        watchlist: true,
      }),
    };
    
    await fetch("https://api.themoviedb.org/3/account/19670076/watchlist", setWatchListOptions)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡwatchListㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

export const getWatchList= async ()=>{
    let returnWatchList;
    await fetch('https://api.themoviedb.org/3/account/19670076/watchlist/movies?language=ko&page=1&sort_by=created_at.asc', options)
    .then(response => response.json())
    .then(async response => {
        returnWatchList = response.results
    })
    .catch(err => console.error(err));
    // console.log(returnWatchList) ok
    return returnWatchList;
}

