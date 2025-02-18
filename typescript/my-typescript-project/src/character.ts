// character.ts
import { Race, CharacterRole } from "./roles";

// Define an interface describing a character
export interface Character {
  name: string;
  race: Race;
  attributes: {
    strength: number;
    agility: number;
    intelligence: number;
  };
  role: CharacterRole;
}

// A class that implements the Character interface
export class CharacterClass implements Character {
  name: string;
  race: Race;
  attributes: {
    strength: number;
    agility: number;
    intelligence: number;
  };
  role: CharacterRole;

  constructor(
    name: string,
    race: Race,
    role: CharacterRole,
    attributes: { strength: number; agility: number; intelligence: number }
  ) {
    this.name = name;
    this.race = race;
    this.attributes = attributes;
    this.role = role;
  }

  // Example method that uses the character's stats
  describe(): string {
    return `
      Meet ${this.name}, a ${this.race} ${this.role.roleName}.
      Strength: ${this.attributes.strength}
      Agility: ${this.attributes.agility}
      Intelligence: ${this.attributes.intelligence}
      Special Ability: ${this.role.specialAbility ?? "None"}
    `;
  }
}
