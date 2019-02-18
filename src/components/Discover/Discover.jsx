import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  List,
  Checkbox,
  ListItemText,
  ListItem,
} from '@material-ui/core';

import DateObjs from '../../mocks/dates';
import Tags from '../../mocks/tags';
import DateCard from '../DateCard/DateCard';
import DateCardContainer from '../DateCardContainer/DateCardContainer';

const styles = {
  filtersContainer: {
    margin: '15px 0px',
  },
  filtersButton: {
    margin: 'auto',
  },
  filtersText: {
    'vertical-align': 'middle',
  },
  filtersBody: {
    display: 'block',
  },
  tagCheck: {
    padding: '0px',
  },
};

function Discover({ onAddDate, classes }) {
  const [tagFilters, setTagFilters] = useState([]);
  const dateComponents = DateObjs
    .filter((date) => {
      if (!tagFilters.length) {
        return true;
      }

      return date.spots.find(spot => (
        spot.tags.find(tag => tagFilters.indexOf(tag) > -1)
      ));
    })
    .map(date => (<DateCard onClickAdd={onAddDate} dateObj={date} />));

  const handleToggle = value => () => {
    const currentIndex = tagFilters.indexOf(value);
    const newTagFilters = [...tagFilters];

    if (currentIndex === -1) {
      newTagFilters.push(value);
    } else {
      newTagFilters.splice(currentIndex, 1);
    }

    setTagFilters(newTagFilters);
  };

  return (
    <React.Fragment>
      <ExpansionPanel color="primary" className={classes.filtersContainer}>
        <ExpansionPanelSummary className={classes.filtersButtonContainer}>
          <Typography variant="button" color="primary" align="center" className={classes.filtersButton}>
            <span className={classes.filtersText}>Filters</span>
            {' '}
            <Icon color="primary" className={classes.filtersText}>filter_list</Icon>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.filtersBody}>
          <Typography variant="overline">Tags:</Typography>
          <List className={classes.root}>
            {
                Tags.map(tag => (
                  <ListItem
                    key={tag}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(tag)}
                    className={classes.tagCheck}
                  >
                    <Checkbox
                      checked={tagFilters.indexOf(tag) !== -1}
                      checkedIcon={<Icon>check_box</Icon>}
                      disableRipple
                      color="primary"
                    />
                    <ListItemText primary={tag} />
                  </ListItem>
                ))
              }
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      { dateComponents.length
        ? <DateCardContainer tagFilters={tagFilters}>{ dateComponents }</DateCardContainer>
        : <Typography variant="h6" align="center">No date plans meet your criteria :(</Typography>
      }
    </React.Fragment>
  );
}

Discover.propTypes = {
  onAddDate: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

Discover.defaultProps = {
  onAddDate: () => {},
};

export default withStyles(styles)(Discover);
