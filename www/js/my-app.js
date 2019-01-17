// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


$$(document).on('deviceready', function() {
   
    $('#movieForm').on("submit", function(e){
        
        var searchMovie = $('#movieName').val();
        
        fetchMovies(searchMovie);
        console.log(searchMovie);
        
        e.preventDefault();
    });
    
});







function fetchMovies(searchMovie){
    
    $.ajax({
        method: "GET",
        url: "http://www.omdbapi.com/?apikey=80fe09c6&s=" + searchMovie
        
    }).done(function(data){
        console.log(data);
        
        if(data.Response  == "False"){
            
    myApp.alert('Enter a valid movie name', 'Reminder!');

        }
        
        var moviesArray = data.Search ; 
        
        var moviesList = '';
        
        
        $.each(moviesArray, function(index, movie){
            
            moviesList += ` <li>
      <a href="movie.html" class="item-link item-content" onclick="clickcedMovie('${movie.imdbID}')">
        <div class="item-media"><img src="${movie.Poster}" width="80"></div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">${movie.Title}</div>
            <div class="item-after">${movie.Year}</div>
          </div>
          <div class="item-subtitle">Beatles</div>
          <div class="item-text">Lorem ipsum dolor sit amet...</div>
        </div>
      </a>
    </li> `;
            
            
            $('#moviesList').html(moviesList);
            
        });
    });
    
    
}









function clickcedMovie(id){
    
    console.log(id);
    
    sessionStorage.setItem("movieID", id);
}









myApp.onPageInit('movie', function (page) {

 var mID = sessionStorage.getItem("movieID");
    
    movieDetails(mID);
    
})







 function movieDetails(mID){
      $.ajax({
        method: "GET",
        url: "http://www.omdbapi.com/?apikey=80fe09c6&i=" + mID
        
    }).done(function(response){
          
          console.log(response);
          
          var mDetails = `<div class="card demo-card-header-pic">
  <img src="${response.Poster}">
 
<li>${response.Plot}</li>
 
<li></li>
 
<li></li>
 
<li></li>

`;
    
          
          $('#movieD').html(mDetails);
          
      });
 }


