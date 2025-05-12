import {
  Ingredient,
  Incantation,
  Element,
  Language,
} from '@astra-arcana/spellcasting-types';

// Modern and traditional ingredients for the hip witch of 2025
export const defaultIngredients: Ingredient[] = [
  // Traditional ingredients with a modern twist
  {
    name: 'Ethically sourced dragon scales',
    affinity: 'fire' as Element,
    age: 'ancient',
  },
  {
    name: 'Lab-grown phoenix feather',
    affinity: 'fire' as Element,
    age: 'fresh',
  },
  {
    name: 'Organic mandrake root',
    affinity: 'earth' as Element,
    age: 'fresh',
  },
  {
    name: '3D-printed unicorn horn',
    affinity: 'water' as Element,
  },
  {
    name: 'Synthesized mermaid tears',
    affinity: 'water' as Element,
    age: 'fresh',
  },

  // Modern ingredients
  {
    name: 'Cold brew coffee grounds',
    affinity: 'earth' as Element,
    age: 'fresh',
  },
  {
    name: 'Himalayan pink salt',
    affinity: 'earth' as Element,
    age: 'ancient',
  },
  {
    name: 'Pulverized Microchips',
    affinity: 'earth' as Element,
    age: 'fresh',
  },
  {
    name: 'Solar-charged crystal',
    affinity: 'fire' as Element,
    age: 'old',
  },
  {
    name: 'Oat milk',
    affinity: 'water' as Element,
    age: 'fresh',
  },
  {
    name: 'Biodegradable glitter',
    affinity: 'air' as Element,
    age: 'fresh',
  },
  {
    name: 'CBD oil',
    affinity: 'water' as Element,
    age: 'fresh',
  },
  {
    name: 'Smart home dust',
    affinity: 'air' as Element,
    age: 'fresh',
  },
  {
    name: 'Cloud-harvested rainwater',
    affinity: 'water' as Element,
    age: 'fresh',
  },
  {
    name: 'Charcoal from vintage vinyl',
    affinity: 'fire' as Element,
    age: 'old',
  },
];

// A mix of traditional and contemporary incantations
export const defaultIncantations: Incantation[] = [
  {
    name: 'Lumos Maxima',
    language: 'Latin' as Language,
    affinity: 'fire' as Element,
  },
  {
    name: 'Digital Detoxify',
    language: 'English' as Language,
    affinity: 'water' as Element,
  },
  {
    name: 'Wingardium Leviosa',
    language: 'Latin' as Language,
    affinity: 'air' as Element,
  },
  {
    name: 'Vibrational Alignment',
    language: 'English' as Language,
  },
  {
    name: 'Aura Cleanse 2.0',
    language: 'English' as Language,
    affinity: 'water' as Element,
  },
  {
    name: 'Subscribe To My Channel',
    language: 'English' as Language,
    affinity: 'air' as Element,
  },
  {
    name: 'Banish Algorithm',
    language: 'English' as Language,
  },
  {
    name: 'Protego Maxima',
    language: 'Latin' as Language,
    affinity: 'earth' as Element,
  },
  {
    name: 'Manifestación Ahora',
    language: 'Spanish' as Language,
  },
  {
    name: 'Wyrd Recycling',
    language: 'Old English' as Language,
    affinity: 'earth' as Element,
  },
  {
    name: 'Bío-Hacking Harmonia',
    language: 'Latin' as Language,
  },
  {
    name: 'Unmute Energy',
    language: 'English' as Language,
    affinity: 'air' as Element,
  },
];
