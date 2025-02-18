// A class that implements the Character interface
export class CharacterClass {
    constructor(name, race, role, attributes) {
        this.name = name;
        this.race = race;
        this.attributes = attributes;
        this.role = role;
    }
    // Example method that uses the character's stats
    describe() {
        var _a;
        return `
      Meet ${this.name}, a ${this.race} ${this.role.roleName}.
      Strength: ${this.attributes.strength}
      Agility: ${this.attributes.agility}
      Intelligence: ${this.attributes.intelligence}
      Special Ability: ${(_a = this.role.specialAbility) !== null && _a !== void 0 ? _a : "None"}
    `;
    }
}
