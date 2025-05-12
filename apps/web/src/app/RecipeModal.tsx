import { createPortal } from 'react-dom';
import { Recipe } from '@astra-arcana/spellcasting-types';
import { ToastOptions } from 'react-toastify';
import { useEffect, useRef } from 'react';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  loading: boolean;
  addRecipeToSpell: (recipe: Recipe) => void;
  toastOptions: ToastOptions;
}

export function RecipeModal({
  isOpen,
  onClose,
  recipes,
  loading,
  addRecipeToSpell,
  toastOptions,
}: RecipeModalProps) {
  if (!isOpen) return null;

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener when modal is open
    document.addEventListener('keydown', handleEscKey);
    
    // Clean up event listener when modal is closed
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Handle click outside to close the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-purple-700">
        <div className="flex justify-between items-center p-5 border-b border-purple-800 bg-gradient-to-r from-purple-900 to-gray-900">
          <h2 className="text-2xl font-bold text-white tracking-wide">Spell Recipes</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-xl hover:bg-purple-800 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          {loading ? (
            <div className="text-center py-10 flex items-center justify-center">
              <div className="animate-pulse text-purple-300 text-lg">
                <span className="animate-spin inline-block mr-2">✨</span> 
                Loading magical recipes...
              </div>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recipes.map((recipe, index) => (
                <RecipeCard 
                  key={`recipe-${index}`}
                  recipe={recipe}
                  onAddToSpell={() => addRecipeToSpell(recipe)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-red-300 text-lg">No magical recipes available</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

interface RecipeCardProps {
  recipe: Recipe;
  onAddToSpell: () => void;
}

function RecipeCard({ recipe, onAddToSpell }: RecipeCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-purple-800 hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="p-5 bg-gradient-to-r from-purple-800 to-purple-900">
        <h3 className="text-xl font-bold text-white mb-1">{recipe.name}</h3>
        <p className="text-purple-200 text-sm italic opacity-90">{recipe.origin}</p>
      </div>
      <div className="p-5 bg-gray-800 flex-grow">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
            <span className="mr-2 opacity-80">✦</span>Ingredients:
          </h4>
          <ul className="ml-5 space-y-2">
            {recipe.ingredients.map((ingredient, idx) => (
              <li key={`ing-${idx}`} className="text-pink-200 text-sm flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-400 mr-2 opacity-70"></span>
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
            <span className="mr-2 opacity-80">✦</span>Incantations:
          </h4>
          <ul className="ml-5 space-y-2">
            {recipe.incantations.map((incantation, idx) => (
              <li key={`inc-${idx}`} className="text-pink-200 text-sm flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-400 mr-2 opacity-70"></span>
                {incantation.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4 bg-gray-900 border-t border-purple-900 mt-auto">
        <button
          onClick={onAddToSpell}
          className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium transition-all hover:bg-pink-500 active:scale-95 flex items-center justify-center group"
        >
          <span className="mr-2 transform group-hover:rotate-12 transition-transform">🧪</span>
          Add to Cauldron
        </button>
      </div>
    </div>
  );
}
