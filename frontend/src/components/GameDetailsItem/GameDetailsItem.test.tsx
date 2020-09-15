import React from "react";
import GameDetailsItem from "./GameDetailsItem";
import { mount } from "enzyme";

describe('GameDetailsItem', () => {
    it('should display title and text', () => {
        const wrapper = mount(<GameDetailsItem title='Year' text='1999' />);

        expect(wrapper.text()).toBe('Year: 1999');
    });
});