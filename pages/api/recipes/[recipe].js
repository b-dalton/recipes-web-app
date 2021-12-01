export default (req, res) => {
  if (req.method == 'GET') {
    res.status(200);
    res.json({
      data: {
        title: 'Title',
        ingredients: ['tomato'],
        prepTime: '5 mins',
        cookTime: '30 mins',
        serves: 3,
        instructions: 'cook tomato',
        author: 'Ben',
        timestamp: 20211201,
      },
    });
  } else res.status(400);
};
