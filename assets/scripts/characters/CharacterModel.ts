export interface ICharacterModel {
    id: string;
    name: string;
    speed: number;
    jumpForce: number;
    attackDamage: number;
    isUnlocked: boolean;
    price: number;
}

export class CharacterModel implements ICharacterModel {
    constructor(
        public id: string,
        public name: string,
        public speed: number,
        public jumpForce: number,
        public attackDamage: number,
        public isUnlocked: boolean,
        public price: number
    ) {}
}