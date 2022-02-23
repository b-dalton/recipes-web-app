export default class DatabaseGateway {
  constructor(client) {
    this.client = client;
  }
  async retrieveRecipes() {
    const records = await this.client.query('SELECT * FROM recipes;');
    const allRecipes = records.rows;
    console.log('recipes', allRecipes);

    return allRecipes;
  }

  async retrieveSingleRecipe(id) {
    const record = await this.client.query(
      `SELECT * FROM recipes WHERE id=${id};`
    );
    return record.rows;
  }
}
