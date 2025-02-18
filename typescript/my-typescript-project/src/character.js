"use strict";
exports.__esModule = true;
exports.CharacterClass = void 0;
// A class that implements the Character interface
var CharacterClass = /** @class */ (function () {
    function CharacterClass(name, race, role, attributes) {
        this.name = name;
        this.race = race;
        this.attributes = attributes;
        this.role = role;
    }
    // Example method that uses the character's stats
    CharacterClass.prototype.describe = function () {
        var _a;
        return "\n      Meet ".concat(this.name, ", a ").concat(this.race, " ").concat(this.role.roleName, ".\n      Strength: ").concat(this.attributes.strength, "\n      Agility: ").concat(this.attributes.agility, "\n      Intelligence: ").concat(this.attributes.intelligence, "\n      Special Ability: ").concat((_a = this.role.specialAbility) !== null && _a !== void 0 ? _a : "None", "\n    ");
    };
    return CharacterClass;
}());
exports.CharacterClass = CharacterClass;
