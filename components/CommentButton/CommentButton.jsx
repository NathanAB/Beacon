import React from 'react';
import ReactGA from 'react-ga';
import { Icon } from '@material-ui/core';
import Popover from 'react-popover';
import styles from './CommentButton.module.css';

import Paper from '../Paper/Paper';

export default function CommentButton() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const onClick = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Comment Button Clicked',
    });
    setModalOpen(true);
  };

  const popoverProps = {
    isOpen: isModalOpen,
    preferPlace: 'below',
    // place: this.state.place,
    onOuterAction: () => setModalOpen(false),
    body: [
      <Paper withShadow>
        <div className={styles.popoutInner}>
          <h6>Have something to contribute?</h6>
          <br />
          <p>
            Comments are coming soon! In the meantime, we would love to hear your tips and
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
        </div>
      </Paper>,
    ],
  };

  return (
    <>
      <Popover {...popoverProps}>
        <button type="button" onClick={onClick} className={styles.button}>
          <Icon color="primary">comment</Icon>
        </button>
      </Popover>
    </>
  );
}
