import * as getRecipe from '../../pages/api/recipes/[recipe]';

describe('GET api/recipes/[recipe]', () => {
  describe('When the request method is PUT', () => {
    test('Returns a 400 Bad Request', () => {
      const request = { method: 'PUT' };
      const response = { status: jest.fn() };

      getRecipe.default(request, response);

      expect(response.status).toBeCalledWith(400);
    });
  });
  describe('When the request method is POST', () => {
    test('Returns a 400 Bad Request', () => {
      const request = { method: 'POST' };
      const response = { status: jest.fn() };

      getRecipe.default(request, response);

      expect(response.status).toBeCalledWith(400);
    });
  });
  describe('When the request method is GET', () => {
    test('Returns a 200 OK Response', () => {
      const request = { method: 'GET' };
      const response = { status: jest.fn(), json: jest.fn() };

      getRecipe.default(request, response);

      expect(response.status).toBeCalledWith(200);
    });
  });
  describe('When the request method is GET', () => {
    test('Returns a 200 OK Response with a single recipe', () => {
      const request = { method: 'GET' };
      const response = { status: jest.fn(), json: jest.fn() };
      const getRecipeGatewayMethodSpy = jest.spyOn(getRecipe,"getSingleRecipe")

      const recipe = {
        title: 'Another Title',
        ingredients: ['spinach'],
        prepTime: '5 mins',
        cookTime: '30 mins',
        serves: 3,
        instructions: 'cook tomato',
        author: 'Ben',
        timestamp: 20211201,
      }

      getRecipeGatewayMethodSpy.mockReturnValue(recipe);
      getRecipe.default(request, response);

      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith(
        expect.objectContaining({
          data: recipe,
        })
      );
    });
  });
});
