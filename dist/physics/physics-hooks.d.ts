import { Object3D } from "three";
import { MutableRefObject } from "react";
import { PhysicsApi } from "./physics-api";
import { BodyConfig, BodyType, ShapeConfig, ShapeType } from "three-ammo";
declare type UsePhysicsOptions = Omit<BodyConfig, "type"> & {
    shapeType: ShapeType;
    bodyType?: BodyType;
    mesh?: Object3D;
    shapeConfig?: Omit<ShapeConfig, "type">;
    position?: [number, number, number];
};
export declare function usePhysics(options: UsePhysicsOptions | (() => UsePhysicsOptions), object3D?: Object3D): [MutableRefObject<Object3D>, PhysicsApi];
export {};
