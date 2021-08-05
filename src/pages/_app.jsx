import App from 'next/app';

import '@patternfly/react-core/dist/styles/base.css';
import '../styles.css';

// Populate initial props passed to the React application. Also serves as a middleware intercepting any incoming request.
App.getInitialProps = async (appctx) => {
  if (typeof window === 'undefined') {
    // Only server-side evals should result in prometheus imports. Client side imports doesn't make sense here.
    const metrics = require('../metrics'); // eslint-disable-line no-undef
    metrics.httpRequestsTotal.labels({ method: appctx.ctx.req.method, statusCode: appctx.ctx.res.statusCode, path: appctx.ctx.req.url }).inc();
  }
  return {};
};

export default App;

export function reportWebVitals({ id, name, label, value }) {
  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  });
}
