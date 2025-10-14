import api from './api'; // your axios instance

export const getAllRecipes = async (params = {}) => {
  // params = { category, tags }
  const res = await api.get("/recipes", { params });
  return res.data.recipes;
};

export const getRecipeById = async (id) => {
  const res = await api.get(`/recipes/${id}`);
  return res.data.recipe; 
};

export const getRecipesByCategory = async (category) => {
  const res = await api.get('/recipes', { params: { category } });
  return res.data.recipe;
};

export const getRecipesByTags = async (tags) => {
  const res = await api.get('/recipes', { params: { tags } });
  return res.data.recipe;
};


export const createRecipe = async (formData, onUploadProgress, token) => {
  if (!token) throw new Error("No token found, user must be logged in");

  const res = await api.post('/recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`  // 🔑 send JWT
    },
    onUploadProgress // a built-in Axios callback that reports progress events while the upload happens
  });

  return res.data.recipe;
};



// You can also add updateRecipe, etc.
