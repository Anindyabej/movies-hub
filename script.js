const movieForm = document.querySelector("#movie-form")
const movieInput = document.querySelector("#movie-input")
const movieHub = document.querySelector("#movie-hub")


movieForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let query = movieInput.value.trim()

    if (!query) {
        return
    }
    searchMovie(query)


})

async function searchMovie(movieName) {

    movieHub.innerHTML = `<div class="loader"></div>`

    let response = await fetch(`https://www.omdbapi.com/?apikey=62108a8a&s=${encodeURIComponent(movieName)}`);
    let data = await response.json()
    console.log(data);

    if (data.Response === "True") {
        displayMovie(data.Search)
    } else {
        movieHub.innerHTML = `<p>${data.Error}</p>`
    }


}

function displayMovie(movies) {


    movieHub.innerHTML = ""
    movies.forEach(movie => {
        const div = document.createElement("div")

        div.dataset.imdbID=movie.imdbID
        div.setAttribute("class","movie-card")

        div.innerHTML = `
            <div>
                <img src="${movie.Poster}" alt="">
            </div>
            <div>
                <p>${movie.Title}</p>
                <p>${movie.Year}</p>
            </div>
             `
        movieHub.append(div)
    });
}

movieHub.addEventListener("click",(e)=>{
    e.stopPropagation()

    const movieCard = e.target.closest(".movie-card")
    const imdbID = movieCard.dataset.imdbID
    console.log(imdbID);
    location.href=`movie-detail.html?id=${imdbID}`
})


