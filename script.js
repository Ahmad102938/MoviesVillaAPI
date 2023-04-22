// nevigation
let closebtn = document.querySelector('.close-btn');
let searchbtn = document.querySelector('.search-btn');
let searchbox = document.querySelector('.searchbox');
let nevigation = document.querySelector('.nevigation');
let menu = document.querySelector('.menu');
let header = document.querySelector('header');

searchbtn.onclick = function() {
    searchbox.classList.add('active');
    header.classList.remove('open');
}
closebtn.onclick = function() {
    searchbox.classList.remove('active');
}
menu.onclick = function() {
    header.classList.toggle('open');
    searchbox.classList.remove('active');
}

// FETCHING API-----------TMDB---------------//

const API_KEY = 'api_key=382e616a28f7553b9b0fd27e026f8d99';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const popularAPI_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMDBAPI_URL = BASE_URL + '/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&' + API_KEY;
const genres = [{
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const cards = document.getElementById('cards');

// for search bar-----

const form1 = document.getElementById('form1');
const search1 = document.getElementById('srch');
const tagsEl = document.getElementById('tags');

var selectedgenre = []
setgenre();

function setgenre() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('a');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedgenre.length == 0) {
                selectedgenre.push(genre.id);
            } else {
                if (selectedgenre.includes(genre.id)) {
                    selectedgenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedgenre.splice(idx, 1);
                        }
                    })
                } else {
                    selectedgenre.push(genre.id);
                }
            }
            console.log(selectedgenre);
            getmovies(API_URL + '&with_genres=' + encodeURI(selectedgenre.join(',')));
        })
        tagsEl.append(t);
    })
}

getmovies(API_URL);

function getmovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showmovies(data.results);
    })

}

function showmovies(data) {
    cards.innerHTML = '';

    data.forEach(card => {
        const { title, poster_path, vote_average, overview } = card;
        const movieEl = document.createElement('div');
        movieEl.classList.add('card');
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}" class="card_image">
            <div class="card_content" id="card-content">
                <p>Download ${title} {English With Subtitles} BluRay 480p [300MB] || 720p [450MB] || 1080p [1.2GB]</p>
            </div>
            <div class="card_info">
                <div style="background: none">
                    <i class="fa-brands fa-imdb" style="font-size:30px; color: rgb(202, 187, 22); border: none; text-decoration: none;"></i> ${vote_average}/10
                </div>
                <div>
                    <a href="./" class="card_link">Download</a>
                </div>
            </div>
        `
        cards.appendChild(movieEl);
    });
}

form1.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchterm = search1.value;

    if (searchterm) {
        getmovies(searchURL + '&query=' + searchterm)
    } else {
        getmovies(API_URL)
    }
})

// for popular

const popular = () => {
        getmovies(popularAPI_URL);
    }
    // IMDB

const imdb = () => {
        getmovies(IMDBAPI_URL);
    }
    // home 

const latest = () => {
    getmovies(API_URL);
}