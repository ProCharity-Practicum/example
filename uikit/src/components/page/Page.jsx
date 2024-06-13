import PropTypes from 'prop-types';

import { Header } from '../header/Header.jsx';

export const Page = ({ children, user }) => {
  return (
    <article>
      <Header
        user={user}
      />

        {children}
    </article>
  );
};

Page.propTypes = {
    children: PropTypes.node,
    user: PropTypes.node
};
