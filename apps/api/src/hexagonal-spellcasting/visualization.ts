import {
  Ingredient,
  Incantation,
  ElementInteraction,
  SpellVisualizationData,
} from '@astra-arcana/spellcasting-types';
import { HexElement } from './types';
import {
  processIngredient,
  processIncantation,
  calculateElementalRelationship,
  ELEMENTS,
} from './core';

/**
 * Generates visualization data for the hexagonal spellcasting UI
 * Based on the same calculations as the spell casting but optimized for visualization needs
 */
export function generateVisualizationData(
  ingredients: Ingredient[],
  incantations: Incantation[]
): SpellVisualizationData {
  // Step 1: Process all ingredients
  const processedIngredients = ingredients.map(processIngredient);

  // Step 2: Process all incantations
  const processedIncantations = incantations.map(processIncantation);

  // Step 3: Calculate elemental balance
  const elementalBalance: Record<HexElement, number> = {
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
    aether: 0,
    void: 0,
  };

  // Add ingredient values to elemental balance
  processedIngredients.forEach((ingredient) => {
    elementalBalance[ingredient.elementId] += ingredient.processedValue;
  });

  // Add incantation values to elemental balance
  processedIncantations.forEach((incantation) => {
    if (incantation.elementId) {
      elementalBalance[incantation.elementId] += incantation.processedValue;
    }
  });

  // Step 4: Calculate interaction data for visualization
  const interactions: ElementInteraction[] = [];
  let interactionModifier = 0;

  // Check all element pairs for interactions
  const elementIds = Object.keys(elementalBalance) as HexElement[];

  for (let i = 0; i < elementIds.length; i++) {
    for (let j = i + 1; j < elementIds.length; j++) {
      // Only consider elements that are actually present in the spell
      if (
        elementalBalance[elementIds[i]] > 0 &&
        elementalBalance[elementIds[j]] > 0
      ) {
        const element1 = elementIds[i];
        const element2 = elementIds[j];
        const relationshipValue = calculateElementalRelationship(
          element1,
          element2
        );

        // Weighted by the amount of each element present
        const interactionStrength =
          (elementalBalance[element1] + elementalBalance[element2]) / 2;

        interactionModifier += relationshipValue * interactionStrength;

        // Determine relationship type
        let relationshipType: 'opposite' | 'neighbor' | 'neutral' = 'neutral';

        if (ELEMENTS[element1.toUpperCase()]?.oppositeId === element2) {
          relationshipType = 'opposite';
        } else if (
          ELEMENTS[element1.toUpperCase()]?.neighbors.includes(element2)
        ) {
          relationshipType = 'neighbor';
        }

        // Add to interactions for visualization
        interactions.push({
          element1,
          element2,
          relationshipType,
          modifier: relationshipValue,
          strength: interactionStrength,
        });
      }
    }
  }

  // Step 5: Calculate spell base properties
  let totalPower = 0;
  let totalDuration = 0;
  let totalComplexity = 0;

  // Sum up incantation properties
  processedIncantations.forEach((incantation) => {
    totalPower += incantation.power * incantation.processedValue;
    totalDuration += incantation.duration * incantation.processedValue;
    totalComplexity += incantation.complexity;
  });

  // Apply ingredient count to complexity
  totalComplexity *= 1 + processedIngredients.length * 0.1;

  // Step 6: Find dominant element
  let dominantElement: HexElement | undefined = undefined;
  let maxElementValue = -Infinity;

  // Find the element with the highest value
  Object.entries(elementalBalance).forEach(([element, value]) => {
    if (element !== 'neutral' && value > maxElementValue && value > 0) {
      dominantElement = element as HexElement;
      maxElementValue = value;
    }
  });

  // Step 7: Calculate final spell metrics
  const power = Math.max(0, totalPower * (1 + interactionModifier));

  // Duration affected by ingredient count and interaction modifier
  const duration = Math.max(
    0.5,
    totalDuration *
      (1 + interactionModifier * 0.5) *
      (1 + processedIngredients.length * 0.2)
  );

  // Success rate based on complexity and interactions
  const successRate = Math.min(
    100,
    Math.max(5, 100 - totalComplexity * 5 + interactionModifier * 20)
  );

  // Return the visualization data
  return {
    elementalBalance,
    interactions,
    interactionModifier,
    successRate,
    power,
    duration,
    complexity: totalComplexity,
    dominantElement,
  };
}
