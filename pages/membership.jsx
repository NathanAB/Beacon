import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Store from '../store';
import UserDetails from '../scenes/UserDetails/UserDetails';
import Button from '../components/Button/Button';
import Constants from '../constants';

export default function MembershipPage() {
  const store = Store.useStore();
  const user = store.get('user');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    event.preventDefault();
  };

  return (
    <>
      <Button
        onClick={() => {
          fetch(Constants.API.MEMBERSHIP.CHECKOUT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              priceId: 'price_1IhhmgLpp6IcxFMhlCSl6cp1',
            }),
          }).then(async result => {
            const data = await result.json();
            console.log(data);
            stripe
              .redirectToCheckout({
                sessionId: data.sessionId,
              })
              .then(res => console.log(res));
          });
        }}
      >
        Subscribe
      </Button>
      <CardElement />
      <Button onClick={handleSubmit} disabled={!stripe}>
        Pay
      </Button>
    </>
  );
}
