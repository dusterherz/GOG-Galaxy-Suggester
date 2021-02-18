import React from "react";
import MultilineText from './MultilineText';
import { mount } from 'enzyme';

describe('MultilineText', () => {
    it('should show set text', () => {
        const wrapper = mount(<MultilineText text={'this is a test text.'}></MultilineText>);

        expect(wrapper.text()).toBe('this is a test text.')
    });

    it('should replace new line with <br>', () => {
        const wrapper = mount(<MultilineText text={'one\\ntwo'}></MultilineText>);

        const spans = wrapper.find('span');
        expect(spans.length).toBe(2);
        expect(spans.at(0).text()).toBe('one');
        expect(spans.at(1).text()).toBe('two');
    });
});
