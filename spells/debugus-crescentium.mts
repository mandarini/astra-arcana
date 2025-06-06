import { SpellcastingSDK } from '@astra-arcana/spellcasting-sdk';

const moonphase = await getMoonphase();
console.log(moonphase);

const sdk = new SpellcastingSDK();

// Get filtered ingredients and incantations in parallel
const [ingredients, incantations] = await Promise.all([
  sdk.getIngredients({ affinity: 'fire' }),
  sdk.getIncantations({ affinity: 'fire' }),
]);

await sdk.castSpell(ingredients, incantations);

// returns the current moon phase as a percentage
async function getMoonphase(): Promise<number> {
  const timestamp = Math.floor(Date.now() / 1000);
  const response = await fetch(
    `https://api.farmsense.net/v1/moonphases/?d=${timestamp}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch moonphase: ${response.status}`);
  }

  const data = await response.json();
  return data[0]['Illumination'];
}
