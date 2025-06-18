import { DataManager } from '../core/DataManager';
import { CharacterModel } from '../characters/CharacterModel';

export class ShopManager {
    private characters: CharacterModel[] = [];
    private currentCoins: number = 0;
    
    init(characters: CharacterModel[]) {
        this.characters = characters;
        this.currentCoins = DataManager.loadCoins();
    }
    
    purchaseCharacter(id: string): boolean {
        const character = this.characters.find(c => c.id === id);
        if (!character || character.isUnlocked || this.currentCoins < character.price) 
            return false;
        
        this.currentCoins -= character.price;
        character.isUnlocked = true;
        
        DataManager.saveCoins(this.currentCoins);
        DataManager.saveCharacters(this.characters);
        return true;
    }
    
    getAvailableCharacters(): CharacterModel[] {
        return this.characters.filter(c => c.isUnlocked);
    }
}