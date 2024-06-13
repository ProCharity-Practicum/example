import { Form } from './Form';
import {fn} from "@storybook/test";
import {useEffect, useState} from "react";

export default {
    title: 'UiKit/Form',
    component: Form,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    args: {
        value: {},
        onChange: fn()
    },
    render: (args) => {
        const [value, setValue] = useState(args.value);
        useEffect(() => setValue(args.value), [args.value]);

        return <Form {...args} value={value} onChange={v => {
            setValue(v);
            fn()(v);
        }} />;
    }
};

export const Default = {
    args: {
        value: {
            name: 'John Doe',
            email: 'john@doe.com'
        },
        schema: {
            name: {type: 'string', label: 'Name'},
            email: {type: 'email', label: 'Email', hint: '@gmail.com' }
        }
    }
}

export const Horizontal = {
    args: {
        value: {
            name: 'John Doe',
            email: 'john@doe.com'
        },
        schema: {
            name: {type: 'string', label: 'Name'},
            email: {type: 'email', label: 'Email', hint: '@gmail.com' }
        },
        layout: 'horizontal'
    }
}
