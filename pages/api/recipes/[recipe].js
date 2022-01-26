import * as getRecipe from './[recipe]';

export default (req, res) => {
  if (req.method == 'GET') {
    res.status(200);
    res.json({
      data: getRecipe.getSingleRecipe(),
    });
  } else res.status(400);
};

// Gateway method to get single recipe
export const getSingleRecipe = () => {
  return {
    title: 'Title',
    ingredients: ['tomato'],
    prepTime: '5 mins',
    cookTime: '30 mins',
    serves: 3,
    instructions: 'cook tomato',
    author: 'Ben',
    timestamp: 20211201,
  };
};

// request might look like: GET /api/recipes/20211201
