export type Ingredient = {
  name: string;
  affinity: Element;
  age?: Age;
};

export type Age = 'ancient' | 'old' | 'fresh';

export type Incantation = {
  name: string;
  language: Language;
  affinity?: Element;
  kind: 'ritual' | 'spell' | 'support' | 'sacrifice' | 'other';
  moonphase?: MoonPhase;
};

export type Recipe = {
  name: string;
  origin: string;
  ingredients: Ingredient[];
  incantations: Incantation[];
};

export type Language =
  | 'English'
  | 'Spanish'
  | 'Latin'
  | 'Old English'
  | 'Old Norse'
  | 'Sanskrit'
  | 'Other';
export type Element = 'fire' | 'water' | 'earth' | 'air' | 'aether' | 'void' | 'neutral';
export type MoonPhase = 'new' | 'waxing' | 'full' | 'waning';

// Types for hexagonal spellcasting visualization
export type ElementInteraction = {
  element1: Element;
  element2: Element;
  relationshipType: 'opposite' | 'neighbor' | 'neutral';
  modifier: number;
  strength: number;
};

export type SpellVisualizationData = {
  elementalBalance: Record<Element, number>;
  interactions: ElementInteraction[];
  interactionModifier: number;
  successRate: number;
  power: number;
  duration: number;
  complexity: number;
  dominantElement: Element;
};
