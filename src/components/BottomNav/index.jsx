import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import './BottomNav.css';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    'box-shadow': '0px 0px 20px 0px rgba(0,0,0,0.1)'
  },
};

class BottomNav extends React.Component {
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction label="Discover" value="discover" icon={<Icon>explore</Icon>} />
        <BottomNavigationAction label="My Dates" value="my-dates" icon={<Icon>favorite</Icon>} />
        <BottomNavigationAction label="Checkout" value="checkout" icon={<Icon>shopping_cart</Icon>} />
      </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);