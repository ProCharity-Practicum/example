import './App.css'
import PropTypes from "prop-types";
import {Page} from "../page/Page.jsx";

export function AppContainer({ children, user }) {
  return (<Page user={user}>
      {children}
  </Page>)
}

AppContainer.propTypes = {
    children: PropTypes.node,
    user: PropTypes.node
};
