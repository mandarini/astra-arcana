
import { useEffect, useState } from 'react';

export function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [incantations, setIncantations] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedIncantations, setSelectedIncantations] = useState<string[]>([]);
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

  // Default ingredients and incantations from the sketch if API fails
  const defaultIngredients = ['shimmer', 'quill', 'sigil', 'summon imp', 'bind'];
  const defaultIncantations = ['overlay', 'scribe', 'unlock', 'banish', 'swaddle'];

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleIncantationClick = (incantation: string) => {
    setSelectedIncantations([...selectedIncantations, incantation]);
  };

  const handleCastSpell = () => {
    console.log('Casting spell with ingredients:', selectedIngredients);
    console.log('and incantations:', selectedIncantations);
    // Reset selections after casting
    setSelectedIngredients([]);
    setSelectedIncantations([]);
  };

  // Display items from API or use defaults if none available
  const displayIngredients = ingredients.length > 0 ? ingredients : defaultIngredients;
  const displayIncantations = incantations.length > 0 ? incantations : defaultIncantations;

  return (
    <div className="min-h-screen bg-gray-900 text-purple-100 p-4">
      {/* Header section */}
      <header className="flex items-center justify-between mb-8 p-4 border-b border-purple-800">
        <div className="flex items-center">
          {/* Placeholder for logo */}
          <div className="w-16 h-16 mr-4 bg-purple-900 rounded-full flex items-center justify-center text-4xl">
            A
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-wider text-purple-100">ASTRA ARCANA</h1>
            <p className="text-purple-300 italic">Conjure code. Cast beyond.</p>
          </div>
        </div>
        {/* User icon - placeholder */}
        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
      </header>
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-purple-300">Summoning magical elements...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-900 border-l-4 border-red-600 text-red-100 p-4 mb-4" role="alert">
          <p>{error}</p>
          <p className="mt-2">Make sure the API is running on http://localhost:8787</p>
        </div>
      )}

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ingredients column */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-200 text-center">Ingredients</h2>
          <div className="flex flex-col space-y-3">
            {displayIngredients.map((ingredient, index) => (
              <button
                key={index}
                onClick={() => handleIngredientClick(ingredient)}
                className="bg-pink-200 text-gray-800 py-3 px-4 rounded-full text-lg font-semibold transition-all hover:bg-pink-300 active:scale-95 text-center"
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>

        {/* Incantations column */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-200 text-center">Incantations</h2>
          <div className="flex flex-col space-y-3">
            {displayIncantations.map((incantation, index) => (
              <button
                key={index}
                onClick={() => handleIncantationClick(incantation)}
                className="bg-pink-200 text-gray-800 py-3 px-4 rounded-full text-lg font-semibold transition-all hover:bg-pink-300 active:scale-95 text-center"
              >
                {incantation}
              </button>
            ))}
          </div>
        </div>

        {/* Cauldron Staging area */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-purple-200 text-center">Cauldron Staging</h2>
          
          {/* Empty staging area with dashed border */}
          <div className="flex-grow border-2 border-dashed border-blue-500 rounded-lg p-4 mb-4 min-h-40">
            {selectedIngredients.length > 0 || selectedIncantations.length > 0 ? (
              <div className="space-y-2">
                {selectedIngredients.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-purple-300">Ingredients:</h3>
                    <ul className="ml-2">
                      {selectedIngredients.map((item, index) => (
                        <li key={`ing-${index}`} className="text-pink-200">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedIncantations.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-purple-300">Incantations:</h3>
                    <ul className="ml-2">
                      {selectedIncantations.map((item, index) => (
                        <li key={`inc-${index}`} className="text-pink-200">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center">Drag or select items to prepare your spell</p>
            )}
          </div>
          
          {/* Cast Spell button */}
          <button
            onClick={handleCastSpell}
            disabled={selectedIngredients.length === 0 && selectedIncantations.length === 0}
            className="bg-pink-500 text-white py-3 px-6 rounded-lg text-xl font-semibold transition-all hover:bg-pink-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
            <span className="mr-2">✧</span> Cast Spell
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
