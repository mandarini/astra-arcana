import { Ingredient, Incantation, Recipe } from '@astra-arcana/spellcasting-types';

export class SpellcastingSDK {
  private apiUrl: string;

  constructor(apiUrl: string = 'http://localhost:18787') {
    this.apiUrl = apiUrl;
  }

  /**
   * Fetches all available ingredients from the API
   */
  async getIngredients(): Promise<Ingredient[]> {
    try {
      const response = await fetch(`${this.apiUrl}/api/ingredients`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ingredients: ${response.status}`);
      }

      const data = await response.json();
      return data as Ingredient[];
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  }

  /**
   * Fetches all available incantations from the API
   */
  async getIncantations(): Promise<Incantation[]> {
    try {
      const response = await fetch(`${this.apiUrl}/api/incantations`);

      if (!response.ok) {
        throw new Error(`Failed to fetch incantations: ${response.status}`);
      }

      const data = await response.json();
      return data as Incantation[];
    } catch (error) {
      console.error('Error fetching incantations:', error);
      throw error;
    }
  }

  /**
   * Fetches all available recipes from the API
   */
  async getRecipes(): Promise<Recipe[]> {
    try {
      const response = await fetch(`${this.apiUrl}/api/recipes`);

      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
      }

      const data = await response.json();
      return data as Recipe[];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }

  /**
   * Casts a spell with the selected ingredients and incantations
   */
  async castSpell(
    ingredients: Ingredient[],
    incantations: Incantation[]
  ): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/api/cast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          incantations,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to cast spell: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error casting spell:', error);
      throw error;
    }
  }
}
