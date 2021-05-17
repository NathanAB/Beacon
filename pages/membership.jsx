import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import moment from 'moment';

import Store from '../store';
import Button from '../components/Button/Button';
import Paper from '../components/Paper/Paper';
import BeaconTitle from '../components/BeaconTitle/BeaconTitle';
import Constants from '../constants';
import Spinner from '../components/Spinner/Spinner';
import splash from '../assets/img/membership-splash.png';
import img1 from '../assets/img/membership-img-1.png';
import img2 from '../assets/img/membership-img-2.png';
import img3 from '../assets/img/membership-img-3.png';

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
    <div className="relative">
      <img
        src={splash}
        className="left-0 right-0 z-0 w-full object-cover h-screen"
        alt="A couple walking"
        style={{ filter: 'brightness(0.7)' }}
      />
      <div className="top-64 right-0 md:right-28 absolute">
        <div className="z-10 max-w-lg px-8">
          <BeaconTitle className="text-white text-2xl" />
          <h2 className="text-white font-normal mt-8 text-4xl md:text-6xl leading-tight">
            We handle the planning so you can date more confidently
          </h2>
          <p className="font-bold text-white my-8">
            Unlimited access to the best date ideas in DC. $1.25 per week.
            <br />
            Or save with our annual offer.
          </p>
          <Button className>Subscribe now</Button>
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
      <div className="text-center mt-10 mb-12">
        <h4>Subscribe to Beacon</h4>
        <Paper withShadow className="p-8 m-8 text-center w-80 inline-block">
          <h4 className="mb-4 font-bold">Monthly</h4>
          <h5 className="mb-3 font-normal">Only $1.25/week</h5>
          <p className="mb-5 text-gray-500">Billed as $5 per month</p>
          <Button fullWidth size={Button.SIZES.LARGE}>
            Get Monthly
          </Button>
        </Paper>
        <Paper withShadow className="p-8 m-8 text-center w-80 inline-block">
          <h4 className="mb-4 font-bold">Annual</h4>
          <h5 className="mb-3 font-normal">
            Only $50/year <span className="text-red-600">(-17%)</span>
          </h5>
          <p className="mb-5 text-gray-500">Billed as $50 annually</p>
          <Button fullWidth size={Button.SIZES.LARGE}>
            Get Annual
          </Button>
        </Paper>
      </div>
    </div>
  );
}
