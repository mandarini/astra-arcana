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

// No longer need the FilterResponse interface since we removed the filter method

export class SpellcastingSDK {
  private apiUrl: string;

  constructor(apiUrl: string = 'http://localhost:18787') {
    this.apiUrl = apiUrl;
  }

  /**
   * Fetches ingredients from the API with optional filtering
   * @param options Filter options like name, affinity, and age
   * @returns Filtered or all ingredients
   */
  async getIngredients(options?: Pick<FilterOptions, 'name' | 'affinity' | 'age'>): Promise<Ingredient[]> {
    try {
      let url = `${this.apiUrl}/api/ingredients`;
      
      // Add filter parameters if options are provided
      if (options) {
        const params = new URLSearchParams();
        if (options.name) params.append('name', options.name);
        if (options.affinity) params.append('affinity', options.affinity);
        if (options.age) params.append('age', options.age);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      }
      
      const response = await fetch(url);

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
   * Fetches incantations from the API with optional filtering
   * @param options Filter options like name, affinity, language, kind, and moonphase
   * @returns Filtered or all incantations
   */
  async getIncantations(options?: Pick<FilterOptions, 'name' | 'affinity' | 'language' | 'kind' | 'moonphase'>): Promise<Incantation[]> {
    try {
      let url = `${this.apiUrl}/api/incantations`;
      
      // Add filter parameters if options are provided
      if (options) {
        const params = new URLSearchParams();
        if (options.name) params.append('name', options.name);
        if (options.affinity) params.append('affinity', options.affinity);
        if (options.language) params.append('language', options.language);
        if (options.kind) params.append('kind', options.kind);
        if (options.moonphase) params.append('moonphase', options.moonphase);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      }
      
      const response = await fetch(url);

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
  
  // Filter method removed as requested
}
