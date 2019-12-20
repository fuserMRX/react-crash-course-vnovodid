import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from '../Profile';
import { Provider } from 'react-redux';
import store from '../store';

describe('<Profile />', () => {
    it('should render and match snapshot', () => {
        const { container } = render(<Provider store={store}><Profile /></Provider>);

        expect(container).toMatchSnapshot();
    })
});