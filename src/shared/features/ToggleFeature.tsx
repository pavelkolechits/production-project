import { FeatureFlags } from 'shared/types/featureFlags';
import { ReactElement } from 'react';
import { getFeatureFlag } from './setGetFeatures';

interface ToggleFeatureOptions {
    name: keyof FeatureFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeature = ({ off, on, name }: ToggleFeatureOptions) => {
    if (getFeatureFlag(name)) {
        return on;
    }
    return off;
};
