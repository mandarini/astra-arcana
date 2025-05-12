import {
  Recipe,
} from '@astra-arcana/spellcasting-types';
import { defaultIngredients, defaultIncantations } from './default-data';

// Collection of recipes from various magical traditions
export const defaultRecipes: Recipe[] = [
  {
    name: 'Digital Detox Ritual',
    origin: 'Modern Grimoire for the Digital Age',
    ingredients: [
      defaultIngredients.find(i => i.name === 'Lab-grown phoenix feather')!,
      defaultIngredients.find(i => i.name === 'Cloud-harvested rainwater')!,
      defaultIngredients.find(i => i.name === 'Biodegradable glitter')!,
    ],
    incantations: [
      defaultIncantations.find(i => i.name === 'Digital Detoxify')!,
      defaultIncantations.find(i => i.name === 'Aura Cleanse 2.0')!,
    ],
  },
  {
    name: 'Protection Spell',
    origin: 'Hogwarts Curriculum, Year 3',
    ingredients: [
      defaultIngredients.find(i => i.name === 'Ethically sourced dragon scales')!,
      defaultIngredients.find(i => i.name === 'Solar-charged crystal')!,
    ],
    incantations: [
      defaultIncantations.find(i => i.name === 'Protego Maxima')!,
    ],
  },
  {
    name: 'Manifestation Boost',
    origin: 'Bruja TikTok Collective, 2024',
    ingredients: [
      defaultIngredients.find(i => i.name === 'Himalayan pink salt')!,
      defaultIngredients.find(i => i.name === 'CBD oil')!,
      defaultIngredients.find(i => i.name === 'Oat milk')!,
    ],
    incantations: [
      defaultIncantations.find(i => i.name === 'Manifestación Ahora')!,
      defaultIncantations.find(i => i.name === 'Vibrational Alignment')!,
    ],
  },
  {
    name: 'Levitation Charm',
    origin: 'Classical Spellbook of Elementary Witchcraft',
    ingredients: [
      defaultIngredients.find(i => i.name === '3D-printed unicorn horn')!,
      defaultIngredients.find(i => i.name === 'Smart home dust')!,
    ],
    incantations: [
      defaultIncantations.find(i => i.name === 'Wingardium Leviosa')!,
    ],
  },
  {
    name: 'Tech Sustainability Enchantment',
    origin: 'EcoWitch Compendium, Vol. 3',
    ingredients: [
      defaultIngredients.find(i => i.name === 'Pulverized Microchips')!,
      defaultIngredients.find(i => i.name === 'Organic mandrake root')!,
      defaultIngredients.find(i => i.name === 'Cold brew coffee grounds')!,
    ],
    incantations: [
      defaultIncantations.find(i => i.name === 'Wyrd Recycling')!,
      defaultIncantations.find(i => i.name === 'Bío-Hacking Harmonia')!,
    ],
  },
];
