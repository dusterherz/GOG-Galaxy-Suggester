import React from 'react';
import { platformDisplayProps } from "./PlatformDisplay.types";
import PlatformIcon from '../PlatformIcon/PlatformIcon';

function PlatformDisplay({ platforms }: platformDisplayProps) {
    return (
        <div>
            {platforms.map(platform =>
                <PlatformIcon key={platform} platform={platform} />
            )}

        </div>
    );
}

export default PlatformDisplay;