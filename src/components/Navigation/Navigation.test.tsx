import { mount } from 'enzyme';
import React from 'react';
import Navigation from './Navigation';
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';

describe('Navigation', () => {
    function createNavigation(onUploadDbClicked: any, onNextGameClicked: any, isNextGameDisabled: any) {
        return mount(<Navigation onUploadDbClicked={onUploadDbClicked} onNextGameClicked={onNextGameClicked} isNextGameDisabled={isNextGameDisabled ?? false} />);
    }

    it('should invoke onUploadDbClicked() when upload db icon is clicked', () => {
        const onUploadDbClicked = jest.fn()
        const wrapper = createNavigation(onUploadDbClicked, null, null);

        wrapper.find(FolderOpenTwoToneIcon).simulate('click');

        expect(onUploadDbClicked).toHaveBeenCalled();
    });

    it('should invoke onNextGameClicked() when next game icon is clicked', () => {
        const onNextGameClicked = jest.fn()
        const wrapper = createNavigation(null, onNextGameClicked, null);

        wrapper.find(RefreshTwoToneIcon).simulate('click');

        expect(onNextGameClicked).toHaveBeenCalled();
    });

    it('should not invoke onNextGameClicked() when next game icon is clicked and disabled', () => {
        const onNextGameClicked = jest.fn()
        const wrapper = createNavigation(null, onNextGameClicked, true);

        wrapper.find(RefreshTwoToneIcon).simulate('click');

        expect(onNextGameClicked).toHaveBeenCalledTimes(0);
    });
});