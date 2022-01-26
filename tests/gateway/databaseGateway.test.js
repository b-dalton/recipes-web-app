import DatabaseGateway from '../../src/gateway/databaseGateway.js';

describe('Database gateway', () => {
  it('retrieve recipes method returns all recipes', () => {
    const databaseGateway = new DatabaseGateway();

    const recipes = [
      {
        title: 'Recipe 1',
        ingredients: ['spinach'],
        prepTime: '5 mins',
        cookTime: '30 mins',
        serves: 3,
        instructions: 'cook spinach',
        author: 'Ben',
        timestamp: '21-12-16 09:17:03',
      },
      {
        title: 'Another Recipe',
        ingredients: ['tomato'],
        prepTime: '10 mins',
        cookTime: '20 mins',
        serves: 1,
        instructions: 'cook tomato',
        author: 'Ben',
        timestamp: '22-01-11 12:00:17',
      },
    ];

    const retrieveRecipesMethodSpy = jest.spyOn(
      databaseGateway,
      'retrieveRecipes'
    );
    retrieveRecipesMethodSpy.mockReturnValue(recipes);

    expect(databaseGateway.retrieveRecipes()).toBe(recipes);
    expect(retrieveRecipesMethodSpy).toHaveBeenCalled();
  });
});
