import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

// Model
export const state = {
  recipe: {},
  recipes: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
}; 

// Fetch and storing data into state
export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // Format object
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    const searchRes = await getJSON(`${API_URL}?search=${query}`);
    const {recipes} = searchRes.data;
    // Map through array
    state.recipes.results = recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        imageURL: rec.image_url,
      };
    });
    // Set states 'page' value back to 1 on each new recipe search
    state.recipes.page = 1;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Page pagination
export const getSearchResultsPage = function (page = state.recipes.page) {
  // Update state
  state.recipes.page = page;

  const start = (page - 1) * state.recipes.resultsPerPage;
  const end = page * state.recipes.resultsPerPage;
  // Return a certain amount
  return state.recipes.results.slice(start, end);
}

// Update serving
export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

// Bookmarks
export const addBookMark = recipe => {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    // Adding new 'bookmarked' property to state.recipe object
    state.recipe.bookmarked = true;
  }
};

export const removeBookmark = id => {
  // remove bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) {
    // Mark current recipe as NOT bookmarked
    state.recipe.bookmarked = false;
  }
};