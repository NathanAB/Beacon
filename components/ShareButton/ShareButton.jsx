import React, { useState } from 'react';
import Popover from 'react-popover';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactGA from 'react-ga';

import { createCalendarEvent } from '../../utils';
import Paper from '../Paper/Paper';
import Button from '../Button/Button';

import styles from './ShareButton.module.css';

export default function ShareButton({ dateObj, url }) {
  const event = createCalendarEvent(dateObj);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const copyEvent = () => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Copy Date Link',
      label: dateObj.name,
    });
    setHasCopied(true);
  };
  const togglePopover = newVal => {
    if (hasCopied) {
      setTimeout(() => setHasCopied(false), 500);
    }
    if (typeof newVal === 'boolean') {
      if (newVal) {
        ReactGA.event({
          category: 'Interaction',
          action: 'Open Share Modal',
          label: dateObj.name,
        });
      } else {
        ReactGA.event({
          category: 'Interaction',
          action: 'Close Share Modal',
          label: dateObj.name,
        });
      }
      setIsPopoverOpen(newVal);
    } else {
      if (!isPopoverOpen) {
        ReactGA.event({
          category: 'Interaction',
          action: 'Open Share Modal',
          label: dateObj.name,
        });
      } else {
        ReactGA.event({
          category: 'Interaction',
          action: 'Close Share Modal',
          label: dateObj.name,
        });
      }
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
    ReactGA.event({
      category: 'Interaction',
      action: 'Add Date to Calendar',
      label: dateObj.name,
    });
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
                <a onClick={() => copyEvent()}>Copy Link</a>
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
