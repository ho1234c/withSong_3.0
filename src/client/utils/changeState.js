export default function changeState(item, changedItemKey, update) {
  if(Object.prototype.hasOwnProperty.call(item, changedItemKey)) {
    return {
      ...item,
      [changedItemKey]: typeof update === 'function' ?
        item[changedItemKey].map(update) : update
    };
  }
  throw new Error(`${item} do not have ${changedItemKey}.`);
}
