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

function PlatformIcon({ platform }: platformIconProps) {
    const icon = pickIcon(platform);

    return (
        <Tooltip title={platform} >
            <SvgIcon component={icon.icon} viewBox={`0 0 ${icon.size ?? 24} ${icon.size ?? 24}`} />
        </Tooltip>
    );
}

function pickIcon(platform: string) {
    switch (platform) {
        case 'battlenet':
        case 'Battle.net':
            return { icon: BattleNetIcon };
        case 'bethesda':
        case 'Bethesda.net':
            return { icon: BethesdaNetIcon };
        case 'epic':
        case 'Epic Games Store':
            return { icon: EpicIcon, size: 32 };
        case 'GOG':
            return { icon: GogIcon };
        case 'humble':
        case 'Humble Bundle':
            return { icon: HumbleBundleIcon };
        case 'origin':
        case 'Origin':
            return { icon: OriginIcon, size: 32 };
        case 'paradox':
        case 'Paradox Plaza':
            return { icon: ParadoxIcon };
        case 'psn':
        case 'PlayStation Network':
            return { icon: PlayStationIcon };
        case 'steam':
        case 'Steam':
            return { icon: SteamIcon };
        case 'uplay':
        case 'Uplay':
            return { icon: UplayIcon };
        case 'xboxone':
        case 'Xbox Live':
            return { icon: XboxIcon };
        default:
            return { icon: DefaultIcon };
    }
}

export default PlatformIcon;