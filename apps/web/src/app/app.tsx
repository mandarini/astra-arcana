import { useEffect, useState } from 'react';
import {
  Ingredient,
  Incantation,
  Recipe,
} from '@astra-arcana/spellcasting-types';
import { RecipeModal } from './RecipeModal';
import { LogsModal } from './LogsModal';
import { SpellcastingSDK, SpellCastLog } from '@astra-arcana/typescript-sdk';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import textLogo from '../assets/astra-arcana-text.png';
import logo from '../assets/astra-arcana-logo.png';
import founderPic from '../assets/founder-astra.png';

// Define types for our drag items
type ItemType = 'ingredient' | 'incantation';

export function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [incantations, setIncantations] = useState<Incantation[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [spellLogs, setSpellLogs] = useState<SpellCastLog[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [selectedIncantations, setSelectedIncantations] = useState<
    Incantation[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [showRecipesModal, setShowRecipesModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);

  // Initialize the SDK with the API URL from environment variable
  const sdk = new SpellcastingSDK(
    import.meta.env.VITE_API_URL || 'http://localhost:18787'
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Use the SDK to fetch ingredients, incantations, and recipes
        const [ingredientsData, incantationsData, recipesData] =
          await Promise.all([
            sdk.getIngredients(),
            sdk.getIncantations(),
            sdk.getRecipes(),
          ]);

        setIngredients(ingredientsData);
        setIncantations(incantationsData);
        setRecipes(recipesData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to fetch spell logs
  const fetchSpellLogs = async () => {
    try {
      setLogsLoading(true);
      const logs = await sdk.getSpellLogs();
      setSpellLogs(logs);
    } catch (err) {
      console.error('Error fetching spell logs:', err);
      toast.error(
        err instanceof Error ? err.message : 'Failed to fetch spell logs',
        toastOptions
      );
    } finally {
      setLogsLoading(false);
    }
  };

  // Fetch logs when the logs modal is opened
  useEffect(() => {
    if (showLogsModal) {
      fetchSpellLogs();
    }
  }, [showLogsModal]);

  const handleIngredientClick = (ingredient: Ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleIncantationClick = (incantation: Incantation) => {
    setSelectedIncantations([...selectedIncantations, incantation]);
  };

  // Simplified drag and drop handlers
  const onDragStart = (
    e: React.DragEvent,
    content: Ingredient | Incantation,
    itemType: ItemType
  ) => {
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
        setSelectedIngredients((prev) => [...prev, content as Ingredient]);
      } else if (itemType === 'incantation') {
        setSelectedIncantations((prev) => [...prev, content as Incantation]);
      }
    } catch (error) {
      console.error('Error processing drop:', error);
    }
  };

  // Function to clear the cauldron
  const clearCauldron = () => {
    setSelectedIngredients([]);
    setSelectedIncantations([]);
    toast.info('Cauldron cleared', toastOptions);
  };

  // Configure toast options
  const toastOptions = {
    position: 'bottom-left' as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark' as const,
    style: { background: '#1e1e2e' },
  };

  const handleCastSpell = async () => {
    if (selectedIngredients.length === 0 && selectedIncantations.length === 0) {
      return;
    }

    try {
      // Call the SDK to cast the spell
      await sdk.castSpell(selectedIngredients, selectedIncantations);

      // Celebrate with a success notification
      toast.success(
        <div className="text-center">
          <p className="text-lg font-bold mb-1">
            ✨ Spell Cast Successfully! ✨
          </p>
          <p>
            Combined {selectedIngredients.length} ingredients and{' '}
            {selectedIncantations.length} incantations
          </p>
        </div>,
        {
          ...toastOptions,
          icon: () => (
            <div className="bg-purple-700 rounded-full p-2 text-2xl">🔮</div>
          ),
          progressClassName: 'bg-pink-500',
        }
      );
    } catch (error) {
      // Show error notification
      toast.error(
        <div className="text-center">
          <p className="text-lg font-bold mb-1">❌ Spell Failed! ❌</p>
          <p>
            {error instanceof Error
              ? error.message
              : 'An unexpected error occurred'}
          </p>
        </div>,
        {
          ...toastOptions,
          icon: () => (
            <div className="bg-red-700 rounded-full p-2 text-2xl">💥</div>
          ),
          progressClassName: 'bg-red-500',
        }
      );
      console.error('Error casting spell:', error);
      return;
    }

    // Refresh spell logs if the logs modal is open
    if (showLogsModal) {
      fetchSpellLogs();
    }

    // Reset selections after casting
    setSelectedIngredients([]);
    setSelectedIncantations([]);
  };

  // Count occurrences of ingredients and incantations in the cauldron
  const countIngredients = selectedIngredients.reduce<
    Record<string, { count: number; item: Ingredient }>
  >((acc, ingredient) => {
    const key = ingredient.name;
    if (!acc[key]) {
      acc[key] = { count: 1, item: ingredient };
    } else {
      acc[key].count += 1;
    }
    return acc;
  }, {});

  const countIncantations = selectedIncantations.reduce<
    Record<string, { count: number; item: Incantation }>
  >((acc, incantation) => {
    const key = incantation.name;
    if (!acc[key]) {
      acc[key] = { count: 1, item: incantation };
    } else {
      acc[key].count += 1;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-purple-100 p-4 relative">
      {/* Toast container with theme configuration */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <header className="flex items-center justify-between mb-8 p-4 border-b border-purple-800 h-[100px]">
        <div className="flex items-center">
        <img
            src={logo}
            alt="Astra Arcana Logo"
            className="w-16 h-16 mr-4 object-contain"
          />

          <div>
            <img src={textLogo} alt="ASTRA ARCANA" className="h-10 mb-1" />
            <p className="text-purple-300 italic ml-2">
              Cast anything, anywhere
            </p>
          </div>
        </div>
        <div className="flex items-center">

        <button
          onClick={() => setShowLogsModal(true)}
          className="mr-4 bg-purple-800 hover:bg-purple-700 text-pink-200 py-2 px-3 rounded-lg text-sm flex items-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          View Logs
        </button>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
          {/* Founder profile picture */}
          <img
            src={founderPic}
            alt="Founder Astra"
            className="w-full h-full object-cover"
          />
        </div>
        </div>
      </header>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-purple-300">
            Summoning magical elements...
          </p>
        </div>
      )}

      {error && (
        <div
          className="bg-red-900 border-l-4 border-red-600 text-red-100 p-4 mb-4"
          role="alert"
        >
          <p>{error}</p>
          <p className="mt-2">
            Make sure the API is running on{' '}
            {import.meta.env.VITE_API_URL || 'http://localhost:18787'}
          </p>
        </div>
      )}

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ingredients column */}
        <div className="bg-gray-800 rounded-lg shadow-md flex flex-col h-[calc(100vh-200px)]">
          <h2 className="text-2xl font-semibold py-4 px-4 text-purple-200 text-center sticky top-0 bg-gray-800 z-10">
            Ingredients
          </h2>
          <div className="flex flex-col space-y-3 overflow-y-auto flex-1 px-4 pb-4">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <button
                  key={index}
                  draggable="true"
                  onClick={() => handleIngredientClick(ingredient)}
                  onDragStart={(e) => onDragStart(e, ingredient, 'ingredient')}
                  onDragEnd={onDragEnd}
                  className="bg-green-200 text-gray-800 py-3 px-4 rounded-full text-lg font-semibold transition-all hover:bg-green-300 active:scale-95 text-center cursor-grab active:cursor-grabbing"
                >
                  {ingredient.name}
                </button>
              ))
            ) : (
              <div className="text-red-300 p-4 text-center bg-gray-700 rounded-lg">
                {loading
                  ? 'Loading ingredients...'
                  : 'No ingredients available from API'}
              </div>
            )}
          </div>
        </div>

        {/* Incantations column */}
        <div className="bg-gray-800 rounded-lg shadow-md flex flex-col h-[calc(100vh-200px)]">
          <h2 className="text-2xl font-semibold py-4 px-4 text-purple-200 text-center sticky top-0 bg-gray-800 z-10">
            Incantations
          </h2>
          <div className="flex flex-col space-y-3 overflow-y-auto flex-1 px-4 pb-4">
            {incantations.length > 0 ? (
              incantations.map((incantation, index) => (
                <button
                  key={index}
                  draggable="true"
                  onClick={() => handleIncantationClick(incantation)}
                  onDragStart={(e) =>
                    onDragStart(e, incantation, 'incantation')
                  }
                  onDragEnd={onDragEnd}
                  className="bg-pink-200 text-gray-800 py-3 px-4 rounded-full text-lg font-semibold transition-all hover:bg-pink-300 active:scale-95 text-center cursor-grab active:cursor-grabbing"
                >
                  {incantation.name}
                </button>
              ))
            ) : (
              <div className="text-red-300 p-4 text-center bg-gray-700 rounded-lg">
                {loading
                  ? 'Loading incantations...'
                  : 'No incantations available from API'}
              </div>
            )}
          </div>
        </div>

        {/* Cauldron area */}
        <div className="bg-gray-800 rounded-lg shadow-md flex flex-col h-[calc(100vh-200px)]">
          <h2 className="text-2xl font-semibold py-4 px-4 text-purple-200 text-center sticky top-0 bg-gray-800 z-10">
            Cauldron
          </h2>
          <div className="overflow-y-auto flex-1 px-4 pb-4 flex flex-col">
            {/* Recipe Button at top */}
            <button
              onClick={() => setShowRecipesModal(true)}
              className="bg-purple-600 text-white py-2 px-6 rounded-lg font-semibold transition-all hover:bg-purple-700 active:scale-95 flex items-center justify-center mb-4"
            >
              <span className="mr-2">📚</span> View Recipes
            </button>

            {/* Empty cauldron area with dashed border */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`flex-grow border-2 border-dashed ${
                isDraggedOver
                  ? 'border-pink-400 bg-purple-900/30'
                  : 'border-blue-500'
              } rounded-lg p-4 mb-4 min-h-40 transition-colors duration-200 relative`}
            >
              {/* Clear button (only visible when there are items) */}
              {(selectedIngredients.length > 0 ||
                selectedIncantations.length > 0) && (
                <button
                  onClick={clearCauldron}
                  className="absolute top-2 right-2 bg-purple-700 hover:bg-purple-800 text-pink-200 rounded-full p-1.5 shadow-lg transition-all hover:scale-105 active:scale-95 z-10"
                  title="Clear cauldron"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              {selectedIngredients.length > 0 ||
              selectedIncantations.length > 0 ? (
                <div className="space-y-2">
                  {Object.keys(countIngredients).length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-purple-300">
                        Ingredients:
                      </h3>
                      <ul className="ml-2">
                        {Object.entries(countIngredients).map(
                          ([name, { count, item }], index) => (
                            <li key={`ing-${index}`} className="text-pink-200">
                              {name}{' '}
                              {count > 1 && (
                                <span className="text-xs bg-purple-700 px-1.5 py-0.5 rounded-full ml-1">
                                  x{count}
                                </span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {Object.keys(countIncantations).length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-purple-300">
                        Incantations:
                      </h3>
                      <ul className="ml-2">
                        {Object.entries(countIncantations).map(
                          ([name, { count, item }], index) => (
                            <li key={`inc-${index}`} className="text-pink-200">
                              {name}{' '}
                              {count > 1 && (
                                <span className="text-xs bg-purple-700 px-1.5 py-0.5 rounded-full ml-1">
                                  x{count}
                                </span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  Drag or select items to prepare your spell
                </p>
              )}
            </div>
          </div>

          {/* Cast Spell button - full width at bottom */}
          <button
            onClick={handleCastSpell}
            disabled={
              selectedIngredients.length === 0 &&
              selectedIncantations.length === 0
            }
            className="bg-pink-500 text-white py-3 px-6 mb-4 mx-4 rounded-lg text-xl font-semibold transition-all hover:bg-pink-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span className="mr-2">✧</span> Cast Spell
          </button>
        </div>
      </div>

      {/* Recipe Modal Portal */}
      <RecipeModal
        isOpen={showRecipesModal}
        onClose={() => setShowRecipesModal(false)}
        recipes={recipes}
        loading={loading}
        addRecipeToSpell={(recipe) => {
          setSelectedIngredients([
            ...selectedIngredients,
            ...recipe.ingredients,
          ]);
          setSelectedIncantations([
            ...selectedIncantations,
            ...recipe.incantations,
          ]);
          setShowRecipesModal(false);
          toast.success(
            `Recipe "${recipe.name}" added to cauldron`,
            toastOptions
          );
        }}
        toastOptions={toastOptions}
      />

      {/* Logs Modal Portal */}
      <LogsModal
        isOpen={showLogsModal}
        onClose={() => setShowLogsModal(false)}
        logs={spellLogs}
        loading={logsLoading}
      />
      
      {/* Footer */}
      <footer className="w-full py-2 mt-4 border-t border-purple-800 text-center">
        <div className="container mx-auto px-4 text-xs text-purple-400">
          &copy; Astra Moonlace, 2025 | <a href="https://github.com/maxkless/astra-arcana" className="text-purple-500 hover:text-purple-300" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
