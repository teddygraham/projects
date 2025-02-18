// utils.ts
// Generic function that picks a random element from an array
export function getRandomElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}
// Helper to get random attributes for a character
// Using union types, let's say strength/agility/intelligence range from 1 to 20
export function getRandomAttributes() {
    const randomInRange = () => Math.floor(Math.random() * 20) + 1;
    return {
        strength: randomInRange(),
        agility: randomInRange(),
        intelligence: randomInRange(),
    };
}
