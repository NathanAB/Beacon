import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Icon, IconButton, Typography, CircularProgress } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

import { useDesktop } from '../../../utils';
import DateCardPreview from '../../../components/DateCardPreview/DateCardPreview';
import Store from '../../../store';
import Constants from '../../../constants';

const styles = () => ({
  container: {
    margin: '12px 0',
  },
  loadingContainer: {
    textAlign: 'center',
  },
  titleBar: {
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    paddingLeft: '20px',
    fontWeight: 600,
  },
});

function DatesRow({ classes }) {
  const store = Store.useStore();
  const dateObjs = store.get('dates');
  const isDesktop = useDesktop();
  const router = useRouter();

  const dateCards = dateObjs.map(date => {
    return (
      <div key={date.id}>
        <div className={classes.dateContainer}>
          <DateCardPreview dateObj={date} noExpand />
        </div>
      </div>
    );
  });

  return (
    <section className={classes.container}>
      <div className={classes.titleBar}>
        <Typography variant="h6" className={classes.title}>
          Discover Dates
        </Typography>
      </div>
      {dateObjs.length ? (
        <ScrollMenu
          inertiaScrolling
          data={dateCards}
          wheel={false}
          alignOnResize={false}
          translate={20}
          itemStyle={{
            paddingRight: '20px',
          }}
          arrowLeft={
            isDesktop && (
              <IconButton>
                <Icon>chevron_left</Icon>
              </IconButton>
            )
          }
          arrowRight={
            isDesktop && (
              <IconButton>
                <Icon>chevron_right</Icon>
              </IconButton>
            )
          }
          onSelect={dateId => {
            ReactGA.event({
              category: 'Interaction',
              action: 'Focus Date',
              label: dateId.toString(),
            });
            store.set('focusedDate')(dateId);
            router.push(Constants.PAGES.SEARCH);
          }}
        />
      ) : (
        <Box className={classes.loadingContainer}>
          <CircularProgress />
        </Box>
      )}
    </section>
  );
}

export default withStyles(styles)(DatesRow);
