import { Ingredient, Incantation, Recipe, Element, Age, Language, MoonPhase } from '@astra-arcana/spellcasting-types';

// Interface for filter options
export interface FilterOptions {
  name?: string;
  affinity?: Element;
  age?: Age;
  language?: Language;
  kind?: 'ritual' | 'spell' | 'support' | 'sacrifice' | 'other';
  moonphase?: MoonPhase;
}

// Interface for filter response
export interface FilterResponse {
  ingredients: Ingredient[];
  incantations: Incantation[];
  filters: {
    name?: string;
    affinity?: Element;
    age?: Age;
    language?: Language;
    kind?: string;
    moonphase?: MoonPhase;
  };
}

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
  
  /**
   * Filter ingredients and incantations based on provided criteria
   * @param options Filter options like name, affinity, etc.
   * @returns Filtered ingredients and incantations
   */
  async filter(options: FilterOptions): Promise<FilterResponse> {
    try {
      // Build the query parameters
      const params = new URLSearchParams();
      
      // Add each defined option to the query params
      if (options.name) params.append('name', options.name);
      if (options.affinity) params.append('affinity', options.affinity);
      if (options.age) params.append('age', options.age);
      if (options.language) params.append('language', options.language);
      if (options.kind) params.append('kind', options.kind);
      if (options.moonphase) params.append('moonphase', options.moonphase);
      
      const url = `${this.apiUrl}/api/filter?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to filter items: ${response.status}`);
      }

      const data = await response.json();
      return data as FilterResponse;
    } catch (error) {
      console.error('Error filtering items:', error);
      throw error;
    }
  }
}
