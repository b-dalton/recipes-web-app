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
const databaseGateway = new DatabaseGateway(client);

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
  it('Receives recipes from datatabse', async () => {
    const allRecipes = await databaseGateway.retrieveRecipes();
    console.log('all recipes', allRecipes);

    const expectedResponse = [
      expect.objectContaining({
        id: 1,
        title: 'Spinach recipe',
        ingredients: ['spinach'],
        prepTime: '5 mins',
        cookTime: '10 mins',
        serves: 3,
        instructions: 'cook spinach',
        author: 'Ben',
      }),
      expect.objectContaining({
        id: 2,
        title: 'Tomato Soup',
        ingredients: ['tomato puree', 'coconut milk', 'water'],
        prepTime: '15 mins',
        cookTime: '30 mins',
        serves: 2,
        instructions:
          'Mix tomato puree, coconut milk and water and bring to boil. Season with salt and pepper',
        author: 'Ben',
      }),
      expect.objectContaining({
        id: 3,
        title: 'Sweet Potato Mash',
        ingredients: ['2 sweet potatoes', '50ml milk', '2 tbsp butter'],
        prepTime: '10 mins',
        cookTime: '30 mins',
        serves: 4,
        instructions:
          'Boil sweet potatoes until soft. Mash sweet potatoes, with butter and milk',
        author: 'Ben',
      }),
    ];

    expect(allRecipes).toEqual(expect.arrayContaining(expectedResponse));
  });

  it('retrieves a single recipe from the database', async () => {
    const singleRecipe = await databaseGateway.retrieveSingleRecipe(1);

    const expectedRecipe = [
      expect.objectContaining({
        id: 1,
        title: 'Spinach recipe',
        ingredients: ['spinach'],
        prepTime: '5 mins',
        cookTime: '10 mins',
        serves: 3,
        instructions: 'cook spinach',
        author: 'Ben',
      }),
    ];

    expect(singleRecipe).toEqual(expect.arrayContaining(expectedRecipe));
  });

  it('returns all recipes as a list of domain objects', async () => {
    const allRecipes = await databaseGateway.retrieveRecipes();

    const expectedRecipesResponse = [
      expect.objectContaining({
        id: 1,
        title: 'Spinach recipe',
        ingredients: ['spinach'],
        prepTime: '5 mins',
        cookTime: '10 mins',
        serves: 3,
        instructions: 'cook spinach',
        author: 'Ben',
      }),
      expect.objectContaining({
        id: 2,
        title: 'Tomato Soup',
        ingredients: ['tomato puree', 'coconut milk', 'water'],
        prepTime: '15 mins',
        cookTime: '30 mins',
        serves: 2,
        instructions: 'Mix tomato puree, coconut milk and water and bring to boil. Season with salt and pepper',
        author: 'Ben',
      }),
      expect.objectContaining({
        id: 3,
        title: 'Sweet Potato Mash',
        ingredients: ['2 sweet potatoes', '50ml milk', '2 tbsp butter'],
        prepTime: '10 mins',
        cookTime: '30 mins',
        serves: 4,
        instructions: 'Boil sweet potatoes until soft. Mash sweet potatoes, with butter and milk',
        author: 'Ben',
      })
    ]

    expect(allRecipes).toEqual(expect.arrayContaining(expectedRecipesResponse));
  })

  it('returns a single recipe domain object', async () => {
    const recipe = await databaseGateway.retrieveSingleRecipe(1);

    const expectedRecipe = [
      expect.objectContaining({
        id: 1,
        title: 'Spinach recipe',
        ingredients: ['spinach'],
        prepTime: '5 mins',
        cookTime: '10 mins',
        serves: 3,
        instructions: 'cook spinach',
        author: 'Ben',
      }),
    ];

    expect(recipe).toEqual(expect.arrayContaining(expectedRecipe));
  })
});
