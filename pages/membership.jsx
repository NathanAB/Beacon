import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import moment from 'moment';

import { Box } from '@material-ui/core';
import Store from '../store';
import Button from '../components/Button/Button';
import Constants from '../constants';
import Spinner from '../components/Spinner/Spinner';

export default function MembershipPage() {
  const store = Store.useStore();
  const user = store.get('user');
  const isMember = store.get('isMember');
  const stripe = useStripe();

  if (!user) {
    return <Spinner />;
  }

  const { membershipEnd } = user.dataValues;

  const checkout = () => {
    fetch(Constants.API.MEMBERSHIP.CHECKOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'price_1IhhmgLpp6IcxFMhlCSl6cp1',
      }),
      credentials: 'include',
    }).then(async result => {
      const data = await result.json();
      stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    });
  };

  const manage = async () => {
    const res = await fetch(Constants.API.MEMBERSHIP.PORTAL, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  const render = () => {
    if (membershipEnd && isMember) {
      return (
        <>
          <h3>Your subscription is active.</h3>
          <br />
          <h4>Membership ends or renews on {moment(membershipEnd).format('MMMM Do YYYY')}.</h4>
          <br />
          <Button onClick={manage}>Manage Subscription</Button>
        </>
      );
    }
    if (membershipEnd && !isMember) {
      return (
        <>
          <h3>Your subscription ended.</h3>
          <br />
          <h4>Membership ended on {moment(membershipEnd).format('MMMM Do YYYY')}.</h4>
          <br />
          <Button onClick={manage}>Manage Subscription</Button>
        </>
      );
    }
    return (
      <>
        <h3>You are not subscribed.</h3>
        <br />
        <Button onClick={checkout}>Subscribe</Button>
      </>
    );
  };

  return (
    <>
      <Box
        maxWidth="1000px"
        margin="auto"
        paddingY="50px"
        display="flex"
        flexDirection="column"
        paddingX="20px"
        alignItems="center"
        textAlign="center"
      >
        {render()}
      </Box>
    </>
  );
}
