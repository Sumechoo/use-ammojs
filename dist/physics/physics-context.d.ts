/// <reference types="react" />
import { Quaternion, Vector3 } from "@react-three/fiber";
import { Object3D } from "three";
import { BodyConfig, ConstraintType, ShapeConfig, UpdateBodyOptions } from "three-ammo";
export interface ConstraintOptions {
    type: ConstraintType;
    pivot?: Vector3;
    targetPivot?: Vector3;
    axis?: Vector3;
    targetAxis?: Vector3;
}
export interface AmmoPhysicsContext {
    addBody(uuid: string, mesh: Object3D, options?: BodyConfig): any;
    removeBody(uuid: string): any;
    addShapes(bodyUuid: string, shapesUuid: string, mesh: Object3D, options?: ShapeConfig): any;
    removeShapes(bodyUuid: string, shapesUuid: string): any;
    addConstraint(constraintId: string, bodyUuid: string, targetUuid: string, options?: ConstraintOptions): any;
    removeConstraint(constraintId: string): any;
    updateBody(uuid: string, options: UpdateBodyOptions): any;
    enableDebug(enable: boolean, debugSharedArrayBuffer: SharedArrayBuffer): any;
    resetDynamicBody(uuid: string): any;
    activateBody(uuid: string): any;
    bodySetMotionState(uuid: string, position?: Vector3, rotation?: Quaternion): any;
    bodySetLinearVelocity(uuid: string, velocity: Vector3): any;
    bodyApplyImpulse(uuid: string, impulse: Vector3, relativeOffset?: Vector3): any;
    bodyApplyForce(uuid: string, force: Vector3, relativeOffset?: Vector3): any;
    bodySetShapesOffset(uuid: string, offset: Vector3): any;
    object3Ds: Record<string, Object3D>;
}
export declare const AmmoPhysicsContext: import("react").Context<AmmoPhysicsContext | null>;
export declare function useAmmoPhysicsContext(): AmmoPhysicsContext;
