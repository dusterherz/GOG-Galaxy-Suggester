import React from 'react';
import { platformDisplayProps } from "./PlatformDisplay.types";
import PlatformIcon from '../PlatformIcon/PlatformIcon';

function PlatformDisplay({ releaseKeys }: platformDisplayProps) {
    return (
        <div>
            {releaseKeys.map(releaseKey =>
                <PlatformIcon key={releaseKey} releaseKey={releaseKey} />
            )}

        </div>
    );
}

export default PlatformDisplay;