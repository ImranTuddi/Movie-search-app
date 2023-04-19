const API_KEY="api_key=16c03a200662d4a5aaf2a6947f671061";
const WEB_URL= "https://api.themoviedb.org/3";
const API_URL = WEB_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = WEB_URL + "/search/movie?" + API_KEY;


const main = document.getElementById("main-div");
const form = document.getElementById("form");
const search =  document.getElementById("search");

getmovies( API_URL);
function getmovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results)
        showmovies(data.results)
        localStorage.setItem("newdata",JSON.stringify( data.results));    
        const cat = localStorage.getItem("newdata");
        console.log(cat)
    })
};

function showmovies(data){
    main.innerHTML="";

    data.forEach(movie => {
        const{title,poster_path,vote_awerage,Overview,release_date}=movie;
        const movieEl=document.createElement("div");
        movieEl.classList.add("movie");
      
        movieEl.innerHTML= `
        <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="rate">${release_date}</span>
            </div>

            <div class="fudther">
                <h3>Overview</h3>
                ${Overview}
            </div>
        `
        main.appendChild(movieEl);
    });
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getmovies(searchURL+ "&query=" + searchTerm)
    }else{
        getmovies(API_URL)
    }
})



async function get_movie_by_id(id) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    const respData = await resp.json()
    return respData
}
async function get_movie_trailer(id) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
    const respData = await resp.json()
    return respData.results[0].key;
}
async function show_popup(card) {
  main.classList.add('movie')
    const movie_id = card.getAttribute('data-id')
    const movie = await get_movie_by_id(movie_id)
    const movie_trailer = await get_movie_trailer(movie_id)
    main.style.background = `linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, 1)), url(${image_path + movie.poster_path})`
  main.innerHTML = `
            <span class="rate">&#10006;</span>
            <div class="content">
                <div class="left">
                    <div class="poster-img">
                        <img src="${image_path + movie.poster_path}" alt="">
                    </div>
                </div>
                <div class="right">
                    <h1>${movie.title}</h1>
                    <h3>${movie.tagline}</h3>
                    <div class="single-info-container">
                        <div class="single-info">
                            <span>Language:</span>
                            <span>${movie.spoken_languages[0].name}</span>
                        </div>
                        <div class="single-info">
                            <span>Rate:</span>
                            <span>${movie.vote_average} / 10</span>
                        </div>
                        <div class="single-info">
                            <span>Release Date:</span>
                            <span>${movie.release_date}</span>
                        </div>
                    </div>
                    <div class="overview">
                        <h2>Overview</h2>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            </div>
    `
    const x_icon = document.querySelector('.x-icon')
    x_icon.addEventListener('click', () => main.classList.remove('movie'))
}



