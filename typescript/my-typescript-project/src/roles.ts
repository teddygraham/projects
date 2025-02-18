// roles.ts

// An enum for a character’s race
export enum Race {
    Human = "Human",
    Elf = "Elf",
    Dwarf = "Dwarf",
    Orc = "Orc",
    Gnome = "Gnome",
  }
  
  // An interface that outlines how a character role should look
  export interface CharacterRole {
    roleName: string;
    specialAbility?: string; 
    // The question mark (?) marks it as optional. 
    // Some roles might not have a distinct “specialAbility.”
  }
  
  // We'll define a couple of role types to illustrate usage
  export const Warrior: CharacterRole = {
    roleName: "Warrior",
    specialAbility: "Power Strike",
  };
  
  export const Mage: CharacterRole = {
    roleName: "Mage",
    specialAbility: "Arcane Blast",
  };
  
  // You can add more roles as needed...
  