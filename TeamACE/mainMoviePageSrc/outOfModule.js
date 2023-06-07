let clickedDirectory = (movieId) => {
    window.sharedMovieId = movieId;
    window.open("../detailMoviePageHtml/detailMoviePage.html");
  };