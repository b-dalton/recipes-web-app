export default class DatabaseGateway {
  constructor(client) {
    this.client = client;
  }
  async retrieveRecipes() {
    const records = await this.client.query('SELECT * FROM recipes;');
    const allRecipes = records.rows;
    console.log('recipes', allRecipes);

    return allRecipes.map((recipe) => {
      return {
          id: recipe.id,
          title: recipe.title,
          ingredients: recipe.ingredients,
          prepTime: recipe.prep_time,
          cookTime: recipe.cook_time,
          serves: recipe.serves,
          instructions: recipe.instructions,
          author: recipe.author,
          published: recipe.created_at,
          updatedAt: recipe.published_at,
      }
    })
  }

  async retrieveSingleRecipe(id) {
    const record = await this.client.query(
      `SELECT * FROM recipes WHERE id=${id};`
    );
    const singleRecipe = record.rows;

    return singleRecipe.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        ingredients: recipe.ingredients,
        prepTime: recipe.prep_time,
        cookTime: recipe.cook_time,
        serves: recipe.serves,
        instructions: recipe.instructions,
        author: recipe.author,
        published: recipe.created_at,
        updatedAt: recipe.published_at,
      }
    })
  }
}
