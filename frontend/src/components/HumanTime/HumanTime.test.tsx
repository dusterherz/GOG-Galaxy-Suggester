import { mount } from 'enzyme';
import React from 'react';
import HumanTime from './HumanTime';

describe('HumanTime', () => {
    function createHumanTime(minutes: number) {
        return mount(<HumanTime minutes={minutes}></HumanTime>);
    }

    it('should return 30 minutes, when 30 minutes given', () => {
        const wrapper = createHumanTime(30);

        expect(wrapper.text()).toBe('30 minutes');
    });

    it('should return 31 minute, when 31 minute given', () => {
        const wrapper = createHumanTime(31);

        expect(wrapper.text()).toBe('31 minute');
    });

    it('should return 11 minutes, when 11 minutes given', () => {
        const wrapper = createHumanTime(11);

        expect(wrapper.text()).toBe('11 minutes');
    });

    it('should return 1 hour, when 60 minutes given', () => {
        const wrapper = createHumanTime(60);

        expect(wrapper.text()).toBe('1 hour');
    });

    it('should return 2 hours, when 120 minutes given', () => {
        const wrapper = createHumanTime(120);

        expect(wrapper.text()).toBe('2 hours');
    });

    it('should return 11 hours, when 11 hours given', () => {
        const wrapper = createHumanTime(11 * 60);

        expect(wrapper.text()).toBe('11 hours');
    });

    it('should return 1 hour 5 minutes, when 65 minutes given', () => {
        const wrapper = createHumanTime(65);

        expect(wrapper.text()).toBe('1 hour 5 minutes');
    });

    it('should return 2 hours 21 minute, when 141 minute given', () => {
        const wrapper = createHumanTime(141);

        expect(wrapper.text()).toBe('2 hours 21 minute');
    });

    it('should return 111 hours, when 111 hours given', () => {
        const wrapper = createHumanTime(111 * 60);

        expect(wrapper.text()).toBe('111 hours');
    });

    it('should return 0 minutes, when 0 minutes given', () => {
        const wrapper = createHumanTime(0);

        expect(wrapper.text()).toBe('0 minutes');
    });
});


