export declare function removeUndefinedKeys<T>(obj: T): T;
export interface AmmoDebugOptions {
    DrawWireframe?: boolean;
    DrawAabb?: boolean;
    DrawFeaturesText?: boolean;
    DrawContactPoints?: boolean;
    NoDeactivation?: boolean;
    NoHelpText?: boolean;
    DrawText?: boolean;
    ProfileTimings?: boolean;
    EnableSatComparison?: boolean;
    DisableBulletLCP?: boolean;
    EnableCCD?: boolean;
    DrawConstraints?: boolean;
    DrawConstraintLimits?: boolean;
    FastWireframe?: boolean;
    DrawNormals?: boolean;
    MAX_DEBUG_DRAW_MODE?: boolean;
}
export declare function ammoDebugOptionsToNumber(debugOptions: AmmoDebugOptions): number;
