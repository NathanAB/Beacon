import React from 'react';
import ReactGA from 'react-ga';
import { Icon } from '@material-ui/core';
import styles from './CommentButton.module.css';

import Modal from '../Modal/Modal';

export default function CommentButton() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const onClick = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Comment Button Clicked',
    });
    setModalOpen(true);
  };

  return (
    <>
      <button type="button" onClick={onClick} className={styles.container}>
        <Icon color="primary">comment</Icon>
      </button>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        title="Have something to contribute?"
      >
        <p>
          Comments are coming soon! In the meantime, we would love to gather your tips and
          suggestions at{' '}
          <ReactGA.OutboundLink
            className={styles.contactLink}
            to="mailto:contact@beacondates.com"
            target="_blank"
            rel="noopener noreferrer"
            eventLabel="Comment modal contact link"
          >
            contact@beacondates.com
          </ReactGA.OutboundLink>
        </p>
      </Modal>
    </>
  );
}
