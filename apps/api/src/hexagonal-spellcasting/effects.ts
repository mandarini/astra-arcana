import {
  ElementEffect,
  HexElement,
  SpecialEffect,
  SpellResult
} from './types';

/**
 * Element effect mappings
 */
export const elementEffects: Record<HexElement, string[]> = {
  fire: ["transformation", "energy", "passion", "destruction", "illumination"],
  water: ["fluidity", "healing", "emotion", "cleansing", "intuition"],
  earth: ["stability", "protection", "grounding", "abundance", "connection"],
  air: ["movement", "intellect", "communication", "freedom", "clarity"],
  aether: ["consciousness", "spirituality", "dreams", "transcendence", "insight"],
  void: ["mystery", "potential", "secrets", "absorption", "transition"],
  neutral: ["balance", "neutrality", "stability", "mediocrity", "normality"]
};

/**
 * Determines all effects of a spell based on elemental proportions
 */
export function determineSpellEffects(spellResult: SpellResult): {
  primaryEffects: ElementEffect[];
  specialEffect: SpecialEffect | null;
  effectStrength: number;
  durationDescription: string;
  successDescription: string;
} {
  // Initialize result object
  const effectResult = {
    primaryEffects: [] as ElementEffect[],
    specialEffect: null as SpecialEffect | null,
    effectStrength: 1,
    durationDescription: "",
    successDescription: ""
  };
  
  if (!spellResult.success) {
    effectResult.successDescription = "failed";
    return effectResult;
  }
  
  // Calculate total elemental presence
  const totalElementalValue = Object.entries(spellResult.elementalBalance)
    .filter(([element]) => element !== 'neutral')
    .reduce((sum, [_, val]) => sum + val, 0);
  
  // Calculate proportional effect of each element
  Object.entries(spellResult.elementalBalance).forEach(([element, value]) => {
    // Skip neutral or elements with no presence
    if (element === 'neutral' || value <= 0) return;
    
    // Calculate this element's proportional contribution
    const proportion = value / (totalElementalValue || 1); // Prevent division by zero
    
    // Add effects based on proportion strength
    if (proportion >= 0.4) { // Major influence
      effectResult.primaryEffects.push({
        element: element as HexElement,
        effect: elementEffects[element as HexElement][0], // Primary effect
        strength: "strong",
        proportion: proportion
      });
    } else if (proportion >= 0.2) { // Moderate influence
      effectResult.primaryEffects.push({
        element: element as HexElement,
        effect: elementEffects[element as HexElement][Math.floor(Math.random() * 3)], // One of top 3 effects
        strength: "moderate",
        proportion: proportion
      });
    } else if (proportion >= 0.05) { // Minor influence
      effectResult.primaryEffects.push({
        element: element as HexElement,
        effect: elementEffects[element as HexElement][Math.floor(Math.random() * elementEffects[element as HexElement].length)],
        strength: "subtle",
        proportion: proportion
      });
    }
  });
  
  // Sort effects by strength (proportion)
  effectResult.primaryEffects.sort((a, b) => b.proportion - a.proportion);
  
  // Calculate overall spell characteristics
  effectResult.effectStrength = spellResult.power;
  effectResult.durationDescription = spellResult.duration > 8 ? "permanent" :
                                     spellResult.duration > 5 ? "long-lasting" :
                                     spellResult.duration > 3 ? "temporary" : "brief";
  effectResult.successDescription = spellResult.successRate > 80 ? "perfectly cast" : 
                                    spellResult.successRate > 60 ? "successfully cast" : "barely successful";
    
  // Check for special effects
  effectResult.specialEffect = determineSpecialEffect(spellResult);
  
  return effectResult;
}

/**
 * Determines if a special effect is triggered by the spell
 */
export function determineSpecialEffect(spellResult: SpellResult): SpecialEffect | null {
  const specialEffects: Array<{
    name: string;
    description: string;
    requirements: (spell: SpellResult) => boolean;
  }> = [
    // 1. Digital Detox
    {
      name: "Digital Detox",
      description: "Creates a bubble of tech-free calm. Electronic devices within range temporarily lose signal or shut down.",
      requirements: (spell) => {
        return spell.elementalBalance.void > 5 && 
               spell.elementalBalance.water > 3 &&
               spell.ingredients.some(i => i.includes("Cloud-harvested rainwater"));
      }
    },
    
    // 2. Viral Charm
    {
      name: "Viral Charm",
      description: "Enchants digital content to become irresistibly shareable. Any photo or video affected gains temporary algorithm-beating properties.",
      requirements: (spell) => {
        return spell.elementalBalance.air > 4 && 
               spell.elementalBalance.fire > 3 &&
               spell.incantations.includes("Subscribe To My Channel");
      }
    },
    
    // 3. Mercury Retrograde Shield
    {
      name: "Mercury Retrograde Shield",
      description: "Protects against communication mishaps, technology glitches, and missed deadlines during astrological turbulence.",
      requirements: (spell) => {
        return spell.elementalBalance.aether > 6 && 
               spell.elementalBalance.earth > 4 &&
               spell.ingredients.some(i => i.includes("crystal"));
      }
    },
    
    // 4. Eco-Amplification
    {
      name: "Eco-Amplification",
      description: "Channels environmental energy to boost spell effects. Plants nearby grow faster, recycling becomes more efficient, and sustainable choices are magically rewarded.",
      requirements: (spell) => {
        return spell.elementalBalance.earth > 7 && 
               spell.elementalBalance.water > 3 &&
               spell.ingredients.some(i => i.includes("organic"));
      }
    },
    
    // 5. Aesthetic Manifestation
    {
      name: "Aesthetic Manifestation",
      description: "Reality shifts to match your visual intentions. Colors become more vibrant, spaces reorganize for perfect Instagram backdrops, and lighting adjusts for optimal selfies.",
      requirements: (spell) => {
        return spell.elementalBalance.fire > 4 && 
               spell.elementalBalance.aether > 4 &&
               spell.incantations.includes("Manifestación Ahora");
      }
    },
    
    // 6. Self-Care Sanctuary
    {
      name: "Self-Care Sanctuary",
      description: "Creates a temporary zone where stress cannot enter. Bath water stays perfectly warm, candles burn without melting, and face masks remain at optimal temperature.",
      requirements: (spell) => {
        return spell.elementalBalance.water > 5 && 
               spell.elementalBalance.void > 3 &&
               spell.ingredients.some(i => i.includes("CBD oil"));
      }
    },
    
    // 7. Algorithm Banishment
    {
      name: "Algorithm Banishment",
      description: "Temporarily frees you from targeted ads and content recommendations. Social media feeds show only what you genuinely want to see.",
      requirements: (spell) => {
        return spell.elementalBalance.void > 6 && 
               spell.elementalBalance.air > 3 &&
               spell.incantations.includes("Banish Algorithm");
      }
    },
    
    // 8. Plant Parent Blessing
    {
      name: "Plant Parent Blessing",
      description: "Bestows supernatural plant-keeping abilities. Even the most neglected succulents thrive, and propagation success rate increases tenfold.",
      requirements: (spell) => {
        return spell.elementalBalance.earth > 5 && 
               spell.elementalBalance.water > 5 &&
               spell.ingredients.some(i => i.includes("mandrake"));
      }
    },
    
    // 9. Caffeine Amplification
    {
      name: "Caffeine Amplification",
      description: "A single cup of coffee provides the energy equivalent of three, without the jitters. Productivity skyrockets while maintaining zen-like calm.",
      requirements: (spell) => {
        return spell.elementalBalance.fire > 4 && 
               spell.elementalBalance.earth > 3 &&
               spell.ingredients.some(i => i.includes("coffee"));
      }
    },
    
    // 10. Imposter Syndrome Exorcism
    {
      name: "Imposter Syndrome Exorcism",
      description: "Banishes self-doubt and replaces it with confidence in your actual skills and accomplishments. Professional emails write themselves with perfect assertiveness.",
      requirements: (spell) => {
        return spell.elementalBalance.aether > 4 && 
               spell.elementalBalance.air > 4 &&
               spell.elementalBalance.fire > 2 &&
               spell.incantations.includes("Unmute Energy");
      }
    },
    
    // 11. Sustainable Luxury
    {
      name: "Sustainable Luxury",
      description: "Ethically sourced items temporarily gain the qualities of their most expensive counterparts. Thrift store finds look designer, and eco-friendly products outperform premium brands.",
      requirements: (spell) => {
        return spell.elementalBalance.earth > 4 && 
               spell.elementalBalance.aether > 3 &&
               spell.ingredients.some(i => i.includes("Ethically sourced"));
      }
    },
    
    // 12. Retrowave Nostalgia
    {
      name: "Retrowave Nostalgia",
      description: "Surrounds you with the aesthetic and emotional comfort of a time you never actually lived through. Everything gains a vaporwave filter and synthwave soundtrack.",
      requirements: (spell) => {
        return spell.elementalBalance.void > 4 && 
               spell.elementalBalance.fire > 3 &&
               spell.ingredients.some(i => i.includes("vintage"));
      }
    }
  ];
  
  // Check each special effect to see if requirements are met
  for (const effect of specialEffects) {
    if (effect.requirements(spellResult)) {
      return {
        name: effect.name,
        description: effect.description
      };
    }
  }
  
  // Check for elemental balance special effects (when 3+ elements are present in significant amounts)
  const significantElements = Object.entries(spellResult.elementalBalance)
    .filter(([element, value]) => element !== 'neutral' && value >= 3)
    .map(([element]) => element);
  
  if (significantElements.length >= 3) {
    return {
      name: "Elemental Harmony",
      description: "The balanced forces create a harmonious effect that enhances all aspects of the spell. Duration, power, and stability are all increased.",
      elements: significantElements.join(", ")
    };
  }
  
  // Check for extremely powerful single element
  const powerfulElement = Object.entries(spellResult.elementalBalance)
    .filter(([element, value]) => element !== 'neutral' && value > 10)
    .map(([element]) => element)[0];
  
  if (powerfulElement) {
    const elementNames: Record<string, string> = {
      fire: "Inferno Overdrive",
      water: "Tsunami Resonance", 
      earth: "Tectonic Awakening",
      air: "Cyclonic Ascension",
      aether: "Astral Breakthrough",
      void: "Void Collapse"
    };
    
    return {
      name: elementNames[powerfulElement] || "Elemental Surge",
      description: `The overwhelming ${powerfulElement} energy creates unstable but extremely powerful effects. The spell's primary effect is doubled, but duration is halved.`,
      element: powerfulElement as HexElement
    };
  }
  
  return null; // No special effect triggered
}
