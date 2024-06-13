import { RegisterForm } from "./RegisterForm.jsx";
import {fn} from "@storybook/test";

export default {
  title: 'Components/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered'
  },
  args: {
    onRegister: fn()
  }
}

export const Default = {

};
