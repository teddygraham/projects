// roles.ts
// An enum for a character’s race
export var Race;
(function (Race) {
    Race["Human"] = "Human";
    Race["Elf"] = "Elf";
    Race["Dwarf"] = "Dwarf";
    Race["Orc"] = "Orc";
    Race["Gnome"] = "Gnome";
})(Race || (Race = {}));
// We'll define a couple of role types to illustrate usage
export const Warrior = {
    roleName: "Warrior",
    specialAbility: "Power Strike",
};
export const Mage = {
    roleName: "Mage",
    specialAbility: "Arcane Blast",
};
// You can add more roles as needed...
