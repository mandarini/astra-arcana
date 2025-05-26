import { Ingredient, Incantation, Age, Language, MoonPhase } from '@astra-arcana/spellcasting-types';

// Extended element type to include our hexagonal system
export type HexElement = 'fire' | 'water' | 'earth' | 'air' | 'aether' | 'void' | 'neutral';

// Element relationship structure
export interface ElementRelationship {
  id: HexElement;
  baseValue: number;
  oppositeId: HexElement;
  neighbors: HexElement[];
}

// Special effect structure
export interface SpecialEffect {
  name: string;
  description: string;
  elements?: string;
  element?: HexElement;
}

// Element effect
export interface ElementEffect {
  element: HexElement;
  effect: string;
  strength: 'strong' | 'moderate' | 'subtle';
  proportion: number;
}

// Processed ingredient
export interface ProcessedIngredient {
  elementId: HexElement;
  processedValue: number;
  name: string;
}

// Processed incantation
export interface ProcessedIncantation {
  elementId: HexElement;
  spellTypeId: string;
  languageId: string;
  moonPhase?: MoonPhase;
  processedValue: number;
  power: number;
  duration: number;
  complexity: number;
  name: string;
}

// Basic spell result structure
export interface SpellResult {
  success: boolean;
  successRate: number;
  power: number;
  duration: number;
  dominantElement: HexElement;
  elementalBalance: Record<HexElement | 'neutral', number>;
  interactionModifier: number;
  ingredients: string[];
  incantations: string[];
}

// Complete spell result with effects
export interface CompleteSpellResult extends SpellResult {
  effects: ElementEffect[];
  specialEffect: SpecialEffect | null;
  effectStrength: number;
  durationDescription: string;
  successDescription: string;
  spellDescription: string;
}
