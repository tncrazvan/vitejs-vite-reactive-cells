import { writable } from 'svelte/store';
import type { CellInfo } from '@types';

let $cells = {} as Record<
  string,
  Record<number, Record<number, CellInfo<unknown>>>
>;

const cells = writable($cells);

cells.subscribe((v) => ($cells = v));

export function setCell<T>(
  tabName: string,
  x: number,
  y: number,
  value: CellInfo<T>
): void {
  if (!($cells[tabName] ?? false)) $cells[tabName] = {};

  if (!($cells[tabName][x] ?? false)) $cells[tabName][x] = {};

  $cells[tabName][x][y] = value;
}

export function update() {
  cells.set($cells);
}

export function getStore() {
  return cells;
}

export function findAll() {
  return $cells;
}

export function findByTabName(tabName: string) {
  return $cells[tabName] ?? false;
}

export function findByTabNameAndPosition<T>(
  tabName: string,
  x: number,
  y: number
): CellInfo<T> | false {
  return ($cells[tabName][x][y] ?? false) as CellInfo<T> | false;
}
