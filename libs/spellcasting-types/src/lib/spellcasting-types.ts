export type Ingredient = {
  name: string;
  affinity: Element;
  age?: Age;
}



export type Age = 'ancient' | 'old' | 'fresh'

export type Incantation = {
  name: string;
  language: Language;
  affinity?: Element;
}

export type Language = 'English' | 'Spanish' | 'Latin' | 'Old English' | 'Old Norse' | 'Sanskrit'
export type Element = 'fire' | 'water' | 'earth' | 'air'
