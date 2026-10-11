import { STYLE_IDS } from "../../domain/model/StyleId";
import type { StyleId } from "../../domain/model/StyleId";

let bag: StyleId[] = [];

function shuffled(): StyleId[] {
  const items = [...STYLE_IDS];
  for (let index = items.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1));
    [items[index], items[swap]] = [
      items[swap] as StyleId,
      items[index] as StyleId,
    ];
  }
  return items;
}

export function nextSurpriseStyle(current: StyleId): StyleId {
  if (bag.length === 0) bag = shuffled();
  if (bag[bag.length - 1] === current && bag.length > 1)
    bag.unshift(bag.pop() as StyleId);
  while (bag[bag.length - 1] === current) bag = shuffled();
  return bag.pop() as StyleId;
}
