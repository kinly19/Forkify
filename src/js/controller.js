import * as model from './model.js';
import recipeView from './views/recipeView.js';
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
    console.error(err);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
}
init();