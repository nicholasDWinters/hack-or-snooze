"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;


/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  return $(`
      <li id="${story.storyId}">${currentUser ? `<i class="${story.isFavorite() ? 'fas' : 'far'} fa-star"></i>` : ''}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);

}

function generateDeletionMarkup(story) {
  const hostName = story.getHostName();
  return $(`
    <li id="${story.storyId}"></a> <i class="fas fa-trash-alt"></i><i class="${story.isFavorite() ? 'fas' : 'far'} fa-star"></i>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
}



/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();


  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);

    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


async function createStory(e) {
  e.preventDefault();
  const title = $('#story-title').val();
  const author = $('#story-author').val();
  const url = $('#story-url').val();
  const newStory = { title, author, url };

  const story = await storyList.addStory(currentUser, newStory);
  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);
  // getAndShowStoriesOnStart();
  // start();
  // navAllStories();
  hidePageComponents();
  $('#story-author').val('');
  $('#story-url').val('');
  $('#story-title').val('');
  $allStoriesList.show();
}

$storyForm.on('submit', createStory);





$storiesContainer.on('click', function (e) {
  if (e.target.classList.contains('fa-star')) {

    let storyId = e.target.parentElement.id;
    if (e.target.classList.contains('far')) {
      currentUser.addToFavorites(storyId);
      e.target.classList.add('fas');
      e.target.classList.remove('far');

    } else {
      currentUser.deleteFromFavorites(storyId);
      e.target.classList.remove('fas');
      e.target.classList.add('far');

    }
  } else if (e.target.classList.contains('fa-trash-alt')) {
    console.log(e.target.parentElement);
    let story = e.target.parentElement.id;
    e.target.parentElement.remove();
    currentUser.deleteFromStories(story);
  }
})
