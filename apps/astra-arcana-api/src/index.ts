/**
 * Astra Arcana API - Cloudflare Worker
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Provides endpoints for magical ingredients and incantations.
 */

// Sample data for the API endpoints
const ingredients = [
  "Dragon scales",
  "Phoenix feather",
  "Mandrake root",
  "Unicorn horn",
  "Mermaid tears",
  "Troll blood",
  "Fairy dust",
  "Moonstone",
  "Basilisk venom",
  "Griffin claw"
];

const incantations = [
  "Lumos Maxima",
  "Expecto Patronum",
  "Wingardium Leviosa",
  "Alohomora",
  "Accio",
  "Expelliarmus",
  "Protego",
  "Revelio",
  "Silencio",
  "Incendio"
];

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
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		};

		// Handle OPTIONS requests (for CORS)
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders
			});
		}

		// Only allow GET requests
		if (request.method !== 'GET') {
			return new Response('Method not allowed', {
				status: 405,
				headers: corsHeaders
			});
		}

		// Route to appropriate endpoint
		if (path === '/api/ingredients') {
			return new Response(JSON.stringify(ingredients), {
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders
				}
			});
		} else if (path === '/api/incantations') {
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
					incantations: '/api/incantations'
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
