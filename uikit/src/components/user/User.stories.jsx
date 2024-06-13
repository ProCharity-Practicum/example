import { User } from './User.jsx';
import { fn } from '@storybook/test';

export default {
    title: 'UiKit/User',
    component: User,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onLogin: fn(),
        onLogout: fn(),
        onCreateAccount: fn(),
    },
};

export const LoggedIn = {
    args: {
        user: 'Jane Doe',
    },
};

export const LoggedOut = {};
