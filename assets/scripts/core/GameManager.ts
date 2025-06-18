import { ShopManager } from '../shop/ShopManager';
import { DataManager } from './DataManager';
import { CharacterModel } from '../characters/CharacterModel';

export class GameManager {
    private shopManager = new ShopManager();
    private characters: CharacterModel[] = [];
    
    init() {
        this.loadCharacters();
        this.shopManager.init(this.characters);
    }
    
    private loadCharacters() {
        const defaultChars = [
            new CharacterModel("char1", "Hero", 200, 350, 10, true, 0),
            new CharacterModel("char2", "Warrior", 180, 400, 15, false, 100)
        ];
        this.characters = DataManager.loadCharacters(defaultChars);
    }
    
    completeLevel(coinsEarned: number) {
        const totalCoins = DataManager.loadCoins() + coinsEarned;
        DataManager.saveCoins(totalCoins);
    }
    
    switchCharacter(id: string) {
        const char = this.characters.find(c => c.id === id);
        if (char?.isUnlocked) {
            DataManager.saveSelectedCharacter(id);
            // Переключение персонажа в игре
        }
    }
}