export const GA_TRACKING_ID = 'G-F60T133RWZ';

const hasGtag = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

export const pageview = (url) => {
  if (!hasGtag()) return;
  window.gtag('event', 'page_view', {
    page_path: url,
    page_location: window.location.href,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}) => {
  if (!hasGtag()) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
