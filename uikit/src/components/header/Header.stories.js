import { Header } from './Header.jsx';

export default {
  title: 'UiKit/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
};

export const Default = {
  args: {
    user: "John Doe",
  },
};
