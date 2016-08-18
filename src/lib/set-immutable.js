/*
 * add:     O(1)
 * delete:  O(1)
 * has:     O(1)
 * getKeys: O(1)
 */
export default class AwesomeSet {
  constructor(set = {}, keys = [], size = 0) {
    this._set = set;
    this._keys = keys;
    this._size = size;
  }

  add(set, key) {
    let size = set._size;

    let keys = [ ...set._keys, key ];

    let _set = {
      ...set._set,
      [key]: set._size
    };

    return new AwesomeSet(_set, keys, size++);
  }

  get size() {
    return this._size;
  }

  static keys(set) {
    return set._keys.slice(0, set._size);
  }

  has(set, key) {
    return set._keys.hasOwnProperty(key);
  }

  delete(set, key) {
    let index = set._set[key];
    let size = set._size;

    let keys = [
      ...set._keys.slice(0, index),
      ...set._keys.slice(index + 1)
    ];

    delete set._set[key];

    let _set = {
      ...set._set
    };

    return new AwesomeSet(_set, keys, size--);
  }
}
