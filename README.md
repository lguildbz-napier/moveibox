MovieBox Web Video Player

**Overview**

MovieBox is a web-based video player that allows users to search for movies, view detailed information, watch trailers, and browse popular movies. It leverages The Movie Database (TMDB) API to fetch movie details dynamically.

**Features**

Movie Search: Users can search for movies using the search bar.

Dynamic Movie Information: Displays movie title, overview, release year, budget, genre, user score, and tagline.

Top Actors Display: Shows top 8 actors with profile images.

Embedded Trailer Player: Fetches and plays the official movie trailer.

Popular Movies Carousel: Displays a scrollable list of popular movies.

**Technologies Used**

HTML5: Structuring the web application.

CSS3: Styling for responsiveness and aesthetics.

JavaScript (ES6): Fetching and displaying dynamic movie data.

TMDB API: Provides movie details and trailer information.

**Installation**

Clone the repository:

git clone https://github.com/lguildbz-napier/moviebox.git

Navigate to the project directory:

cd moviebox-web-player

Open index.html in a web browser.

**Setup API Key**

This project uses TMDB API. To enable full functionality:

Register for an API key at TMDB.

Replace the placeholder API key in script.js:

const apiKey = 'YOUR_TMDB_API_KEY';

File Structure

├── index.html        # Main HTML file
├── style.css         # Stylesheet for UI
├── script.js         # JavaScript for dynamic content
├── README.md         # Project documentation

**Usage**

Enter a movie title in the search bar and click "Search".

Click on a movie thumbnail to view details and trailer.

Browse the popular movies section for recommendations.

**Screenshots**



**Contributing**

Feel free to contribute by opening an issue or submitting a pull request.

License

This project is licensed under the MIT License.

Notes

Ensure you have an active internet connection for API calls.

The project does not store or host any movie files; it fetches data dynamically from TMDB.
