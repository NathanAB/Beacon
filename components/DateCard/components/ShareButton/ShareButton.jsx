import React, { useState } from 'react';
import AddToCalendar, { SHARE_SITES } from 'react-add-to-calendar-hoc';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Paper from '../../../Paper/Paper';
import Button from '../../../Button/Button';

import styles from './ShareButton.module.css';

export default function ShareButton({ event, url }) {
  const ShareLinkButton = ({ onClick }) => <a onClick={onClick}>Share</a>;
  const ShareMenu = ({ children }) => (
    <div className={styles.popoutOuter}>
      <Paper withShadow>
        <div className={styles.popoutInner}>
          {children}
          <p>or</p>
          <CopyToClipboard text={url}>
            <Button size={Button.SIZES.SMALL}>Copy Link</Button>
          </CopyToClipboard>
        </div>
      </Paper>
    </div>
  );

  const AddToCalendarDropdown = AddToCalendar(ShareLinkButton, ShareMenu);

  return <AddToCalendarDropdown items={[SHARE_SITES.GOOGLE]} event={event} />;
}
