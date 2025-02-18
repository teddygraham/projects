"use strict";
// utils.ts
exports.__esModule = true;
exports.getRandomAttributes = exports.getRandomElement = void 0;
// Generic function that picks a random element from an array
function getRandomElement(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}
exports.getRandomElement = getRandomElement;
// Helper to get random attributes for a character
// Using union types, let's say strength/agility/intelligence range from 1 to 20
function getRandomAttributes() {
    var randomInRange = function () { return Math.floor(Math.random() * 20) + 1; };
    return {
        strength: randomInRange(),
        agility: randomInRange(),
        intelligence: randomInRange()
    };
}
exports.getRandomAttributes = getRandomAttributes;
