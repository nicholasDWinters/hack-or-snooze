"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $('.personal').show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick(evt) {
  console.debug('navSubmitClick', evt);
  hidePageComponents();
  $storyForm.show();
}

function navFavClick() {
  hidePageComponents();
  $favoriteStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateFavoritesMarkup(story);
    $favoriteStoriesList.append($story);
  }

  $favoriteStoriesList.show();

}

function navStoriesClick() {
  hidePageComponents();
  $ownStoriesList.empty();
  if (currentUser.ownStories.length === 0) {
    $ownStoriesList.append(`<p>You have no stories to show!</p>`);
  }
  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {

    const $story = generateDeletionMarkup(story);
    $ownStoriesList.append($story);
  }

  $ownStoriesList.show();

}

$navSubmit.on('click', navSubmitClick);

$navFavorites.on('click', navFavClick);

$navStories.on('click', navStoriesClick);