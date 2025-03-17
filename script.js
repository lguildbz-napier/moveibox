document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '8c6e0d1aeefbf693afc7cf77f10c7ea4'; // Replace with your TMDB API key
    const carousel = document.getElementById('carousel');
    const videoPlayer = document.getElementById('video-player');
    const movieTitle = document.getElementById('movie-title');
    const movieOverview = document.getElementById('movie-overview');
    const movieActors = document.getElementById('movie-actors');
    const movieYear = document.getElementById('movie-year');
    const movieScore = document.getElementById('movie-score');
    const movieBudget = document.getElementById('movie-budget');
    const movieHomepage = document.getElementById('movie-homepage');
    const movieTagline = document.getElementById('movie-tagline');
    const movieGenre = document.getElementById('movie-genre');
    const searchBox = document.getElementById('search-box');
    const searchButton = document.getElementById('search-button');

    const movies = [
        { id: 351819, title: 'Fifty Shades of Black' },
        { id: 155, title: 'The Dark Knight' },
        { id: 357096, title: 'I spit on Your Grave III' },
        { id: 27205, title: 'Inception' },
        { id: 345938, title: 'The Shack' },
        { id: 277834, title: 'Moana' },
        { id: 245891, title: 'John Wick' },
        { id: 146301, title: 'Paranormal Activity: The Ghost Dimension' },
        { id: 7299, title: 'Equilibrium' },
        { id: 533535, title: 'Deadpool & Wolverine' }
    ];

    // Load movie thumbnails
    movies.forEach(movie => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'movie-thumbnail';
                thumbnail.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">`;
                thumbnail.addEventListener('click', () => {
                    loadMovie(data);
                });
                carousel.appendChild(thumbnail);
            });
    });

    // Search Functionality
    function performSearch() {
        const searchTerm = searchBox.value.trim().toLowerCase();
        if (!searchTerm) return;

        // Search locally
        const localMovie = movies.find(movie => movie.title.toLowerCase() === searchTerm);
        if (localMovie) {
            fetch(`https://api.themoviedb.org/3/movie/${localMovie.id}?api_key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    loadMovie(data);
                });
        } else {
            // Search TMDB
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const movie = data.results[0];
                        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
                            .then(response => response.json())
                            .then(data => {
                                loadMovie(data);
                            });
                    } else {
                        alert('Movie not found locally or on TMDB.');
                    }
                });
        }
    }

    // Search on button click
    searchButton.addEventListener('click', performSearch);

    // Search on Enter key press
    searchBox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function loadMovie(movie) {
        // Load YouTube video
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const trailer = data.results.find(video => video.type === 'Trailer');
                if (trailer) {
                    videoPlayer.src = `https://www.youtube.com/embed/${trailer.key}`;
                }
            });

        // Display movie information
        movieTitle.textContent = movie.title;
        movieOverview.textContent = movie.overview;
        movieYear.textContent = movie.release_date.split('-')[0];
        movieScore.textContent = movie.vote_average;   
        movieHomepage.textContent = movie.homepage;    
        movieTagline.textContent = movie.tagline; 
        movieGenre.textContent = movie.genres[1].name; 
        movieBudget.textContent = `$${movie.budget.toLocaleString()}`;
        
        const userScore = movie.vote_average;
        movieScore.innerHTML = `${userScore} ${userScore < 7 ? '👎' : '👍'}`;

        // Fetch and display actors
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                movieActors.innerHTML = ''; // Clear previous actors
                data.cast.slice(0, 8).forEach(actor => { // Display top 5 actors
                    const actorThumbnail = document.createElement('div');
                    actorThumbnail.className = 'actor-thumbnail';

                    // Actor image
                    const actorImage = document.createElement('img');
                    actorImage.src = `https://image.tmdb.org/t/p/w200${actor.profile_path}`;
                    actorImage.alt = actor.name;

                    // Actor name (hidden by default, shown on hover)
                    const actorName = document.createElement('div');
                    actorName.className = 'actor-name';
                    actorName.textContent = actor.name;

                    // Append image and name to the thumbnail
                    actorThumbnail.appendChild(actorImage);
                    actorThumbnail.appendChild(actorName);

                    movieActors.appendChild(actorThumbnail);

                    console.log(movieHomepage);
                });
            });
    }
});