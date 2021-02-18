import React from 'react';
import { mount } from 'enzyme';

import PlatformIcon from './PlatformIcon';

describe('PlatformIcon should', () => {
    it('show Battle.net icon when platform is Battle.net', () => {
        const wrapper = mount(<PlatformIcon platform={'Battle.net'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Bethesda.net icon when platform is Bethesda.net', () => {
        const wrapper = mount(<PlatformIcon platform={'Bethesda.net'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Epic icon when platform is Epic Games Store', () => {
        const wrapper = mount(<PlatformIcon platform={'Epic Games Store'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show gog icon when platform is GOG', () => {
        const wrapper = mount(<PlatformIcon platform={'GOG'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Humble Bundle icon when platform is Humble Bundle', () => {
        const wrapper = mount(<PlatformIcon platform={'Humble Bundle'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Origin icon when platform is Origin', () => {
        const wrapper = mount(<PlatformIcon platform={'Origin'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show paradox icon when platform is paradox', () => {
        const wrapper = mount(<PlatformIcon platform={'paradox'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show PlayStation icon when platform is PlayStation Network', () => {
        const wrapper = mount(<PlatformIcon platform={'PlayStation Network'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Steam icon when platform is Steam', () => {
        const wrapper = mount(<PlatformIcon platform={'Steam'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Uplay icon when platform is Uplay', () => {
        const wrapper = mount(<PlatformIcon platform={'Uplay'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show Xbox icon when platform is Xbox Live', () => {
        const wrapper = mount(<PlatformIcon platform={'Xbox Live'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('show default gog galaxy icon when platform is unknown', () => {
        const wrapper = mount(<PlatformIcon platform={'some random test platform'}></PlatformIcon>);
        expect(wrapper.html()).toMatchSnapshot();
    });

});