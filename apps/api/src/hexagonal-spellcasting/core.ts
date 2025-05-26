import { Ingredient, Incantation } from '@astra-arcana/spellcasting-types';
import {
  HexElement,
  ProcessedIncantation,
  ProcessedIngredient
} from './types';

// Core element definitions for the hexagonal system
export const ELEMENTS: Record<string, { id: HexElement, baseValue: number, oppositeId: HexElement, neighbors: HexElement[] }> = {
  FIRE: {
    id: "fire",
    baseValue: 5,
    oppositeId: "water",
    neighbors: ["air", "earth"]
  },
  WATER: {
    id: "water",
    baseValue: 5,
    oppositeId: "fire", 
    neighbors: ["earth", "aether"]
  },
  EARTH: {
    id: "earth",
    baseValue: 5,
    oppositeId: "air",
    neighbors: ["fire", "water"]
  },
  AIR: {
    id: "air",
    baseValue: 5,
    oppositeId: "earth",
    neighbors: ["fire", "void"]
  },
  AETHER: {
    id: "aether", 
    baseValue: 5,
    oppositeId: "void",
    neighbors: ["water", "void"]
  },
  VOID: {
    id: "void",
    baseValue: 5,
    oppositeId: "aether",
    neighbors: ["air", "aether"]
  },
  NEUTRAL: {
    id: "neutral",
    baseValue: 3,
    oppositeId: "neutral",
    neighbors: []
  }
};

// Age value modifiers
export const AGE_MODIFIERS: Record<string, number> = {
  "fresh": 1,
  "old": 1.5,
  "ancient": 2
};

// Moon phase modifiers
export const MOON_PHASE_MODIFIERS: Record<string, number> = {
  "new": 1,
  "waxing": 1.2,
  "full": 1.5,
  "waning": 0.8
};

// Spell type characteristics
export const SPELL_TYPES: Record<string, { power: number; duration: number; complexity: number }> = {
  "spell": {
    power: 2,
    duration: 1,
    complexity: 1
  },
  "ritual": {
    power: 1,
    duration: 2,
    complexity: 2
  },
  "support": {
    power: 0.5,
    duration: 1.5,
    complexity: 1.5
  },
  "sacrifice": {
    power: 3,
    duration: 1,
    complexity: 3
  },
  "other": {
    power: 1,
    duration: 1,
    complexity: 1
  }
};

// Language modifiers
export const LANGUAGE_MODIFIERS: Record<string, number> = {
  "Latin": 1.3,
  "English": 1,
  "Spanish": 1.1,
  "Old English": 1.2,
  "Old Norse": 1.3,
  "Sanskrit": 1.4,
  "Other": 0.9
};

/**
 * Calculates relationship modifier between two elements
 */
export function calculateElementalRelationship(element1Id: HexElement, element2Id: HexElement): number {
  const element1 = ELEMENTS[element1Id.toUpperCase()];
  const element2 = ELEMENTS[element2Id.toUpperCase()];
  
  if (!element1 || !element2) return 0;
  
  // Opposing elements - negative interaction
  if (element1.oppositeId === element2.id) {
    return -0.5;
  }
  
  // Neighboring elements - positive interaction
  if (element1.neighbors.includes(element2.id)) {
    return 0.25;
  }
  
  // No direct relationship
  return 0;
}

/**
 * Processes an ingredient to calculate its magical value
 */
export function processIngredient(ingredient: Ingredient): ProcessedIngredient {
  // Convert traditional element to hex element (including aether/void if present)
  const elementId = ingredient.affinity as HexElement;
  
  // Get base element value
  const elementValue = ELEMENTS[elementId.toUpperCase()]?.baseValue || 
                       ELEMENTS.NEUTRAL.baseValue;
  
  // Apply age modifier if available
  const ageModifier = ingredient.age ? AGE_MODIFIERS[ingredient.age] || 1 : 1;
  
  return {
    elementId,
    processedValue: elementValue * ageModifier,
    name: ingredient.name
  };
}

/**
 * Processes an incantation to calculate its magical properties
 */
export function processIncantation(incantation: Incantation): ProcessedIncantation {
  // Convert traditional element to hex element (including aether/void if present)
  const elementId = (incantation.affinity as HexElement) || "neutral";
  
  // Get base element value if affinity exists
  const elementValue = elementId !== "neutral"
    ? ELEMENTS[elementId.toUpperCase()]?.baseValue || ELEMENTS.NEUTRAL.baseValue
    : ELEMENTS.NEUTRAL.baseValue;
  
  // Apply language modifier
  const languageModifier = LANGUAGE_MODIFIERS[incantation.language] || 1;
  
  // Apply spell type modifier
  const spellTypeModifiers = SPELL_TYPES[incantation.kind] || SPELL_TYPES.spell;
  
  // Apply moon phase modifier if present
  const moonModifier = incantation.moonphase 
    ? MOON_PHASE_MODIFIERS[incantation.moonphase] || 1 
    : 1;
  
  return {
    elementId,
    spellTypeId: incantation.kind,
    languageId: incantation.language,
    moonPhase: incantation.moonphase,
    processedValue: elementValue * languageModifier * moonModifier,
    power: spellTypeModifiers.power,
    duration: spellTypeModifiers.duration,
    complexity: spellTypeModifiers.complexity,
    name: incantation.name
  };
}
