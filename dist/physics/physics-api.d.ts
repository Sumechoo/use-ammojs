import { AmmoPhysicsContext } from "./physics-context";
import { Vector3, Quaternion } from "three";
import { UpdateBodyOptions } from "three-ammo";
export interface PhysicsApi {
    updateBodyOptions(options: UpdateBodyOptions): void;
    getPosition(): Vector3;
    setPosition(position: Vector3): any;
    getRotation(): Quaternion;
    setRotation(rotation: Quaternion): any;
    setMotionState(position: Vector3, rotation: Quaternion): void;
    setLinearVelocity(velocity: Vector3): void;
    applyImpulse(impulse: Vector3, relativeOffset?: Vector3): void;
    applyForce(force: Vector3, relativeOffset?: Vector3): void;
    setShapesOffset(offset: Vector3): any;
}
export declare function createPhysicsApi(physicsContext: AmmoPhysicsContext, bodyUUID: string, shapesUUID: string): {
    updateBodyOptions(options: UpdateBodyOptions): void;
    getPosition(): any;
    setPosition(position: any): void;
    getRotation(): any;
    setRotation(rotation: any): void;
    setMotionState(position: any, rotation: any): void;
    setLinearVelocity(velocity: any): void;
    applyImpulse(impulse: any, relativeOffset?: any): void;
    applyForce(force: any, relativeOffset?: any): void;
    setShapesOffset(offset: any): void;
};
