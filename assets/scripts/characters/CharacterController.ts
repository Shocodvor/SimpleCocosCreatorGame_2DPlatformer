import { _decorator, Component, input, Input, KeyCode, Vec2, RigidBody2D, Contact2DType, Collider2D } from 'cc';
import { CharacterModel } from './CharacterModel';
import { CharacterView } from './CharacterView';

export abstract class BaseCharacterController extends Component {
    protected model!: CharacterModel;
    protected view!: CharacterView;
    protected rigidBody!: RigidBody2D;
    
    abstract move(direction: number): void;
    abstract jump(): void;
    abstract attack(): void;
    
    setup(model: CharacterModel, view: CharacterView) {
        this.model = model;
        this.view = view;
        this.rigidBody = this.getComponent(RigidBody2D)!;
    }
}

export class PlayerController extends BaseCharacterController {
    private isGrounded = false;
    
    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.getComponent(Collider2D)?.on(Contact2DType.BEGIN_CONTACT, this.onCollision, this);
    }
    
    private onKeyDown(event: any) {
        if (event.keyCode === KeyCode.SPACE) this.jump();
        if (event.keyCode === KeyCode.KEY_F) this.attack();
    }
    
    move(direction: number) {
        const velocity = this.rigidBody.linearVelocity;
        velocity.x = direction * this.model.speed;
        this.rigidBody.linearVelocity = velocity;
        this.view.updateDirection(direction);
    }
    
    jump() {
        if (this.isGrounded) {
            // Добавляем третий аргумент wake=true
            this.rigidBody.applyLinearImpulse(new Vec2(0, this.model.jumpForce), new Vec2(), true);
            this.view.playJumpAnimation();
        }
    }
    
    attack() {
        this.view.playAttackAnimation();
        // Логика атаки врагов
    }
    
    private onCollision() {
        this.isGrounded = true;
    }
}