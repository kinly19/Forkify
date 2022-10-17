import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
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
    resultsView.render(model.state.recipes.results);
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandler(controlSearchResults);
}
init();