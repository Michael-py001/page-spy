import { SocketStoreType } from './base';

export interface InitConfigBase {
  /**
   * The server base url. For example, "example.com".
   * - Create room: `https://${api}/room/create`
   * - Filter room: `https://${api}/room/list`
   * - Join WebSocket room: `wss://${api}/ws/room/join`
   */
  api?: string;
  /**
   * Project name, used for group connections
   */
  project?: string;
  /**
   * Custom title for displaying some data like user info to
   * help you to distinguish the client. The title value will
   * show in the room-list route page.
   */
  title?: string;
  /**
   * Specify the server <scheme> manually.
   * - false: sdk will use ['http://', 'ws://'];
   * - true: sdk will use ['https://', 'wss://'];
   * - null: sdk will automatically analyse the scheme by the
   *        'src' property value
   */
  enableSSL?: boolean | null;
}

export interface PageSpyBase {
  version: string;
  plugins: Record<string, PageSpyPlugin>;
  config: Required<InitConfigBase> | null;
  name: string;
  address: string;
  roomUrl: string;
}

interface OnInitParams<T extends InitConfigBase = InitConfigBase> {
  /**
   * Config info which has merged the user passed value.
   */
  config: Required<T>;
  /**
   * Wrap the origin websocket instance, plugin developers can
   * communicate with Web / API by it.
   */
  socketStore: SocketStoreType;
}

export interface OnMountedParams {
  // The root node which has `id="__pageSpy"` in DOM tree.
  root: HTMLDivElement;
  // The content node which has `class="page-spy-content"` inside modal.
  content: HTMLDivElement;
  // Wrap the origin socket instance, plugin developers can
  // communicate with Web / API by it.
  socketStore: SocketStoreType;
}

export abstract class PageSpyPlugin {
  name: string;

  /**
   * @description Called after "new PageSpy()".
   */
  public abstract onInit: (params: OnInitParams) => any;

  /**
   * @description Called after PageSpy render done (if there have).
   */
  public abstract onMounted?: (params: OnMountedParams) => any;

  /**
   * @description Called once user don't need to PageSpy,
   * plugins should reset to the origin function.
   */
  public abstract onReset?: () => any;
}

type ExtractLifeCycle<T> = {
  [K in keyof T]: K extends `on${string}` ? K : never;
}[keyof T];

export type PageSpyPluginLifecycle = NonNullable<
  ExtractLifeCycle<PageSpyPlugin>
>;
