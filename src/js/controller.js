import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
// Support old browser
import 'core-js/stable'; // polyfil
import 'regenerator-runtime/runtime'; // polyfil async functions

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async () => {
  try {
    // Get recipe id from url after #
    const id = window.location.hash.slice(1); //Remove # from string
    if (!id) return;
    // Mark selected search results
    resultsView.update(model.getSearchResultsPage());
    // Update bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // Render spinner
    recipeView.renderSpinner();
    // Load recipe
    await model.loadRecipe(id);
    // Render recipe
    recipeView.render(model.state.recipe);
    
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if(!query) return;
    // Load search results
    await model.loadSearchResults(query);
    // Render results
    resultsView.render(model.getSearchResultsPage());
    // Render pagination buttons
    paginationView.render(model.state.recipes);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = (goToPage) => {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Re new pagination buttons
  paginationView.render(model.state.recipes);
}

const controlServings = (newServing) => {
  // Update serving values
  model.updateServings(newServing);
  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = () => {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  console.log(model.state);
  // Update recipe view
  recipeView.update(model.state.recipe);
  // Render bookmarks list
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
}

const init = () => {
  bookmarksView.addhandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandler(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();