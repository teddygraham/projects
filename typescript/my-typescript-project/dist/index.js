import { Race, Warrior, Mage } from "./roles";
import { CharacterClass } from "./character";
import { getRandomElement, getRandomAttributes } from "./utils";
// We'll remove the "main()" approach and attach to a button click
function generateCharacter() {
    const possibleRaces = [Race.Human, Race.Elf, Race.Dwarf, Race.Orc, Race.Gnome];
    const possibleRoles = [Warrior, Mage];
    const possibleNames = ["Arin", "Belmont", "Cassandra", "Durok", "Eliria"];
    const name = getRandomElement(possibleNames);
    const race = getRandomElement(possibleRaces);
    const role = getRandomElement(possibleRoles);
    const attributes = getRandomAttributes();
    const newCharacter = new CharacterClass(name, race, role, attributes);
    return newCharacter.describe();
}
// Hook into the browser after window loads
window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("generate-btn");
    const output = document.getElementById("character-output");
    if (btn && output) {
        btn.addEventListener("click", () => {
            const characterInfo = generateCharacter();
            output.textContent = characterInfo; // Show in <pre>
        });
    }
});
