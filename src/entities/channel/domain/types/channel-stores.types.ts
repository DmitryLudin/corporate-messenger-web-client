import { Channel } from '../models';

export type TSelfChannelsStore = { channels: Channel[] };

export type TChannelsStore = { channels: Channel[]; totalCount: number };

export type TSelectedChannelsStore = Record<Channel['name'], Channel>;
