import { SvgIcon } from '@material-ui/core';
import { mount } from 'enzyme';
import React from 'react';
import PlatformDisplay from './PlatformDisplay';

describe('PlatformDisplay', () => {
    it('should display an icon when one platform given', () => {
        const wrapper = mount(<PlatformDisplay releaseKeys={['steam_123']}></PlatformDisplay>)
        expect(wrapper.find(SvgIcon)).toHaveLength(1);
    })

    it('should display three icons when three platforms given', () => {
        const wrapper = mount(<PlatformDisplay releaseKeys={['steam_123', 'humble_game', 'ps2_9494949']}></PlatformDisplay>)
        expect(wrapper.find(SvgIcon)).toHaveLength(3);
    })
})