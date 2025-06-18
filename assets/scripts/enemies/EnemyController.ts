import { _decorator, Component, Collider2D, Contact2DType } from 'cc';
import { CharacterModel } from '../characters/CharacterModel';

export class EnemyController extends Component {
    private model!: CharacterModel;
    
    init(model: CharacterModel) {
        this.model = model;
        this.getComponent(Collider2D)?.on(Contact2DType.BEGIN_CONTACT, this.onHit, this);
    }
    
    private onHit(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (otherCollider.group === 2) { 
            this.takeDamage(this.model.attackDamage);
        }
    }
    
    takeDamage(damage: number) {
       //add damage effect
    }
}