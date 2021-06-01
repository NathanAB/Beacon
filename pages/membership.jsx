import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import moment from 'moment';

import Store from '../store';
import Button from '../components/Button/Button';
import Paper from '../components/Paper/Paper';
import BeaconTitle from '../components/BeaconTitle/BeaconTitle';
import Constants from '../constants';
import splash from '../assets/img/membership-splash.png';
import img1 from '../assets/img/membership-img-1.png';
import img2 from '../assets/img/membership-img-2.png';
import img3 from '../assets/img/membership-img-3.png';
import { useDesktop } from '../utils';

const MONTHLY_PRICE_ID = process.env.REACT_APP_STRIPE_MONTHLY_PRICE_ID;
const ANNUAL_PRICE_ID = process.env.REACT_APP_STRIPE_ANNUAL_PRICE_ID;

export default function MembershipPage() {
  const store = Store.useStore();
  const user = store.get('user');
  const hasAccess = store.get('hasAccess');
  const hasMembership = store.get('hasMembership');
  const stripe = useStripe();
  const isDesktop = useDesktop();

  const { membershipEnd } = user.dataValues || {};

  const checkout = PRICE_ID => () => {
    fetch(Constants.API.MEMBERSHIP.CHECKOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: PRICE_ID,
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

  if (hasMembership && hasAccess) {
    return (
      <div className="w-full max-w-5xl p-8 m-auto">
        <h3>Your subscription is active.</h3>
        <br />
        <h4>Membership ends or renews on {moment(membershipEnd).format('MMMM Do YYYY')}.</h4>
        <br />
        <Button onClick={manage}>Manage Subscription</Button>
      </div>
    );
  }
  if (hasMembership && !hasAccess) {
    return (
      <div className="w-full max-w-5xl p-8 m-auto">
        <h3>Your subscription ended.</h3>
        <br />
        <h4>Membership ended on {moment(membershipEnd).format('MMMM Do YYYY')}.</h4>
        <br />
        <Button onClick={manage}>Manage Subscription</Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={splash}
        className="left-0 right-0 z-0 w-full object-cover bg-right h-lg md:h-xl"
        alt="A couple walking"
        style={{
          filter: isDesktop ? 'brightness(0.7)' : 'brightness(0.5)',
          objectPosition: 'left',
        }}
      />
      <div className="top-20 md:top-48 right-0 md:right-28 absolute">
        <div className="z-10 max-w-lg px-8">
          <BeaconTitle className="text-white text-2xl" />
          <h2 className="text-white font-normal mt-8 text-3xl md:text-6xl leading-tight">
            We handle the planning so you can date more confidently
          </h2>
          <p className="font-bold text-white my-8">
            Unlimited access to the best date ideas in DC. $1.25 per week.
            <br />
            Or save with our annual offer.
          </p>
          <a href="#Options">
            <Button>Subscribe now</Button>
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl m-auto mt-16 px-8">
        <img src={img1} alt="" className="w-full max-w-lg" />
        <div className="w-full max-w-xl my-10">
          <h4 className="font-bold text-orange mb-3">Beacon makes dating in DC easier.</h4>
          <p>
            From outdoor adventures to romatic dinners, our dates can be used for any occasion. A
            steady flow of new ideas makes sure you’re always up to date.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse items-center justify-between max-w-6xl m-auto px-8">
        <img src={img2} alt="" className="w-full max-w-lg" />
        <div className="w-full max-w-xl my-10">
          <h4 className="font-bold text-orange mb-3">Everything you’ll need to impress. </h4>

          <p>
            Find dates by neighborhood and the vibe you’re going for. Each of our dates is loaded
            with unique tips, secret spots, and insider comments.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl m-auto my-8 px-8">
        <img src={img3} alt="" className="w-full max-w-lg" />
        <div className="w-full max-w-xl my-10">
          <h4 className="font-bold text-orange mb-3">Don’t settle for just one perspective.</h4>
          <p>
            Our dates are curated by the people who know best — DC locals. Our date writers have
            diverse backgrounds and experiences. We are proud to include ideas for everyone.
          </p>
        </div>
      </div>
      <hr />
      <div className="text-center mt-10 mb-12" id="Options">
        <h4>Subscribe to Beacon</h4>
        <Paper withShadow className="p-8 m-8 text-center w-80 inline-block">
          <h4 className="mb-4 font-bold">Monthly</h4>
          <h5 className="mb-3 font-normal">Only $1.25/week</h5>
          <p className="mb-5 text-gray-500">Billed as $5 per month</p>
          <Button onClick={checkout(MONTHLY_PRICE_ID)} fullWidth size={Button.SIZES.LARGE}>
            Get Monthly
          </Button>
        </Paper>
        <Paper withShadow className="p-8 m-8 text-center w-80 inline-block">
          <h4 className="mb-4 font-bold">Annual</h4>
          <h5 className="mb-3 font-normal">Only $40/year</h5>
          <p className="mb-5 text-gray-500">Billed as $40 annually</p>
          <Button onClick={checkout(ANNUAL_PRICE_ID)} fullWidth size={Button.SIZES.LARGE}>
            Get Annual
          </Button>
        </Paper>
      </div>
    </div>
  );
}
