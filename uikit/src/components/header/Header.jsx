import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Header.module.scss';

export const Header = ({ user, className }) => (
  <header>
    <div className={clsx(styles.header, className)}>
      <div>
        <h1>ProCharity</h1>
      </div>
      <div>
          {user}
      </div>
    </div>
  </header>
);

Header.propTypes = {
    user: PropTypes.node,
    className: PropTypes.string,
};
