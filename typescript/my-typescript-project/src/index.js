"use strict";
exports.__esModule = true;
// index.ts
var roles_1 = require("./roles");
var character_1 = require("./character");
var utils_1 = require("./utils");
function main() {
    // Races and roles to choose from
    var possibleRaces = [roles_1.Race.Human, roles_1.Race.Elf, roles_1.Race.Dwarf, roles_1.Race.Orc, roles_1.Race.Gnome];
    var possibleRoles = [roles_1.Warrior, roles_1.Mage];
    // Example names
    var possibleNames = ["Arin", "Belmont", "Cassandra", "Durok", "Eliria"];
    // Generate a random character
    var name = (0, utils_1.getRandomElement)(possibleNames);
    var race = (0, utils_1.getRandomElement)(possibleRaces);
    var role = (0, utils_1.getRandomElement)(possibleRoles);
    var attributes = (0, utils_1.getRandomAttributes)();
    var newCharacter = new character_1.CharacterClass(name, race, role, attributes);
    // Print out the character's description
    console.log(newCharacter.describe());
}
main();
