import React from 'react';
import ReactModal from 'react-modal';
import { Icon } from '@material-ui/core';
import styles from './Modal.module.css';

const customStyles = {
  overlay: {
    zIndex: 3,
  },
  content: {
    maxWidth: '500px',
    width: '90%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 20000,
  },
};

export default function Modal({ isOpen, closeModal, children, title }) {
  return (
    <ReactModal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={styles.titleRow}>
        <h5>{title}</h5>
        <button type="button" onClick={closeModal} className={styles.closeButton}>
          <Icon>close</Icon>
        </button>
      </div>
      {children}
    </ReactModal>
  );
}
