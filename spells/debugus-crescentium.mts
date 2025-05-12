import { SpellcastingSDK } from '@astra-arcana/typescript-sdk';

const moonphase = await getMoonphase();
console.log(moonphase);

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
