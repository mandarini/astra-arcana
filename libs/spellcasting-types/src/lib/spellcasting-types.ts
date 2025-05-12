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
export type Element = 'fire' | 'water' | 'earth' | 'air';
export type MoonPhase = 'new' | 'waxing' | 'full' | 'waning';
