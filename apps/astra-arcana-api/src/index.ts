import { Ingredient, Incantation } from "@astra-arcana/spellcasting-types";
import { defaultIngredients, defaultIncantations } from "./default-data";

// Use the default data from the separate file
const ingredients = defaultIngredients;
const incantations = defaultIncantations;

/**
 * Interface for the application environment
 */
interface Env {
  // Add bindings here if needed
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		// Enable CORS
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		};

		// Handle OPTIONS requests (for CORS)
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders
			});
		}

		// Allow GET and POST requests based on the endpoint
		if (path === '/api/cast') {
			// Only allow POST for the cast endpoint
			if (request.method !== 'POST') {
				return new Response('Method not allowed for this endpoint', {
					status: 405,
					headers: corsHeaders
				});
			}

			try {
				// Parse the JSON body with proper typing
				const data = await request.json() as { 
					ingredients?: Ingredient[], 
					incantations?: Incantation[] 
				};
				const { ingredients = [], incantations = [] } = data;
				
				// For now, always return success
				return new Response(JSON.stringify({
					success: true,
					message: 'Spell cast successfully!',
					timestamp: new Date().toISOString(),
					details: {
						ingredients_count: ingredients?.length || 0,
						incantations_count: incantations?.length || 0
					}
				}), {
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders
					}
				});
			} catch (error) {
				return new Response(JSON.stringify({
					error: 'Invalid request data',
					message: error instanceof Error ? error.message : 'Unknown error'
				}), {
					status: 400,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders
					}
				});
			}
		}
		
		// For other endpoints, only allow GET requests
		if (request.method !== 'GET') {
			return new Response('Method not allowed', {
				status: 405,
				headers: corsHeaders
			});
		}

		// Route to appropriate endpoint
		if (path === '/api/ingredients') {
			// Return the full ingredient objects
			return new Response(JSON.stringify(ingredients), {
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders
				}
			});
		} else if (path === '/api/incantations') {
			// Return the full incantation objects
			return new Response(JSON.stringify(incantations), {
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders
				}
			});
		} else if (path === '/' || path === '/api') {
			return new Response(JSON.stringify({
				message: 'Welcome to the Astra Arcana API',
				endpoints: {
					ingredients: '/api/ingredients',
					incantations: '/api/incantations',
					cast: '/api/cast'
				}
			}), {
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders
				}
			});
		} else {
			return new Response(JSON.stringify({ error: 'Not found' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders
				}
			});
		}
	},
} satisfies ExportedHandler<Env>;
