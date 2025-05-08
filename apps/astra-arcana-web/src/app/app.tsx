
import { useEffect, useState } from 'react';
import logo from '../assets/astra-arcana-logo.png';
import textLogo from '../assets/astra-arcana-text.png';
import founderPic from '../assets/founder-astra.png';

// Define types for our drag items
type ItemType = 'ingredient' | 'incantation';

export function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [incantations, setIncantations] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedIncantations, setSelectedIncantations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

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


  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleIncantationClick = (incantation: string) => {
    setSelectedIncantations([...selectedIncantations, incantation]);
  };
  
  // Simplified drag and drop handlers
  const onDragStart = (e: React.DragEvent, content: string, itemType: ItemType) => {
    // Store the dragged item and its type as a JSON string
    const data = JSON.stringify({ content, itemType });
    e.dataTransfer.setData('application/json', data);
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback
    const target = e.target as HTMLElement;
    target.style.opacity = '0.4';
  };
  
  const onDragEnd = (e: React.DragEvent) => {
    // Reset opacity when drag ends
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
  };
  
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(true);
    return false;
  };
  
  const onDragLeave = () => {
    setIsDraggedOver(false);
  };
  
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(false);
    
    try {
      // Get the data from the drag event
      const jsonData = e.dataTransfer.getData('application/json');
      const { content, itemType } = JSON.parse(jsonData);
      
      // Add to the appropriate list
      if (itemType === 'ingredient') {
        setSelectedIngredients(prev => [...prev, content]);
      } else if (itemType === 'incantation') {
        setSelectedIncantations(prev => [...prev, content]);
      }
    } catch (error) {
      console.error('Error processing drop:', error);
    }
  };

  const handleCastSpell = () => {
    console.log('Casting spell with ingredients:', selectedIngredients);
    console.log('and incantations:', selectedIncantations);
    // Reset selections after casting
    setSelectedIngredients([]);
    setSelectedIncantations([]);
  };

  // Count occurrences of ingredients and incantations in the cauldron
  const countIngredients = selectedIngredients.reduce<Record<string, number>>(
    (acc, ingredient) => {
      acc[ingredient] = (acc[ingredient] || 0) + 1;
      return acc;
    },
    {}
  );

  const countIncantations = selectedIncantations.reduce<Record<string, number>>(
    (acc, incantation) => {
      acc[incantation] = (acc[incantation] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gray-900 text-purple-100 p-4">
      {/* Header section */}
      <header className="flex items-center justify-between mb-8 p-4 border-b border-purple-800">
        <div className="flex items-center">
          {/* Logo */}
          <img src={logo} alt="Astra Arcana Logo" className="w-16 h-16 mr-4 object-contain" />
          <div>
            <img src={textLogo} alt="ASTRA ARCANA" className="h-10 mb-1" />
            <p className="text-purple-300 italic ml-2">Cast anything, anywhere</p>
          </div>
        </div>
        {/* Founder profile picture */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
          <img 
            src={founderPic} 
            alt="Founder Astra" 
            className="w-full h-full object-cover" 
          />
        </div>
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
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <button
                  key={index}
                  draggable="true"
                  onClick={() => handleIngredientClick(ingredient)}
                  onDragStart={(e) => onDragStart(e, ingredient, 'ingredient')}
                  onDragEnd={onDragEnd}
                  className="bg-pink-200 text-gray-800 py-3 px-4 rounded-full text-lg font-semibold transition-all hover:bg-pink-300 active:scale-95 text-center cursor-grab active:cursor-grabbing"
                >
                  {ingredient}
                </button>
              ))
            ) : (
              <div className="text-red-300 p-4 text-center bg-gray-700 rounded-lg">
                {loading ? 'Loading ingredients...' : 'No ingredients available from API'}
              </div>
            )}
          </div>
        </div>

        {/* Incantations column */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-200 text-center">Incantations</h2>
          <div className="flex flex-col space-y-3">
            {incantations.length > 0 ? (
              incantations.map((incantation, index) => (
                <button
                  key={index}
                  draggable="true"
                  onClick={() => handleIncantationClick(incantation)}
                  onDragStart={(e) => onDragStart(e, incantation, 'incantation')}
                  onDragEnd={onDragEnd}
                  className="bg-pink-200 text-gray-800 py-3 px-4 rounded-full text-lg font-semibold transition-all hover:bg-pink-300 active:scale-95 text-center cursor-grab active:cursor-grabbing"
                >
                  {incantation}
                </button>
              ))
            ) : (
              <div className="text-red-300 p-4 text-center bg-gray-700 rounded-lg">
                {loading ? 'Loading incantations...' : 'No incantations available from API'}
              </div>
            )}
          </div>
        </div>

        {/* Cauldron area */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-purple-200 text-center">Cauldron</h2>
          
          {/* Empty cauldron area with dashed border */}
          <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`flex-grow border-2 border-dashed ${isDraggedOver ? 'border-pink-400 bg-purple-900/30' : 'border-blue-500'} rounded-lg p-4 mb-4 min-h-40 transition-colors duration-200`}>
            {selectedIngredients.length > 0 || selectedIncantations.length > 0 ? (
              <div className="space-y-2">
                {Object.keys(countIngredients).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-purple-300">Ingredients:</h3>
                    <ul className="ml-2">
                      {Object.entries(countIngredients).map(([ingredient, count], index) => (
                        <li key={`ing-${index}`} className="text-pink-200">
                          {ingredient} {count > 1 && <span className="text-xs bg-purple-700 px-1.5 py-0.5 rounded-full ml-1">x{count}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {Object.keys(countIncantations).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-purple-300">Incantations:</h3>
                    <ul className="ml-2">
                      {Object.entries(countIncantations).map(([incantation, count], index) => (
                        <li key={`inc-${index}`} className="text-pink-200">
                          {incantation} {count > 1 && <span className="text-xs bg-purple-700 px-1.5 py-0.5 rounded-full ml-1">x{count}</span>}
                        </li>
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
