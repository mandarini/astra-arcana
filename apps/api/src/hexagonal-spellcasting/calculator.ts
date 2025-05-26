import { Ingredient, Incantation } from '@astra-arcana/spellcasting-types';
import {
  CompleteSpellResult,
  ElementEffect,
  HexElement,
  SpellResult
} from './types';
import { 
  processIngredient, 
  processIncantation, 
  calculateElementalRelationship 
} from './core';
import { determineSpellEffects } from './effects';

/**
 * Primary function to calculate spell result
 */
export function calculateSpellResult(ingredients: Ingredient[], incantations: Incantation[]): SpellResult {
  // Step 1: Process all ingredients
  const processedIngredients = ingredients.map(processIngredient);
  
  // Step 2: Process all incantations
  const processedIncantations = incantations.map(processIncantation);
  
  // Step 3: Calculate elemental balance
  const elementalValues: Record<HexElement | 'neutral', number> = {
    fire: 0, water: 0, earth: 0, air: 0, aether: 0, void: 0, neutral: 0
  };
  
  // Add ingredient values to elemental balance
  processedIngredients.forEach(ingredient => {
    if (elementalValues.hasOwnProperty(ingredient.elementId)) {
      elementalValues[ingredient.elementId] += ingredient.processedValue;
    }
  });
  
  // Add incantation values to elemental balance
  processedIncantations.forEach(incantation => {
    if (elementalValues.hasOwnProperty(incantation.elementId)) {
      elementalValues[incantation.elementId] += incantation.processedValue;
    }
  });
  
  // Step 4: Calculate interaction modifiers
  let interactionModifier = 0;
  
  // Check all element pairs for interactions
  const elementIds = Object.keys(elementalValues).filter(id => id !== 'neutral') as HexElement[];
  
  for (let i = 0; i < elementIds.length; i++) {
    for (let j = i + 1; j < elementIds.length; j++) {
      // Only consider elements that are actually present in the spell
      if (elementalValues[elementIds[i]] > 0 && elementalValues[elementIds[j]] > 0) {
        const relationshipValue = calculateElementalRelationship(elementIds[i], elementIds[j]);
        
        // Weighted by the amount of each element present
        const interactionWeight = 
          (elementalValues[elementIds[i]] + elementalValues[elementIds[j]]) / 2;
          
        interactionModifier += relationshipValue * interactionWeight;
      }
    }
  }
  
  // Step 5: Calculate spell base properties
  let totalPower = 0;
  let totalDuration = 0;
  let totalComplexity = 0;
  
  // Sum up incantation properties
  processedIncantations.forEach(incantation => {
    totalPower += incantation.power * incantation.processedValue;
    totalDuration += incantation.duration * incantation.processedValue;
    totalComplexity += incantation.complexity;
  });
  
  // Apply ingredient count to complexity
  totalComplexity *= (1 + (processedIngredients.length * 0.1));
  
  // Step 6: Find dominant element
  let dominantElement: HexElement = 'neutral';
  let maxElementValue = -Infinity;
  
  // Find the element with the highest value
  Object.entries(elementalValues).forEach(([element, value]) => {
    if (element !== 'neutral' && value > maxElementValue) {
      dominantElement = element as HexElement;
      maxElementValue = value;
    }
  });
  
  // Step 7: Calculate final spell metrics
  const spellPower = Math.max(0, totalPower * (1 + interactionModifier));
  
  // Duration affected by ingredient count and interaction modifier
  const spellDuration = Math.max(0.5, totalDuration * 
    (1 + (interactionModifier * 0.5)) * 
    (1 + (processedIngredients.length * 0.2)));
    
  // Success rate based on complexity and interactions
  const successRate = Math.min(100, Math.max(5,
    100 - (totalComplexity * 5) + (interactionModifier * 20)));
  
  // Step 8: Return comprehensive spell result
  return {
    success: Math.random() * 100 <= successRate, // Random success check
    successRate: successRate,
    power: spellPower,
    duration: spellDuration,
    dominantElement,
    elementalBalance: elementalValues,
    interactionModifier: interactionModifier,
    ingredients: processedIngredients.map(i => i.name),
    incantations: processedIncantations.map(i => i.name)
  };
}

/**
 * Generates a human-readable description of the spell result
 */
function generateSpellDescription(spellResult: SpellResult, effectsResult: ReturnType<typeof determineSpellEffects>): string {
  if (!spellResult.success) {
    return "The spell fizzles and fails to manifest any effects.";
  }
  
  // Start with base description
  let description = `A ${effectsResult.successDescription} spell that `;
  
  // Add primary effect descriptions
  if (effectsResult.primaryEffects.length > 0) {
    const effectDescriptions = effectsResult.primaryEffects.map(effect => {
      return `creates a ${effect.strength} ${effect.effect} effect`;
    });
    
    if (effectDescriptions.length === 1) {
      description += effectDescriptions[0];
    } else if (effectDescriptions.length === 2) {
      description += `${effectDescriptions[0]} and ${effectDescriptions[1]}`;
    } else {
      const lastEffect = effectDescriptions.pop();
      description += `${effectDescriptions.join(', ')}, and ${lastEffect}`;
    }
  } else {
    description += "produces minimal magical effects";
  }
  
  // Add duration
  description += `, lasting for a ${effectsResult.durationDescription} period`;
  
  // Add special effect if present
  if (effectsResult.specialEffect) {
    description += `. Additionally, it triggers "${effectsResult.specialEffect.name}" - ${effectsResult.specialEffect.description}`;
  } else {
    description += ".";
  }
  
  return description;
}

/**
 * Main function that calculates a complete spell result
 */
export function calculateCompleteSpellResult(ingredients: Ingredient[], incantations: Incantation[]): CompleteSpellResult {
  // Get base calculations
  const spellResult = calculateSpellResult(ingredients, incantations);
  
  // Get nuanced effects
  const effectsResult = determineSpellEffects(spellResult);
  
  // Generate spell description
  const spellDescription = generateSpellDescription(spellResult, effectsResult);
  
  // Combine results
  return {
    ...spellResult,
    effects: effectsResult.primaryEffects,
    specialEffect: effectsResult.specialEffect,
    effectStrength: effectsResult.effectStrength,
    durationDescription: effectsResult.durationDescription,
    successDescription: effectsResult.successDescription,
    spellDescription
  };
}
