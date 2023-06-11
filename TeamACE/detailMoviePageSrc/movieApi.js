const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI'
    }
};

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