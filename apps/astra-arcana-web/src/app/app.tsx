
import { useEffect, useState } from 'react';

export function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [incantations, setIncantations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Assuming the API is running on port 8787 (Cloudflare Workers default)
        const ingredientsResponse = await fetch('http://localhost:8787/api/ingredients');
        const incantationsResponse = await fetch('http://localhost:8787/api/incantations');
        
        if (!ingredientsResponse.ok || !incantationsResponse.ok) {
          throw new Error('Failed to fetch data from API');
        }

        const ingredientsData = await ingredientsResponse.json();
        const incantationsData = await incantationsResponse.json();

        setIngredients(ingredientsData);
        setIncantations(incantationsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Astra Arcana</h1>
      
      {loading && <p className="text-center">Loading magical elements...</p>}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
          <p className="mt-2">Make sure the API is running on http://localhost:63572</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">Magical Ingredients</h2>
          {ingredients.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          ) : !loading && (
            <p className="text-gray-500">No ingredients found</p>
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Mystical Incantations</h2>
          {incantations.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {incantations.map((incantation, index) => (
                <li key={index} className="text-gray-700">{incantation}</li>
              ))}
            </ul>
          ) : !loading && (
            <p className="text-gray-500">No incantations found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
