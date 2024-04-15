/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEventBus } from '@vueuse/core';

const EVENT_NAME = 'modal:toggle';

const bus = useEventBus<any>(EVENT_NAME);

export default function useModal() {
  function open(payload = {}) {
    bus.emit({ status: true, ...payload });
  }

  function close(payload = {}) {
    bus.emit({ status: false, ...payload });
  }

  function listen(fn: any) {
    bus.on(fn);
  }
  function off(fn: any) {
    bus.off(fn);
  }

  return {
    open,
    close,
    listen,
    off,
  };
}
