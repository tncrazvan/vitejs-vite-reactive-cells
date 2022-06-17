import type { Writable } from 'svelte/store';

export type CellInfo<T> = {
  value: T;
  lastModified?: Date;
  style?: string;
};
