$(document).ready(function (){
  $('#searchForm').on('submit', function(e){
    let searchText = ($('#searchText').val());
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=653acf63')
    .then(function(response){
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, function(index, movie){
        output += `
          <div class="col-md-3 movie-listing">
            <div class="well text-center">
              <div class="img-container">
                <img src="${movie.Poster}" />
              </div>
              <h5>${movie.Title}</h5>
              <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
          `
      });

      $('#movies').html(output);

    })
    .catch(function(err){
      console.log(err);
    });
};

function movieSelected(id){
  sessionStorage.setItem('movieId', id)
  window.location = 'movie.html'
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=653acf63')
    .then(function(response){
      console.log(response);
      let movie = response.data;

      let output = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail" />
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well pad-lr-20">
          <h3>Plot:</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDb</a>
          <a href="index.html" class="btn btn-default">Go to Search</a>
        </div>
      </div>
      `

      $('#movie').html(output);
    })
    .catch(function(err){
      console.log(err);
    });
};
