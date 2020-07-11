import React, { useState } from 'react';
import Popover from 'react-popover';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Paper from '../Paper/Paper';
import Button from '../Button/Button';

import styles from './ShareButton.module.css';

export default function ShareButton({ event, url }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const togglePopover = newVal => {
    if (hasCopied) {
      setHasCopied(false);
    }
    if (typeof newVal !== 'undefined') {
      setIsPopoverOpen(newVal);
    } else {
      setIsPopoverOpen(!isPopoverOpen);
    }
  };
  // const ShareLinkButton = ({ onClick }) => <a onClick={onClick}>Share</a>;
  // const ShareMenu = ({ children }) => (
  //   <div className={styles.popoutOuter}>
  //     <Paper withShadow>
  //       <div className={styles.popoutInner}>
  //         {children}
  //         <p>or</p>
  //         <CopyToClipboard text={url}>
  //           <Button size={Button.SIZES.SMALL}>Copy Link</Button>
  //         </CopyToClipboard>
  //       </div>
  //     </Paper>
  //   </div>
  // );

  // const AddToCalendarDropdown = AddToCalendar(ShareLinkButton, ShareMenu);

  // return <AddToCalendarDropdown items={[SHARE_SITES.GOOGLE]} event={event} />;

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${event.startDateTime}/${event.endDateTime}&location=${event.location}&text=${event.title}&details=${event.description}`;

  const openCalendarEvent = () => {
    window.open(calendarUrl, '_blank');
  };

  const popoverProps = {
    isOpen: isPopoverOpen,
    preferPlace: 'below',
    // place: this.state.place,
    onOuterAction: () => togglePopover(false),
    body: [
      <Paper withShadow>
        <div className={styles.popoutInner}>
          <Button onClick={openCalendarEvent}>Add to Google Calendar</Button>
          <div className={styles.copyButton}>
            {hasCopied ? (
              <h6>Copied!</h6>
            ) : (
              <CopyToClipboard text={url}>
                <a onClick={() => setHasCopied(true)}>Copy Link</a>
              </CopyToClipboard>
            )}
          </div>
        </div>
      </Paper>,
    ],
  };

  return (
    <Popover {...popoverProps}>
      <a onClick={togglePopover}>Share</a>
    </Popover>
  );
}
