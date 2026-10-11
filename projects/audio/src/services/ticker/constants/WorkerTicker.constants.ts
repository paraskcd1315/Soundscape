import { TRANSPORT_METRICS } from "@soundscape/engine/services/transport/constants/transport.constants";

export const WORKER_SOURCE = `
let timer = null;
onmessage = (message) => {
  if (message.data === 'start') {
    if (timer === null) timer = setInterval(() => postMessage(0), ${TRANSPORT_METRICS.tickMilliseconds});
  } else {
    clearInterval(timer);
    timer = null;
  }
};
`;
