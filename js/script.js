//#region variables
let path = "";
const global = { 
  currentPath: window.location.pathname,
  page: 1,
  totalPages: 1,
};
//#endregion

// Router
function init() {
  switch (global.currentPath) {
    case "/":
    case "/index.html":
    case "/index":
      path = "home";
      displayPopularMovies();
      break;
    case "/shows.html":
    case "/shows":
      path = "shows";
      displayPopularTVShows();
      break;
    case "/tv-details.html":
    case "/tv-details":
      path = "tv-details";
      fetchSingleTVShow();
      break;
    case "/movie-details.html":
    case "/movie-details":
      path = "movie-details";
      fetchSingleMovie();
      break;
    case "/search.html":
    case "/search":
      path = "search";
      searchSwitch();
      break;
  }
  highlight();
}

// Nav-bar Highlight yellow
function highlight() {
  const navList = document.querySelectorAll(".nav-link");
  if (path === "home") navList[0].classList.add("active");
  else if (path === "shows") navList[1].classList.add("active");
}
// Fetch all data (main function)
async function fetchAPIData(endpoint = "movie/popular") {
  const API_KEY = "fed493d2a8f4f1205424cff893950a84";
  const API_URL = "https://api.themoviedb.org/3/";
  const option = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWQ0OTNkMmE4ZjRmMTIwNTQyNGNmZjg5Mzk1MGE4NCIsIm5iZiI6MTczOTEwMzA2My4zODQsInN1YiI6IjY3YTg5YjU3MDQwNTMyMDNiNmUwNGVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rAkXsxQ9bOGqBwUzJD3zl_E4sb_-qU6EI1WRILdOj0s",
    },
  };
  return (await fetch(`${API_URL}${endpoint}`, option)).json();
}
// slider now playng movies
function initSlider() {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    effect: "cube",
    loop: "true",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: ".swiper-pagination",
    },

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
}
// populate popular movies
async function displayPopularMovies() {
  document.querySelector(".spinner").classList.add("show");
  //#region slider fetch and display
  const sliderMovies = (await fetchAPIData("movie/now_playing")).results;
  //console.log(sliderMovies[0]);
  sliderMovies.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "swiper-slide";
    div.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`;
    div.style.backgroundSize = "cover";
    div.style.backgroundPosition = "center";
    div.style.backgroundColor = "rgba(2, 13, 24,0.90)";
    div.style.backgroundBlendMode = "overlay";
    div.style.backdropFilter = "blur(2000px)";
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
      <img src=https://image.tmdb.org/t/p/w500${movie.poster_path} alt="Movie Title" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>`;

    document.querySelector(".swiper-wrapper").appendChild(div);
    //document.querySelector(`#${movie.id}`)
  });

  initSlider();
  //#endregion
  const movies = (await fetchAPIData("movie/popular")).results;
  movies.forEach((movie) => {
    const div = document.querySelector("#popular-movies");
    //#region card
    const card = document.createElement("div");
    card.className = "card";
    //#endregion
    //#region a
    const a = document.createElement("a");
    a.setAttribute("href", `movie-details.html?id=${movie.id}`);
    //#endregion
    //#region img
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );
    img.className = "card-img-top";
    //#endregion
    //#region cardBody
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    //#endregion
    //#region cardTitle (title)
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = movie.title;
    //#endregion
    //#region cardText
    const cardText = document.createElement("p");
    cardText.className = "card-text";
    //#endregion
    //#region textMuted (Release date)
    const textMuted = document.createElement("small");
    textMuted.className = "text-muted";
    const date = new Date(movie.release_date);
    textMuted.innerHTML = `Release: <b>${date.toLocaleDateString("it-it")}</b>`;
    //#endregion
    //#region ALL APPEND
    card.appendChild(a);
    card.appendChild(cardBody);
    a.appendChild(img);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardText.appendChild(textMuted);
    div.appendChild(card);
    //console.log(movie);
    //#endregion
  });
  document.querySelector(".spinner").classList.remove("show");
}
// populate popular TV shows
async function displayPopularTVShows() {
  document.querySelector(".spinner").classList.add("show");

  const tvShows = (await fetchAPIData("tv/popular")).results;
  tvShows.forEach((tvShow) => {
    const div = document.querySelector("#popular-shows");
    //#region card
    const card = document.createElement("div");
    card.className = "card";
    //#endregion
    //#region a
    const a = document.createElement("a");
    a.setAttribute("href", `tv-details.html?id=${tvShow.id}`);
    //#endregion
    //#region img
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    );
    img.className = "card-img-top";
    //#endregion
    //#region cardBody
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    //#endregion
    //#region cardTitle (title)
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = tvShow.name;
    //#endregion
    //#region cardText
    const cardText = document.createElement("p");
    cardText.className = "card-text";
    //#endregion
    //#region textMuted (Release date)
    const textMuted = document.createElement("small");
    textMuted.className = "text-muted";
    const date = new Date(tvShow.first_air_date);
    textMuted.innerText = "Release: " + date.toLocaleDateString("en-US");
    //#endregion
    //#region ALL APPEND
    card.appendChild(a);
    card.appendChild(cardBody);
    a.appendChild(img);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardText.appendChild(textMuted);
    div.appendChild(card);
    //#endregion
  });
  document.querySelector(".spinner").classList.remove("show");
}
// fetching single movie
async function fetchSingleMovie() {
  document.querySelector(".spinner").classList.add("show");
  //#region getting myID from URL >> myMovie from myID
  let myURLID = window.location.search;
  myURLID = new URLSearchParams(myURLID);
  myURLID = myURLID.get("id");
  const movie = await fetchAPIData(`movie/${myURLID}`);
  //#endregion
  //#region background image
  document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundColor = "rgba(2, 13, 24,0.75)";
  document.body.style.backgroundBlendMode = "overlay";
  document.body.style.backdropFilter = "blur(2px)";
  //#endregion
  //#region creation of movie details and append
  //#region movieDetails
  const movieDetails = document.createElement("div");
  movieDetails.id = "movie-details";
  //#endregion
  //#region detailsTop
  const detailsTop = document.createElement("div");
  detailsTop.className = "details-top";
  //#endregion

  //#region divImage
  const divImage = document.createElement("div");
  //#endregion

  //#region img
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  );
  img.className = "card-img-top";
  img.setAttribute("alt", "Movie Title");
  //#endregion

  //#region divInfo
  const divInfo = document.createElement("div");
  //#endregion

  //#region movieTitle
  const movieTitle = document.createElement("h2");
  movieTitle.innerText = movie.title;
  //#endregion

  //#region rating
  const rating = document.createElement("p");
  const starIcon = document.createElement("i");
  starIcon.className = "fas fa-star text-primary";
  rating.appendChild(starIcon);
  rating.innerHTML += ` ${movie.vote_average.toFixed(
    1
  )}/10  votes:  ${movie.vote_count.toLocaleString("it-IT")}`;
  //#endregion

  //#region releaseDate
  const releaseDate = document.createElement("p");
  releaseDate.className = "text-muted";
  const date = new Date(movie.release_date);
  releaseDate.innerHTML = `Release Date: <b>${date.toLocaleDateString(
    "it-it"
  )}</b>`;
  //#endregion

  //#region movieDescription
  const movieDescription = document.createElement("p");
  movieDescription.innerText = movie.overview;
  //#endregion

  //#region genres
  const genresHeader = document.createElement("h5");
  genresHeader.innerText = "Genres";

  const genresList = document.createElement("ul");
  genresList.className = "list-group";
  // append genres
  movie.genres.forEach((gen) => {
    const genre = document.createElement("li");
    genre.innerText = gen.name;
    genresList.appendChild(genre);
  });

  //#endregion

  //#region movieHomepageLink
  const movieHomepageLink = document.createElement("a");
  movieHomepageLink.setAttribute("href", "#");
  movieHomepageLink.setAttribute("target", "_blank");
  movieHomepageLink.className = "btn";
  movieHomepageLink.innerText = "Visit Movie Homepage";
  //#endregion

  //#region detailsBottom
  const detailsBottom = document.createElement("div");
  detailsBottom.className = "details-bottom";
  //#endregion

  //#region movieInfoHeader
  const movieInfoHeader = document.createElement("h2");
  movieInfoHeader.innerText = "Movie Info";
  //#endregion

  //#region movieInfoList
  const movieInfoList = document.createElement("ul");

  const budget = document.createElement("li");
  budget.innerHTML = `<span class='text-secondary'>Budget:</span> $${movie.budget.toLocaleString(
    "en-US"
  )}`;

  const revenue = document.createElement("li");
  revenue.innerHTML = `<span class='text-secondary'>Revenue:</span> $${movie.revenue.toLocaleString(
    "en-US"
  )}`;

  const runtime = document.createElement("li");
  runtime.innerHTML = `<span class='text-secondary'>Runtime:</span> ${movie.runtime} minutes`;

  const status = document.createElement("li");
  status.innerHTML = `<span class='text-secondary'>Status:</span> ${movie.status}`;

  movieInfoList.appendChild(budget);
  movieInfoList.appendChild(revenue);
  movieInfoList.appendChild(runtime);
  movieInfoList.appendChild(status);
  //#endregion

  //#region productionCompanies
  const productionCompaniesHeader = document.createElement("h4");
  productionCompaniesHeader.innerText = "Production Companies";

  const productionCompaniesList = document.createElement("div");
  productionCompaniesList.className = "list-group";
  let companyList = "";
  movie.production_companies.forEach((company, i) => {
    if (i === 0) {
      companyList = companyList + company.name;
    } else {
      companyList = companyList + " , " + company.name;
    }
  });
  productionCompaniesList.innerText = companyList;
  //#endregion

  //#region ALL APPEND

  // Appending all the elements into their respective parents
  movieDetails.appendChild(detailsTop);
  movieDetails.appendChild(detailsBottom);

  detailsTop.appendChild(divImage);
  detailsTop.appendChild(divInfo);

  divImage.appendChild(img);
  divInfo.appendChild(movieTitle);
  divInfo.appendChild(rating);
  divInfo.appendChild(releaseDate);
  divInfo.appendChild(movieDescription);
  divInfo.appendChild(genresHeader);
  divInfo.appendChild(genresList);
  divInfo.appendChild(movieHomepageLink);

  detailsBottom.appendChild(movieInfoHeader);
  detailsBottom.appendChild(movieInfoList);
  detailsBottom.appendChild(productionCompaniesHeader);
  detailsBottom.appendChild(productionCompaniesList);

  // Append movieDetails to your document (assuming you have a container div with id `main-container`)
  document.querySelector("section").appendChild(movieDetails);
  //#endregion

  //#endregion
  document.querySelector(".spinner").classList.remove("show");
}
// fetching single TVShow
async function fetchSingleTVShow() {
  document.querySelector(".spinner").classList.add("show");

  const myTVID = window.location.search.split("=")[1];
  const tvShow = await fetchAPIData(`tv/${myTVID}`);
  //#region background image
  document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundColor = "rgba(2, 13, 24,0.75)";
  document.body.style.backgroundBlendMode = "overlay";
  document.body.style.backdropFilter = "blur(2px)";
  //#endregion
  const container = document.querySelector("section");
  const div = document.createElement("div");
  div.id = "show-details";
  div.innerHTML = `
      
        <div class="details-top">
          <div>
            <img
              src='https://image.tmdb.org/t/p/w500${tvShow.poster_path}'
              class="card-img-top"
              alt="Show Name"
            />
          </div>
          <div>
            <h2>${tvShow.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${tvShow.vote_average.toFixed(
                1
              )}/10  votes:  ${tvShow.vote_count.toLocaleString("it-IT")}
            </p>
            <p class="text-muted">First Air Date: ${new Date(
              tvShow.first_air_date
            )
              .toLocaleDateString("it-it")
              .replaceAll("/", "-")}</p>
            <p>
              ${tvShow.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${(() => {
                let genresSTR = "";
                tvShow.genres.forEach((genre, i) => {
                  genresSTR += `<li>${genre.name}</li>`;
                });
                return genresSTR;
              })()}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Seasons:</span> ${
              tvShow.number_of_seasons
            }</li>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              tvShow.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Air Date:</span>
               ${tvShow.last_air_date}
            </li>
            <li><span class="text-secondary">Status:</span> ${
              tvShow.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${(() => {
            let companySTR = "";
            tvShow.production_companies.forEach((company, i) => {
              companySTR += `<li>${company.name}</li>`;
            });
            return companySTR;
          })()}</div>
        </div>
  `;

  container.appendChild(div);
  document.querySelector(".spinner").classList.remove("show");
}
//#region search functions
async function fetchSearchMovies() {
  document.querySelector(".spinner").classList.add("show");
  document.querySelector('#search-results').replaceChildren()
  let myURLID = window.location.search;
  myURLID = new URLSearchParams(myURLID);
  myURLID = myURLID.get("search-term");
  myURLID = myURLID.trim().replace(" ", "%20");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWQ0OTNkMmE4ZjRmMTIwNTQyNGNmZjg5Mzk1MGE4NCIsIm5iZiI6MTczOTEwMzA2My4zODQsInN1YiI6IjY3YTg5YjU3MDQwNTMyMDNiNmUwNGVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rAkXsxQ9bOGqBwUzJD3zl_E4sb_-qU6EI1WRILdOj0s",
    },
  };
  const movies = await (
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${myURLID}&include_adult=true&language=en-US&page=${global.page}`,
      options
    )
  ).json();
  //
  global.totalPages = movies.total_pages
  global.page = movies.page
  document.querySelector('.page-counter').innerText = `Page ${global.page} of ${global.totalPages}`

  const container = document.querySelector("#search-results");
  movies.results.forEach((movie)=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = 
         `<a href="movie-details.html?id=${movie.id}">
            <img src=https://image.tmdb.org/t/p/w500${movie.poster_path} class="card-img-top" alt="" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${(()=>{
                const date = new Date(movie.release_date);
                if (date != 'Invalid Date')
                  {return date.toLocaleDateString("it-it")}
                  else {return 'Date Unknown'}

              })()}</small>
            </p>
          </div>`;
    container.appendChild(card)
  })
  document.querySelector(".spinner").classList.remove("show");
}
async function fetchSearchTVShows() {
  document.querySelector('#search-results').replaceChildren()
  document.querySelector(".spinner").classList.add("show");
  let myURLID = window.location.search;
  myURLID = new URLSearchParams(myURLID);
  myURLID = myURLID.get("search-term");
  myURLID = myURLID.trim().replace(" ", "%20");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWQ0OTNkMmE4ZjRmMTIwNTQyNGNmZjg5Mzk1MGE4NCIsIm5iZiI6MTczOTEwMzA2My4zODQsInN1YiI6IjY3YTg5YjU3MDQwNTMyMDNiNmUwNGVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rAkXsxQ9bOGqBwUzJD3zl_E4sb_-qU6EI1WRILdOj0s",
    },
  };
  const shows = await (
    await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${myURLID}&include_adult=true&language=en-US&page=${global.page}`,
      options
    )
  ).json();
  global.totalPages = shows.total_pages
  global.page = shows.page
  document.querySelector('.page-counter').innerText = `Page ${global.page} of ${global.totalPages}`
  //
  const container = document.querySelector("#search-results");
  shows.results.forEach((show)=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = 
         `<a href="tv-details.html?id=${show.id}">
            <img src=https://image.tmdb.org/t/p/w500${show.poster_path} class="card-img-top" alt="" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">First Air: ${(()=>{
                const date = (new Date(show.first_air_date));
                if (date != 'Invalid Date')
                {return date.toLocaleDateString("it-it")}
                else {return 'Date Unknown'}
              })()}</small>
            </p>
          </div>`;
    container.appendChild(card)
  })
  document.querySelector(".spinner").classList.remove("show");
}
async function searchSwitch(){
  let movieOrTV = window.location.search;
  movieOrTV = new URLSearchParams(movieOrTV);
  movieOrTV = movieOrTV.get("type");
  console.log(movieOrTV)
  switch (movieOrTV) {
    case 'movie':
      fetchSearchMovies()
      document.querySelector('#next').addEventListener('click',()=>{
        if(global.page < global.totalPages){
          global.page += 1
          fetchSearchMovies()
        }
      })
      document.querySelector('#prev').addEventListener('click',()=>{
        if(global.page > 1){
          global.page -= 1
          fetchSearchMovies()
        }
      })
      break;
  
    case 'tv':
      document.getElementById("tv").checked = true;
      fetchSearchTVShows()
      document.querySelector('#next').addEventListener('click',()=>{
        global.page += 1
        fetchSearchTVShows()
      })
      document.querySelector('#prev').addEventListener('click',()=>{
        if(global.page > 1){
          global.page -= 1
          fetchSearchTVShows()
        }
      })
      break;
  }


}
//#endregion
init();
