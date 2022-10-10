import { API_URL } from './config';
import { getJSON } from './helpers';

// Model
export const state = {
  recipe: {},
  recipes: {
    query: "",
    results: [],
  },
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
  } catch (err) {
    console.log(err);
    throw err;
  }
};