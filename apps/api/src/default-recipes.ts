import {
  Recipe,
  Ingredient,
  Incantation,
} from '@astra-arcana/spellcasting-types';
import { defaultIngredients, defaultIncantations } from './default-data';

// Recipe definition with string collections
interface RecipeDefinition {
  name: string;
  origin: string;
  ingredientNames: string[];
  incantationNames: string[];
}

// Raw recipe definitions using string names
const recipeDefinitions: RecipeDefinition[] = [
  {
    name: 'Digital Detox Sanctuary',
    origin: 'Modern Grimoire for the Digital Age',
    ingredientNames: [
      'Void-touched obsidian',
      'Cloud-harvested rainwater',
      'Meditation cushion stuffing',
    ],
    incantationNames: ['Digital Detoxify', 'Mindful Disconnect'],
  },
  {
    name: 'Elemental Shield of Protection',
    origin: 'Hexagonal Defense Compendium',
    ingredientNames: [
      'Ethically sourced dragon scales',
      'Himalayan pink salt',
      'Solar-charged crystal',
    ],
    incantationNames: ['Protego Maxima', 'Terra Stabilitas'],
  },
  {
    name: 'Aesthetic Manifestation Ritual',
    origin: 'Bruja TikTok Collective, 2024',
    ingredientNames: [
      'Prism-split sunlight',
      'Aetheric starlight essence',
      'Biodegradable glitter',
    ],
    incantationNames: ['Manifestación Ahora', 'Stellar Navigation'],
  },
  {
    name: 'Levitation Mastery',
    origin: 'Classical Spellbook of Elementary Witchcraft',
    ingredientNames: [
      'Compressed wind essence',
      'Smart home dust',
      'Lab-grown phoenix feather',
    ],
    incantationNames: ['Wingardium Leviosa', 'Unmute Energy'],
  },
  {
    name: 'Eco-Harmony Enchantment',
    origin: 'EcoWitch Compendium, Vol. 3',
    ingredientNames: [
      'Organic mandrake root',
      'Ethically sourced sage',
      'Artisanal sea salt',
      'Recycled smartphone glass',
    ],
    incantationNames: [
      'Wyrd Recycling',
      'Bío-Hacking Harmonia',
      'Elemental Harmony',
    ],
  },
  {
    name: 'Self-Care Sanctuary Spell',
    origin: 'Wellness Witch Weekly, Issue 42',
    ingredientNames: [
      'CBD oil',
      'Synthesized mermaid tears',
      'Quantum-entangled sand',
    ],
    incantationNames: ['Aqua Vitae', 'Void Whisper'],
  },
  {
    name: 'Algorithm Banishment Ritual',
    origin: 'Digital Liberation Front Spellbook',
    ingredientNames: [
      'Fossilized WiFi signals',
      'Vintage typewriter keys',
      'Compressed wind essence',
    ],
    incantationNames: ['Banish Algorithm', 'Recursion Reversa'],
  },
  {
    name: 'Plant Parent Blessing',
    origin: 'Urban Druid Handbook, 3rd Edition',
    ingredientNames: [
      'Organic mandrake root',
      'Cloud-harvested rainwater',
      'Cold brew coffee grounds',
    ],
    incantationNames: ['Terra Stabilitas', 'Aqua Vitae'],
  },
  {
    name: 'Caffeine Amplification Elixir',
    origin: 'Productivity Witch Quarterly',
    ingredientNames: [
      'Cold brew coffee grounds',
      'Solar-charged crystal',
      'Himalayan pink salt',
    ],
    incantationNames: ['Ignis Purificare', 'Vibrational Alignment'],
  },
  {
    name: 'Confidence Manifestation Spell',
    origin: 'Empowerment Coven Chronicles',
    ingredientNames: [
      'Moonbeam-infused silver',
      'Prism-split sunlight',
      'Compressed wind essence',
    ],
    incantationNames: ['Unmute Energy', 'Cosmic Alignment', 'Lumos Maxima'],
  },
  {
    name: 'Viral Content Charm',
    origin: 'Influencer Witch Academy',
    ingredientNames: [
      'Biodegradable glitter',
      'Lab-grown phoenix feather',
      'Smart home dust',
    ],
    incantationNames: ['Subscribe To My Channel', 'Unmute Energy'],
  },
  {
    name: 'Retrowave Nostalgia Invocation',
    origin: 'Vaporwave Grimoire, 1987',
    ingredientNames: [
      'Charcoal from vintage vinyl',
      'Vintage typewriter keys',
      'Prism-split sunlight',
    ],
    incantationNames: ['Void Whisper', 'Ignis Purificare'],
  },
];

/**
 * Processes recipe definitions to create full Recipe objects
 * Creates lookup maps for efficient ingredient/incantation resolution
 */
function processRecipes(
  definitions: RecipeDefinition[],
  ingredients: Ingredient[],
  incantations: Incantation[]
): Recipe[] {
  // Create lookup maps for O(1) access
  const ingredientMap = new Map<string, Ingredient>();
  const incantationMap = new Map<string, Incantation>();

  // Populate lookup maps
  ingredients.forEach((ingredient) => {
    ingredientMap.set(ingredient.name, ingredient);
  });

  incantations.forEach((incantation) => {
    incantationMap.set(incantation.name, incantation);
  });

  // Process each recipe definition
  return definitions.map((definition) => {
    // Resolve ingredients
    const resolvedIngredients: Ingredient[] = [];
    definition.ingredientNames.forEach((name) => {
      const ingredient = ingredientMap.get(name);
      if (ingredient) {
        resolvedIngredients.push(ingredient);
      } else {
        console.warn(
          `Warning: Ingredient "${name}" not found in recipe "${definition.name}"`
        );
      }
    });

    // Resolve incantations
    const resolvedIncantations: Incantation[] = [];
    definition.incantationNames.forEach((name) => {
      const incantation = incantationMap.get(name);
      if (incantation) {
        resolvedIncantations.push(incantation);
      } else {
        console.warn(
          `Warning: Incantation "${name}" not found in recipe "${definition.name}"`
        );
      }
    });

    return {
      name: definition.name,
      origin: definition.origin,
      ingredients: resolvedIngredients,
      incantations: resolvedIncantations,
    };
  });
}

// Export the processed recipes
export const defaultRecipes: Recipe[] = processRecipes(
  recipeDefinitions,
  defaultIngredients,
  defaultIncantations
);
