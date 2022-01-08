const elResult = document.querySelector('.movies__result');
const elList = document.querySelector('.movies__list');

const youtubeLink = 'https://www.youtube-nocookie.com/embed/';
elResult.textContent = movies.length;

// MODAL
const elMovieInfoModal = document.querySelector('.movie-info-modal');
const elMovieInfoModalTitle = elMovieInfoModal.querySelector('.movie-info-modal__title');
const elMovieInfoModalRating = elMovieInfoModal.querySelector('.movie-info-modal__rating');
const elMovieInfoModalYear = elMovieInfoModal.querySelector('.movie-info-modal__year');
const elMovieInfoModalDuration = elMovieInfoModal.querySelector('.movie-info-modal__duration');
const elMovieInfoModalIFrame = elMovieInfoModal.querySelector('.movie-info-modal__iframe');
const elMovieInfoModalCategories = elMovieInfoModal.querySelector('.movie-info-modal__categories');
const elMovieInfoModalSummary = elMovieInfoModal.querySelector('.movie-info-modal__summary');
const elMovieInfoModalImdbLink = elMovieInfoModal.querySelector('.movie-info-modal__imdb-link');

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

  /* if (movie.categories !== '' || movie.categories !== 'Uncategorized') {
    newCardCategory.textContent = movie.categories.join(', ');
  } else {
    newCardCategory.textContent = "";
  } */

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

}

// MODAL FUNCTION
function updateMovieInfoModal(imdbId) {
  const movie = movies.find(movie => movie.imdbId === imdbId);

  elMovieInfoModal.dataset.uniqueId = imdbId;
  elMovieInfoModalTitle.textContent = movie.title;
  elMovieInfoModalRating.textContent = movie.imdbRating;
  elMovieInfoModalYear.textContent = movie.year;
  elMovieInfoModalDuration.textContent = getHoursStringFromMinutes(movie.runtime);
  elMovieInfoModalIFrame.src = `https://www.youtube-nocookie.com/embed/${movie.youtubeId}`;
  elMovieInfoModalCategories.textContent = movie.categories.join(', ');
  elMovieInfoModalSummary.textContent = movie.summary;
  elMovieInfoModalImdbLink.href = `https://www.imdb.com/title/${movie.imdbId}`;
}

function getHoursStringFromMinutes(minutes) {
  return `${Math.floor(minutes / 60)} hrs ${minutes % 60} mins`;
}

function onMoviesListInfoButtonClick(evt) {
  if (evt.target.matches('.js-more-info-button')) {
    updateMovieInfoModal(evt.target.dataset.imdbId);
    return;
  }
}

function onMovieInfoModalHidden() {
  elMovieInfoModalIFrame.src = '';
}

// EVENT LISTENERS
if (elMoviesList) {
  elMoviesList.addEventListener('click', onMoviesListInfoButtonClick);
}

// Stop iframe video playback on modal hide
if (elMovieInfoModal) {
  elMovieInfoModal.addEventListener('hidden.bs.modal', onMovieInfoModalHidden);
}