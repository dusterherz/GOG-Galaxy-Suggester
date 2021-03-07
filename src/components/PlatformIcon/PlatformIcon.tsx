import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';

import { platformIconProps } from './PlatformIcon.types';

import { ReactComponent as BattleNetIcon } from './icons/battlenet.svg'
import { ReactComponent as BethesdaNetIcon } from './icons/bethesda.svg'
import { ReactComponent as EpicIcon } from './icons/epic.svg'
import { ReactComponent as GogIcon } from './icons/gog.svg'
import { ReactComponent as HumbleBundleIcon } from './icons/humble_bundle.svg'
import { ReactComponent as OriginIcon } from './icons/origin.svg'
import { ReactComponent as ParadoxIcon } from './icons/paradox.svg'
import { ReactComponent as PlayStationIcon } from './icons/playstation.svg'
import { ReactComponent as SteamIcon } from './icons/steam.svg'
import { ReactComponent as UplayIcon } from './icons/uplay.svg'
import { ReactComponent as XboxIcon } from './icons/xbox.svg'
import { ReactComponent as DefaultIcon } from './icons/default.svg'
import { IconButton } from '@material-ui/core';
import platformFromReleaseKey from '../../utils/platformFromReleaseKey';
import readablePlatformName from '../../utils/readablePlatformName';

function PlatformIcon({ releaseKey }: platformIconProps) {
    const platform = readablePlatformName(platformFromReleaseKey(releaseKey));
    const icon = pickIcon(platform);

    const onClick = () => {
        var win = window.open(`goggalaxy://openGameView/${releaseKey}`, '_blank');
        win?.focus();
    }

    return (
        <Tooltip title={platform} >
            <IconButton onClick={onClick}>
                <SvgIcon component={icon.icon} viewBox={`0 0 ${icon.size ?? 24} ${icon.size ?? 24}`} />
            </IconButton>
        </Tooltip>
    );
}

function pickIcon(platform: string) {
    switch (platform) {
        case 'Battle.net':
            return { icon: BattleNetIcon };
        case 'Bethesda.net':
            return { icon: BethesdaNetIcon };
        case 'Epic Games Store':
            return { icon: EpicIcon, size: 32 };
        case 'GOG':
            return { icon: GogIcon };
        case 'Humble Bundle':
            return { icon: HumbleBundleIcon };
        case 'Origin':
            return { icon: OriginIcon, size: 32 };
        case 'Paradox Plaza':
            return { icon: ParadoxIcon };
        case 'PlayStation Network':
            return { icon: PlayStationIcon };
        case 'Steam':
            return { icon: SteamIcon };
        case 'Uplay':
            return { icon: UplayIcon };
        case 'Xbox Live':
            return { icon: XboxIcon };
        default:
            return { icon: DefaultIcon };
    }
}

export default PlatformIcon;