import React, { useEffect, useState } from 'react';
import {
  Ingredient,
  Incantation,
  SpellVisualizationData,
  Element,
  ELEMENT_COLORS,
} from '@astra-arcana/spellcasting-types';
import { SpellcastingSDK } from '@astra-arcana/spellcasting-sdk';
import { ElementalHexagon } from './ElementalHexagon';

interface CauldronVisualizationProps {
  selectedIngredients: Ingredient[];
  selectedIncantations: Incantation[];
  sdk: SpellcastingSDK;
  onClear: () => void;
  isDraggedOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

type ViewMode = 'list' | 'visualization';

export const CauldronVisualization: React.FC<CauldronVisualizationProps> = ({
  selectedIngredients,
  selectedIncantations,
  sdk,
  onClear,
  isDraggedOver,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [visualizationData, setVisualizationData] =
    useState<SpellVisualizationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch visualization data when ingredients/incantations change
  useEffect(() => {
    if (selectedIngredients.length > 0 || selectedIncantations.length > 0) {
      fetchVisualizationData();
    } else {
      setVisualizationData(null);
      setError(null);
    }
  }, [selectedIngredients, selectedIncantations]);

  const fetchVisualizationData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await sdk.visualizeSpell(
        selectedIngredients,
        selectedIncantations
      );
      setVisualizationData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to visualize spell'
      );
      console.error('Error fetching visualization data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Count occurrences of ingredients and incantations
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

  const getElementalBreakdown = () => {
    if (!visualizationData) return [];

    return Object.entries(visualizationData.elementalBalance)
      .filter(([element, value]) => element !== 'neutral' && value > 0)
      .sort(([, a], [, b]) => b - a)
      .map(([element, value]) => ({
        element: element as Element,
        value,
        percentage:
          (value /
            Math.max(
              Object.values(visualizationData.elementalBalance).reduce(
                (a, b) => a + b,
                0
              ),
              1
            )) *
          100,
      }));
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-400';
    if (rate >= 60) return 'text-yellow-400';
    if (rate >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const hasItems =
    selectedIngredients.length > 0 || selectedIncantations.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Toggle Button Group */}
      <div className="mb-4">
        <div className="flex rounded-lg bg-gray-700 p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
          >
            📋 List
          </button>
          <button
            onClick={() => setViewMode('visualization')}
            disabled={!hasItems}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'visualization' && hasItems
                ? 'bg-purple-600 text-white shadow-sm'
                : hasItems
                ? 'text-gray-300 hover:text-white hover:bg-gray-600'
                : 'text-gray-500 cursor-not-allowed'
            }`}
          >
            🔮 Visualize
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'list' ? (
          /* List View */
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`h-full border-2 border-dashed ${
              isDraggedOver
                ? 'border-pink-400 bg-purple-900/30'
                : 'border-blue-500'
            } rounded-lg p-4 transition-colors duration-200 relative overflow-y-auto`}
          >
            {/* Clear button */}
            {hasItems && (
              <button
                onClick={onClear}
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

            {hasItems ? (
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
        ) : (
          /* Visualization View */
          <div className="h-full flex flex-col space-y-4">
            {loading && (
              <div className="flex-1 flex justify-center items-center">
                <div className="text-purple-300">Analyzing spell...</div>
              </div>
            )}

            {error && (
              <div className="bg-red-900 border border-red-600 text-red-100 p-3 rounded-lg text-sm">
                <p className="font-semibold">Visualization Error</p>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && visualizationData && (
              <>
                {/* Hexagon */}
                <div className="bg-gray-900 rounded-lg p-3 flex-1 min-h-0">
                  <ElementalHexagon
                    visualizationData={visualizationData}
                    className="h-full"
                  />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Spell Stats */}
                  <div className="bg-gray-900 rounded-lg p-3">
                    <h4 className="font-semibold text-purple-200 mb-2">
                      Spell Metrics
                    </h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-purple-300">Success:</span>
                        <span
                          className={`font-bold ${getSuccessRateColor(
                            visualizationData.successRate
                          )}`}
                        >
                          {visualizationData.successRate.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Power:</span>
                        <span className="text-pink-200 font-bold">
                          {visualizationData.power.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Duration:</span>
                        <span className="text-blue-200 font-bold">
                          {visualizationData.duration.toFixed(1)}
                        </span>
                      </div>
                      {visualizationData.dominantElement &&
                        visualizationData.dominantElement !== 'neutral' && (
                          <div className="flex justify-between">
                            <span className="text-purple-300">Dominant:</span>
                            <span
                              className="font-bold capitalize"
                              style={{
                                color:
                                  ELEMENT_COLORS[
                                    visualizationData.dominantElement
                                  ].primary,
                              }}
                            >
                              {visualizationData.dominantElement}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Elemental Balance */}
                  <div className="bg-gray-900 rounded-lg p-3">
                    <h4 className="font-semibold text-purple-200 mb-2">
                      Elements
                    </h4>
                    <div className="space-y-1">
                      {getElementalBreakdown()
                        .slice(0, 4)
                        .map(({ element, value, percentage }) => (
                          <div
                            key={element}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-1">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    ELEMENT_COLORS[element].primary,
                                }}
                              />
                              <span className="text-purple-300 capitalize text-xs">
                                {element}
                              </span>
                            </div>
                            <span className="text-purple-200 text-xs font-bold">
                              {value.toFixed(1)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
