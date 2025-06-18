import { _decorator, Sprite, Animation,Component, SpriteFrame } from 'cc';
import { BaseCharacterController } from './CharacterController';
const { ccclass, property } = _decorator;

export class CharacterView extends Component {
    @property(Sprite) sprite: Sprite = null!;
    @property(Animation) animation: Animation = null!;
    
    private controller: BaseCharacterController = null!;
    
    linkController(controller: BaseCharacterController) {
        this.controller = controller;
    }
    
    updateDirection(direction: number) {
      //  this.sprite.flipX = direction < 0;
        this.playRunAnimation();
    }
    
    playRunAnimation() {
        this.animation.play('run');
    }
    
    playJumpAnimation() {
        this.animation.play('jump');
    }
    
    playAttackAnimation() {
        this.animation.play('attack');
    }
}