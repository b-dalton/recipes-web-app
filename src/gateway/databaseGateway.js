export default class DatabaseGateway {
  async retrieveRecipes(client) {
    const records = await client.query('SELECT * FROM recipes;');
    const allRecipes = records.rows;

    return allRecipes;
  }

  async retrieveSingleRecipe(client, id) {
    const record = await client.query(`SELECT * FROM recipes WHERE id=${id};`);
    return record.rows;
  }
}
