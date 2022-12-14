import { API_URL, API_KEY ,RESULTS_PER_PAGE } from './config';
import { AJAX } from './helpers';
// import { getJSON, sendJSON } from './helpers';

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

const createRecipeObject = (data) => {
  const { recipe } = data.data;
   return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && {key: recipe.key}),
   };
}

// Fetch and storing data into state
export const loadRecipe = async (id) => {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    // Format object
    state.recipe = createRecipeObject(data);

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
    // Store query
    state.recipes.query = query;
    const searchRes = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    const {recipes} = searchRes.data;
    // Map through array
    state.recipes.results = recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {key: rec.key}),
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

// Store bookmarks into localStorage
const persistBookmark = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

// Bookmarks
export const addBookMark = recipe => {
  // Add bookmark
  state.bookmarks.push(recipe);
  console.log(recipe)

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    // Adding new 'bookmarked' property to state.recipe object
    state.recipe.bookmarked = true;
  }
  persistBookmark();
};

export const removeBookmark = id => {
  // remove bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) {
    // Mark current recipe as NOT bookmarked
    state.recipe.bookmarked = false;
  }
  persistBookmark();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}

init();

// Debugging
const clearBookmarks = () => {
  localStorage.clear('bookmarks');
}
// clearBookmarks()

export const uploadRecipe = async (newRecipe) => {
  // console.log(Object.entries(newRecipe));
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(str => str.trim());
        const [quantity, unit, description] = ingArr;

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format. Please use the correct format'
          );
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    // Object to upload
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    // Store new uploaded recipe into state
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe)
  } catch (err) {
    throw err;
  } 
}

