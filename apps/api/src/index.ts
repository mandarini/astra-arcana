import { Ingredient, Incantation, Recipe, Element, Age, Language, MoonPhase } from '@astra-arcana/spellcasting-types';
import { defaultIngredients, defaultIncantations } from './default-data';
import { defaultRecipes } from './default-recipes';

// Use the default data from the separate files
const ingredients = defaultIngredients;
const incantations = defaultIncantations;
const recipes = defaultRecipes;

/**
 * Interface for the application environment
 */
interface Env {
  // Add bindings here if needed
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Enable CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS requests (for CORS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Allow GET and POST requests based on the endpoint
    if (path === '/api/cast') {
      // Only allow POST for the cast endpoint
      if (request.method !== 'POST') {
        return new Response('Method not allowed for this endpoint', {
          status: 405,
          headers: corsHeaders,
        });
      }

      try {
        // Parse the JSON body with proper typing
        const data = (await request.json()) as {
          ingredients?: Ingredient[];
          incantations?: Incantation[];
        };
        const { ingredients = [], incantations = [] } = data;

        // For now, always return success
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Spell cast successfully!',
            timestamp: new Date().toISOString(),
            details: {
              ingredients_count: ingredients?.length || 0,
              incantations_count: incantations?.length || 0,
            },
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({
            error: 'Invalid request data',
            message: error instanceof Error ? error.message : 'Unknown error',
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }
    }

    // For other endpoints, only allow GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders,
      });
    }

    // Route to appropriate endpoint
    if (path === '/api/filter') {
      // Handle the new filter endpoint
      // Get filter parameters from query string
      const params = url.searchParams;
      
      // Extract filter parameters
      const name = params.get('name')?.toLowerCase();
      const affinity = params.get('affinity');
      const age = params.get('age');
      const language = params.get('language');
      const kind = params.get('kind');
      const moonphase = params.get('moonphase');
      
      // Filter ingredients
      const filteredIngredients = ingredients.filter(ingredient => {
        // Check each filter condition
        if (name && !ingredient.name.toLowerCase().includes(name)) return false;
        if (affinity && ingredient.affinity !== affinity) return false;
        if (age && ingredient.age !== age) return false;
        
        return true; // Include if passes all filters
      });
      
      // Filter incantations
      const filteredIncantations = incantations.filter(incantation => {
        // Check each filter condition
        if (name && !incantation.name.toLowerCase().includes(name)) return false;
        if (affinity && incantation.affinity !== affinity) return false;
        if (language && incantation.language !== language) return false;
        if (kind && incantation.kind !== kind) return false;
        if (moonphase && incantation.moonphase !== moonphase) return false;
        
        return true; // Include if passes all filters
      });
      
      return new Response(
        JSON.stringify({
          ingredients: filteredIngredients,
          incantations: filteredIncantations,
          filters: {
            name: name || undefined,
            affinity: affinity || undefined,
            age: age || undefined,
            language: language || undefined,
            kind: kind || undefined,
            moonphase: moonphase || undefined
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    } else if (path === '/api/ingredients') {
      // Return the full ingredient objects
      return new Response(JSON.stringify(ingredients), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } else if (path === '/api/incantations') {
      // Return the full incantation objects
      return new Response(JSON.stringify(incantations), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } else if (path === '/api/recipes') {
      // Return the full recipe objects
      return new Response(JSON.stringify(recipes), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } else if (path === '/' || path === '/api') {
      return new Response(
        JSON.stringify({
          message: 'Welcome to the Astra Arcana API',
          endpoints: {
            ingredients: '/api/ingredients',
            incantations: '/api/incantations',
            recipes: '/api/recipes',
            cast: '/api/cast',
            filter: '/api/filter?name=...&affinity=...&language=...&kind=...&moonphase=...&age=...',
          },
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    } else {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  },
} satisfies ExportedHandler<Env>;
