import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const { NODE_ENV } = process.env;

const REACT_APP_GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-F60T133RWZ';

if (NODE_ENV === 'production' && REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(REACT_APP_GA_TRACKING_ID, {
    gaOptions: {
      debug_mode: false
    }
  });
}

const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (NODE_ENV === 'production' && REACT_APP_GA_TRACKING_ID) {
      ReactGA.send({ 
        hitType: 'pageview',
        page: pathname,
      });
    }
  }, [pathname]);

  return null;
};

export default Analytics;
