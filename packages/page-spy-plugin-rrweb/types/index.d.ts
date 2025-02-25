import { PageSpyPlugin } from '@huolala-tech/page-spy-types';
import type { recordOptions } from 'rrweb/typings/types';
import type { eventWithTime } from '@rrweb/types';

interface Options extends recordOptions<eventWithTime> {}

declare class RRWebPlugin implements PageSpyPlugin {
  constructor(options?: Options);
}

export default RRWebPlugin;
