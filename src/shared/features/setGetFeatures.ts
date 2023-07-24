import { FeatureFlags } from 'shared/types/featureFlags';

let featureFlags: FeatureFlags = {
    isAppRedesigned: true,
};

export function setFeatureFlags(newFeatureFlags?:FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}
