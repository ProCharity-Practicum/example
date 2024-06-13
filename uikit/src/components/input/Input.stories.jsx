import { Input } from './Input.jsx';
import { fn } from '@storybook/test';
import {useEffect, useState} from "react";

export default {
    title: 'UiKit/Input',
    component: Input,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    args: {
        onChange: fn()
    },
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ["text", "integer", "float", "date", "time", "datetime", "email", "password", "tel", "url"]
            }
        }
    },
    render: (args) => {
        const [value, setValue] = useState(args.value);
        useEffect(() => setValue(args.value), [args.value]);
        return <Input {...args} value={value} onChange={v => {
            setValue(v);
            fn()(v);
        }} />;
    }
};

export const Default = {
    args: {
        value: "Hello"
    },
    argTypes: {
        step: { control: { disable: true } },
        min: { control: { disable: true } },
        max: { control: { disable: true } }
    }
};

export const Text = {
    args: {
        type: "text",
        value: `lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum.`
    },
    argTypes: {
        step: { control: { disable: true } },
        min: { control: { disable: true } },
        max: { control: { disable: true } }
    }
};

export const Integer = {
    args: {
        type: "integer",
        value: 42
    },
    argTypes: {
        value: { control: { type: 'number' } }
    }
};

export const Float = {
    args: {
        type: "float",
        value: 3.14
    },
    argTypes: {
        value: { control: { type: 'number' } }
    }
};

export const Range = {
    args: {
        type: "float",
        min: 0,
        max: 100,
        value: 50
    },
    argTypes: {
        value: { control: { type: 'number' } }
    }
};

export const OnlyDate = {
    args: {
        type: "date",
        value: new Date()
    },
    argTypes: {
        value: { control: { type: 'date' } },
        step: { control: { disable: true } },
        min: { control: { disable: true } },
        max: { control: { disable: true } }
    }
};

export const OnlyTime = {
    args: {
        type: "time",
        value: new Date()
    },
    argTypes: {
        value: { control: { type: 'date' } },
        step: { control: { disable: true } },
        min: { control: { disable: true } },
        max: { control: { disable: true } }
    }
};

export const DateTime = {
    args: {
        type: "datetime",
        value: new Date()
    },
    argTypes: {
        value: { control: { type: 'date' } }
    }
};

export const SingleSelect = {
    args: {
        type: "string",
        options: ["One", "Two", "Three"],
        value: "Two",
        multiple: false
    },
    argTypes: {
        value: { control: { type: 'select', options: ["One", "Two", "Three"] } },
        multiple: { control: { type: "boolean" } }
    }
};

export const MultipleSelect = {
    args: {
        type: "string",
        options: ["One", "Two", "Three"],
        value: ["One", "Two"],
        multiple: true
    },
    argTypes: {
        value: { control: { type: 'array' } },
        multiple: { control: { type: "boolean" } }
    }
};

export const Boolean = {
    args: {
        type: "boolean",
        value: true
    },
    argTypes: {
        value: { control: { type: 'boolean' } }
    }
};
