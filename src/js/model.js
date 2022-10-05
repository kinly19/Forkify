import { API_URL } from './config';
import { getJSON } from './helpers';

// Model
export const state = {
  recipe: {},
}; 

// Fetch and storing data into state
export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
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