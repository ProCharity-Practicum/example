import { Modal } from './Modal';
import {useRef} from "react";
import {fn} from "@storybook/test";

export default {
    title: 'UiKit/Modal',
    component: Modal,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onClose: fn()
    },
    render: (args) => {
        return <div id="modal" style={{width: "250px", height: "250px"}}>
            <Modal {...args}>
                <h1>Modal content</h1>
                {args.children}
            </Modal>
        </div>
    }
};

export const Default = {
    args: {
        children: <p>This is a modal</p>
    }
}
