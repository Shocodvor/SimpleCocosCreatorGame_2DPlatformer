import { sys } from 'cc';
import { CharacterModel } from '../characters/CharacterModel';

const COIN_KEY = "player_coins";
const CHARACTERS_KEY = "characters_data";
const SELECTED_CHAR_KEY = "selected_character";

export class DataManager {
    static saveCoins(amount: number) {
        sys.localStorage.setItem(COIN_KEY, amount.toString());
    }
    
    static loadCoins(): number {
        const coins = sys.localStorage.getItem(COIN_KEY);
        return coins ? parseInt(coins) : 0;
    }
    
    static saveCharacters(characters: CharacterModel[]) {
        const data = characters.map(char => ({
            id: char.id,
            unlocked: char.isUnlocked
        }));
        sys.localStorage.setItem(CHARACTERS_KEY, JSON.stringify(data));
    }
    
    static loadCharacters(defaultChars: CharacterModel[]): CharacterModel[] {
        const savedData = sys.localStorage.getItem(CHARACTERS_KEY);
        const saved = savedData ? JSON.parse(savedData) : [];
        return defaultChars.map(char => {
            const savedChar = saved.find((c: any) => c.id === char.id);
            return new CharacterModel(
                char.id,
                char.name,
                char.speed,
                char.jumpForce,
                char.attackDamage,
                savedChar ? savedChar.unlocked : char.isUnlocked,
                char.price
            );
        });
    }
    
    static saveSelectedCharacter(id: string) {
        sys.localStorage.setItem(SELECTED_CHAR_KEY, id);
    }
    
    static loadSelectedCharacter(): string {
        return sys.localStorage.getItem(SELECTED_CHAR_KEY) || '';
    }
}