import React from 'react';
import PropTypes from 'prop-types';

import styles from './Contact.module.css';

const Contact = ({ name, number }) => {
  return (
    <div className={styles.contact}>
      <span>{name}</span>
      <span>{number}</span>
    </div>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;
