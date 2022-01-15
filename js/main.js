let elResult = document.querySelector('.movies__result');
let elList = document.querySelector('.movies__list');
let elFilmsSearchForm = document.querySelector('.js-movie-search-form');
let elFilmsSelect = document.querySelector('.select');

let timeInMs = Date.now();

elResult.textContent = films.length;

// FUNCTIONS
const generateGenres = function (films) {
  const uniqueGenres = [];
  films.forEach(film => {
    film.genres.forEach(genre => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
      uniqueGenres.sort();
    });
  });
  uniqueGenres.forEach(genre => {
    let newFilmOption = document.createElement('option')

    newFilmOption.value = genre;
    newFilmOption.textContent = genre;

    elFilmsSelect.appendChild(newFilmOption);
  });
};

elFilmsSearchForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const filteredFilms = [];

  for (let film of films) {
    if (elFilmsSelect.value === 'All' || film.genres.includes(elFilmsSelect.value)) {
      filteredFilms.push(film);
    }
  }

  if (filteredFilms.length > 0) {
    elList.innerHTML = null;
    elResult.innerHTML = filteredFilms.length;
    renderFilms(filteredFilms, elList);
  } else {
    elList.innerHTML = '<div class="col-12">No film found</div>';
  }
});

const renderFilms = function (filmsArray, element) {
  filmsArray.forEach(movie => {
    //CREATE
    let newItem = document.createElement('li');
    let newCard = document.createElement('div');
    let newImg = document.createElement('img');
    let newCardBody = document.createElement('div');
    let newCardTitle = document.createElement('h4');
    let newCardMovieInfo = document.createElement('p');
    let newCardMovieDate = document.createElement('p');
    let newCardGenresList = document.createElement('ul');

    movie.genres.forEach(genre => {
      let newCardGenres = document.createElement('li');
      newCardGenres.textContent = genre;
      newCardGenresList.appendChild(newCardGenres);
    })

    //SET ATTRIBUTE
    newItem.setAttribute('class', 'movies__item movies__item col-sm-6 col-md-4 mb-4');
    newCard.setAttribute('class', 'card movies__card h-100');
    newImg.setAttribute('class', 'card-img-top');
    newImg.setAttribute('src', movie.poster);
    newCardTitle.setAttribute('class', 'text-warning');
    newCardMovieInfo.setAttribute('class', 'text-secondary');
    newCardGenresList.setAttribute('class', 'text-success');
    newCardBody.setAttribute('class', 'card-body d-flex flex-column');

    //TEXT CONTENT
    newCardTitle.textContent = movie.title;
    newCardMovieInfo.textContent = movie.overview;
    newCardMovieDate.textContent = `Release date: ${movie.release_date}`;

    //APPEND CHILD
    element.appendChild(newItem);
    newItem.appendChild(newCard);
    newCard.appendChild(newImg);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardMovieInfo);
    newCardBody.appendChild(newCardMovieDate);
    newCardBody.appendChild(newCardGenresList);
  })
}

renderFilms(films, elList);
generateGenres(films);










/* const elResult = document.querySelector('.movies__result');
const elList = document.querySelector('.movies__list');

const youtubeLink = 'https://www.youtube-nocookie.com/embed/';
elResult.textContent = films.length;


const renderFilms = function (filmArray, element) {

}
for (let movie of movies) {
  //CREATE ELEMENTS
  let newItemMovie = document.createElement('li');
  let newCard = document.createElement('div');
  let newImg = document.createElement('img');
  let newCardBody = document.createElement('div');
  let newCardTitle = document.createElement('h3');
  let newCardDate = document.createElement('p');
  let newCardRating = document.createElement('p');
  let newCardCategory = document.createElement('p');
  let newCardDuration = document.createElement('p');
  let newCardBtnWrapper = document.createElement('div');
  let newCardBtn = document.createElement('a');
  let newCardBtnMoreInfo = document.createElement('button');

  //SET ATTRIBUTE
  newItemMovie.setAttribute('class', 'movies__item col-sm-6 col-md-4 mb-4');
  newCard.setAttribute('class', 'card movies__card h-100');
  newImg.setAttribute('class', 'card-img-top');
  newImg.setAttribute('src', movie.smallThumbnail);
  newCardBody.setAttribute('class', 'card-body d-flex flex-column');
  newCardTitle.setAttribute('class', 'card-title');
  newCardDate.setAttribute('class', 'mb-1');
  newCardRating.setAttribute('class', 'mb-1');
  newCardCategory.setAttribute('class', 'mb-1');
  newCardDuration.setAttribute('class', 'mb-3 text-danger fw-bold');
  newCardBtnWrapper.setAttribute('class', 'mt-auto d-flex flex-column');
  newCardBtn.setAttribute('class', 'btn btn-secondary text-white mt-auto btn-sm mb-2');
  newCardBtn.setAttribute('target', '_blank');
  newCardBtn.setAttribute('href', youtubeLink + movie.youtubeId);
  newCardBtnMoreInfo.setAttribute('class', 'js-more-info-button btn btn-info text-white btn-sm');
  newCardBtnMoreInfo.setAttribute('type', 'button');
  newCardBtnMoreInfo.setAttribute('data-bs-toggle', 'modal');
  newCardBtnMoreInfo.setAttribute('data-bs-target', '#more-info-modal');

  //TEXT CONTENT
  newCardTitle.textContent = movie.title;
  newCardDate.textContent = `Release date: ${movie.year}`;
  newCardRating.textContent = `IMDb rating: ${movie.imdbRating}`;
  newCardCategory.textContent = `Categories: ${movie.categories.join(', ')}`;
  newCardDuration.textContent = `Duration: ${getHoursStringFromMinutes(movie.runtime)}`;
  newCardBtn.textContent = 'Watch Trailer';
  newCardBtnMoreInfo.textContent = 'More info';

  //APPEND CHILD
  elList.appendChild(newItemMovie);
  newItemMovie.appendChild(newCard);
  newCard.appendChild(newImg);
  newCard.appendChild(newCardBody);
  newCardBody.appendChild(newCardTitle);
  newCardBody.appendChild(newCardDate);
  newCardBody.appendChild(newCardRating);
  newCardBody.appendChild(newCardCategory);
  newCardBody.appendChild(newCardDuration);
  newCardBody.appendChild(newCardBtnWrapper);
  newCardBtnWrapper.appendChild(newCardBtn);
  newCardBtnWrapper.appendChild(newCardBtnMoreInfo);

} */