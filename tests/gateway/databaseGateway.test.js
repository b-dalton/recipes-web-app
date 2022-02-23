import DatabaseGateway from '../../src/gateway/databaseGateway.js';
const { Client } = require('pg');
const env = require('node-env-file');
env('./.env');

const credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const client = new Client(credentials);

beforeAll(async () => {
  await client.connect();
  await client.query(
    `CREATE TABLE recipes (
        id SERIAL PRIMARY KEY,
        title varchar(255) NOT NULL, 
        ingredients text[] NOT NULL, 
        prep_time VARCHAR(50) NOT NULL, 
        cook_time VARCHAR (50) NOT NULL, 
        serves INT NOT NULL, 
        instructions TEXT NOT NULL, 
        author VARCHAR (50) NOT NULL, 
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );`
  );
  await client.query(
    `INSERT INTO 
        recipes (title, ingredients, prep_time, cook_time, serves, instructions, author) 
    VALUES 
        ('Spinach recipe', '{\"spinach\"}', '5 mins', '10 mins', 3, 'cook spinach', 'Ben'),
        ('Tomato Soup', '{\"tomato puree\", \"coconut milk\", \"water\"}', '15 mins', '30 mins', 2, 'Mix tomato puree, coconut milk and water and bring to boil. Season with salt and pepper', 'Ben'),
        ('Sweet Potato Mash', '{\"2 sweet potatoes\", \"50ml milk\", \"2 tbsp butter\"}', '10 mins', '30 mins', 4, 'Boil sweet potatoes until soft. Mash sweet potatoes, with butter and milk', 'Ben');`
  );
});

afterAll(async () => {
  await client.query('DROP TABLE IF EXISTS recipes;');
  await client.end();
});

describe('Database gateway', () => {
  it('retrieve recipes method returns all recipes', () => {
    const databaseGateway = new DatabaseGateway();

    const retrieveRecipesMethodSpy = jest.spyOn(
      databaseGateway,
      'retrieveRecipes'
    );

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
    retrieveRecipesMethodSpy.mockReturnValue(recipes);

    expect(databaseGateway.retrieveRecipes()).toBe(recipes);
    expect(retrieveRecipesMethodSpy).toHaveBeenCalled();
  });

  it('Receives recipes from datatabse', async () => {
    const databaseGateway = new DatabaseGateway();
    const allRecipes = await databaseGateway.retrieveRecipes(client);

    const expectedResponse = [
      expect.objectContaining({
        id: 1,
        title: 'Spinach recipe',
        ingredients: ['spinach'],
        prep_time: '5 mins',
        cook_time: '10 mins',
        serves: 3,
        instructions: 'cook spinach',
        author: 'Ben',
      }),
      expect.objectContaining({
        id: 2,
        title: 'Tomato Soup',
        ingredients: ['tomato puree', 'coconut milk', 'water'],
        prep_time: '15 mins',
        cook_time: '30 mins',
        serves: 2,
        instructions:
          'Mix tomato puree, coconut milk and water and bring to boil. Season with salt and pepper',
        author: 'Ben',
      }),
      expect.objectContaining({
        id: 3,
        title: 'Sweet Potato Mash',
        ingredients: ['2 sweet potatoes', '50ml milk', '2 tbsp butter'],
        prep_time: '10 mins',
        cook_time: '30 mins',
        serves: 4,
        instructions:
          'Boil sweet potatoes until soft. Mash sweet potatoes, with butter and milk',
        author: 'Ben',
      }),
    ];

    expect(allRecipes).toEqual(expect.arrayContaining(expectedResponse));
  });

  it('retrieves a single recipe from the database', async () => {
    const databaseGateway = new DatabaseGateway();
    const singleRecipe = await databaseGateway.retrieveSingleRecipe(client, 1);

    const expectedRecipe = [
      expect.objectContaining({
        id: 1,
        title: 'Spinach recipe',
        ingredients: ['spinach'],
        prep_time: '5 mins',
        cook_time: '10 mins',
        serves: 3,
        instructions: 'cook spinach',
        author: 'Ben',
      }),
    ];

    expect(singleRecipe).toEqual(expect.arrayContaining(expectedRecipe));
  });
});
