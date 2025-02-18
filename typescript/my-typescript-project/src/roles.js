"use strict";
// roles.ts
exports.__esModule = true;
exports.Mage = exports.Warrior = exports.Race = void 0;
// An enum for a character’s race
var Race;
(function (Race) {
    Race["Human"] = "Human";
    Race["Elf"] = "Elf";
    Race["Dwarf"] = "Dwarf";
    Race["Orc"] = "Orc";
    Race["Gnome"] = "Gnome";
})(Race = exports.Race || (exports.Race = {}));
// We'll define a couple of role types to illustrate usage
exports.Warrior = {
    roleName: "Warrior",
    specialAbility: "Power Strike"
};
exports.Mage = {
    roleName: "Mage",
    specialAbility: "Arcane Blast"
};
// You can add more roles as needed...
