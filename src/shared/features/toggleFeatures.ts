import { FeatureFlags } from 'shared/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

interface ToggleFeatureOptions<T> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeature<T>({ off, on, name }: ToggleFeatureOptions<T>):T {
    if (getFeatureFlag(name)) {
        return on();
    }
    return off();
}
