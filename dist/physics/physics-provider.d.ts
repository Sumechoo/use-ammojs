import { PropsWithChildren } from "react";
import { AmmoDebugOptions } from "../utils/utils";
interface AmmoPhysicsProps {
    drawDebug?: boolean;
    drawDebugMode?: AmmoDebugOptions;
    gravity?: [number, number, number];
    epsilon?: number;
    fixedTimeStep?: number;
    maxSubSteps?: number;
    solverIterations?: number;
}
export declare function Physics({ drawDebug, drawDebugMode, gravity, epsilon, fixedTimeStep, maxSubSteps, solverIterations, children, }: PropsWithChildren<AmmoPhysicsProps>): JSX.Element | null;
export {};
