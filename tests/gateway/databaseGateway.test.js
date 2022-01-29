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
        title varchar(255) NOT NULL, 
        ingredients text[] NOT NULL, 
        prep_time VARCHAR(50) NOT NULL, 
        cook_time VARCHAR (50) NOT NULL, 
        serves INT NOT NULL, 
        instructions TEXT NOT NULL, 
        author VARCHAR (50) NOT NULL, 
        updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );`
  );
  await client.query(
    `INSERT INTO 
        recipes (title, ingredients, prep_time, cook_time, serves, instructions, author, updated) 
    VALUES 
        ('Spinach recipe', '{\"spinach\"}', '5 mins', '10 mins', 3, 'cook spinach', 'Ben', '2022-01-29T18:30:13.542Z'),
        ('Tomato Soup', '{\"tomato puree\", \"coconut milk\", \"water\"}', '15 mins', '30 mins', 2, 'Mix tomato puree, coconut milk and water and bring to boil. Season with salt and pepper', 'Ben', '2022-01-12T13:33:03.542Z'),
        ('Sweet Potato Mash', '{\"2 sweet potatoes\", \"50ml milk\", \"2 tbsp butter\"}', '10 mins', '30 mins', 4, 'Boil sweet potatoes until soft. Mash sweet potatoes, with butter and milk', 'Ben', '2021-12-16T08:12:08.542Z');`
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

  it('Receives recipes from database', async () => {
    const allRecords = await client.query('SELECT * FROM recipes');
    console.log('all recipes:', allRecords.rows);

    expect(allRecords.rows[0].author).toBe('Ben');
    expect(allRecords.rows[0].title).toBe('Spinach recipe');
    expect(allRecords.rows[1].title).toBe('Tomato Soup');
    expect(allRecords.rows[1].prep_time).toBe('15 mins');
    expect(allRecords.rows[2].title).toBe('Sweet Potato Mash');
  });
});
