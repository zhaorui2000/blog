import log from 'loglevel';
if (import.meta.env.MODE === 'development') {
  log.enableAll();
} else {
  log.disableAll();
}
export default log;
