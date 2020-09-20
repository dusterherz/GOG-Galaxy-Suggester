import { SvgIcon } from '@material-ui/core';
import { mount } from 'enzyme';
import React from 'react';
import PlatformDisplay from './PlatformDisplay';

describe('PlatformDisplay', () => {
    it('should display an icon when one platform given', () => {
        const wrapper = mount(<PlatformDisplay platforms={['Steam']}></PlatformDisplay>)
        expect(wrapper.find(SvgIcon)).toHaveLength(1);
    })

    it('should display three icons when three platforms given', () => {
        const wrapper = mount(<PlatformDisplay platforms={['Steam', 'Humble Bundle', 'PS2']}></PlatformDisplay>)
        expect(wrapper.find(SvgIcon)).toHaveLength(3);
    })
})