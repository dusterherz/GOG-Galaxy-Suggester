import React from 'react';
import { mount } from 'enzyme';

import PlatformIcon from './PlatformIcon';

describe('PlatformIcon should', () => {
    it('show Battle.net icon when platform is Battle.net', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'battlenet_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Bethesda.net icon when platform is Bethesda.net', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'bethesda_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Epic icon when platform is Epic Games Store', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'epic_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show gog icon when platform is GOG', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'gog_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Humble Bundle icon when platform is Humble Bundle', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'humble_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Origin icon when platform is Origin', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'origin_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show paradox icon when platform is paradox', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'paradox_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show PlayStation icon when platform is PlayStation Network', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'psn_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Steam icon when platform is Steam', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'steam_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Uplay icon when platform is Uplay', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'uplay_213'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Xbox icon when platform is Xbox Live', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'xboxone_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show default gog galaxy icon when platform is unknown', () => {
        const wrapper = mount(<PlatformIcon releaseKey={'somerandomtestplatform_123'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

});