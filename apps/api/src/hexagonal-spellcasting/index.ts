import { Ingredient, Incantation } from '@astra-arcana/spellcasting-types';
import { CompleteSpellResult, SpellResult } from './types';
import { calculateSpellResult } from './calculator';
import { determineSpellEffects } from './effects';

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
