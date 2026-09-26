
const movieDetail= document.querySelector("#movie-detail")
const params = new URLSearchParams(location.search)
const imdbID = params.get("id")

if (imdbID) {
    searchMovie(imdbID.trim())
}

async function searchMovie(imdbID) {
    let response = await fetch(`https://www.omdbapi.com/?apikey=62108a8a&i=${imdbID}&plot=full`);
    let data = await response.json()
    console.log(data);

    if (data.Response === "True") {
        displayMovie(data)
    } else {
        console.log(data.Error);
    }
}

function displayMovie(data) {
    movieDetail.innerHTML=`
        <div>
            <img src="${data.Poster}" alt="">
        </div>
        <div>
            <h2>${data.Title}</h2>
            <div>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Rated}</p>
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p>IMDb:${data.imdbRating} / 10</p>
            </div>
            <div>
                <p>Plot overview</p>
                <p>${data.Plot}</p>
            </div>
            <div>
                <section>
                    <p>Director</p>
                    <p>${data.Director}</p>
                </section>
                <section>
                    <p>Writer</p>
                    <p>${data.Writer}</p>
                </section>
            </div>
            <div>
                 <p>Actors</p>
                    <p>${data.Actors}</p>
            </div>
             <div>
                <section>
                    <p>Language</p>
                    <p>${data.Language}</p>
                </section>
                <section>
                    <p>Country</p>
                    <p>${data.Country}</p>
                </section>
            </div>
        </div>
    
         <button><a href=https://www.imdb.com/title/${data.imdbID} target="_blank"> View On IMDb</a></button>
    `
}

