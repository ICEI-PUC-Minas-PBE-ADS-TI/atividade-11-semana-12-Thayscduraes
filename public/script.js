const API_KEY = "7d242317ba8c8a07160e7a9d3875ce28";

const movieList = document.getElementById("movie-list");
const message = document.getElementById("message");
const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");

async function fetchMovies(query = "") {
    let url;

    if (query) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`;
    } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;
    }

    try {
        showMessage("Carregando...");

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erro ao buscar filmes");
        }

        const data = await response.json();

        showMessage("");

        return data.results;

    } catch (error) {
        showMessage("Erro ao carregar filmes.");
        console.error(error);
        return [];
    }
}

function createMovieCard(movie) {

    const card = document.createElement("div");
    card.classList.add("card");

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=Sem+Imagem";

    card.innerHTML = `
        <img src="${poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p><strong>Ano:</strong> ${movie.release_date?.split("-")[0] || "N/A"}</p>
        <p><strong>Nota:</strong> ${movie.vote_average}</p>
        <p>${movie.overview.substring(0, 120)}...</p>
    `;

    return card;
}

function renderMovies(movies) {

    movieList.innerHTML = "";

    if (movies.length === 0) {
        showMessage("Nenhum filme encontrado.");
        return;
    }

    movies.forEach(movie => {
        movieList.appendChild(createMovieCard(movie));
    });
}

function showMessage(text) {
    message.textContent = text;
}

async function init() {
    const movies = await fetchMovies();
    renderMovies(movies);
}

btnSearch.addEventListener("click", async () => {
    const query = searchInput.value.trim();

    const movies = await fetchMovies(query);

    renderMovies(movies);
});

init();


  