import {application} from '../application';
global.App = application;
application.runServer().then(({port, host}) => {
  // eslint-disable-next-line no-console
  console.log(`==> Listening on port ${port}. Open up http://${host}:${port}/ in your browser.`);
});
