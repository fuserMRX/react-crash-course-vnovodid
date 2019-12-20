import React from 'react';

import { render, fireEvent, waitForElement, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

import Profile from '../Profile';
import { Provider } from 'react-redux';
import store from '../store';

jest.mock('axios');

test('send request by pressing on the button', async () => {
    const { getByText, getByRole, queryAllByRole } = render(<Provider store={store}><Profile /></Provider>);

    axiosMock.get.mockResolvedValueOnce({
        data: {
            results: [{
                email: "jane.brun@example.com",
                picture: {
                    large: "https://randomuser.me/api/portraits/women/8.jpg"
                }
            }
            ]
        },
    });

    fireEvent.click(getByText('Send request to people api'));
    

    const emailText = await waitForElement(() => getByRole('heading'));
    expect(queryAllByRole('heading')[1]).toHaveTextContent('jane.brun@example.com');
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
});

test('send request by pressing on the button', async () => {
    const { getByText } = render(<Provider store={store}><Profile /></Provider>);

    axiosMock.get.mockRejectedValueOnce(new Error('Not Found'));

    fireEvent.click(getByText('Send request to people api'));

    const errorText = await waitForElement(() => getByText('Not Found'));
    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText('Send Request one more time')).toBeInTheDocument();
});
