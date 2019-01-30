import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import CONSTANTS from '../../constants';
import './BottomNav.css';

const { TABS } = CONSTANTS;

const DEFAULT_INITIAL_TAB = TABS.DISCOVER;

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    'box-shadow': '0px 0px 20px 0px rgba(0,0,0,0.1)',
  },
};

class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: props.initialTab,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({
      currentTab: value,
    });
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { classes } = this.props;
    const { currentTab } = this.state;

    return (
      <BottomNavigation value={currentTab} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction label="Discover" value={TABS.DISCOVER} icon={<Icon>explore</Icon>} />
        {/* <BottomNavigationAction label="Planner" value={TABS.PLANNER} icon={<Icon>library_books</Icon>} /> */}
        <BottomNavigationAction label="My Dates" value={TABS.MY_DATES} icon={<Icon>favorite</Icon>} />
      </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  initialTab: PropTypes.string,
};

BottomNav.defaultProps = {
  initialTab: DEFAULT_INITIAL_TAB,
};

export default withStyles(styles)(BottomNav);
