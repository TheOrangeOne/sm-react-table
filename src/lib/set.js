
/**
 * SMTableSet is a data structure useful for storing and accessing the selected
 * rows of a table efficiently
 *
 * add:    O(1)
 * delete: O(1)
 * has:    O(1)
 * keys:   O(1)
 * assuming javascript `delete` is O(1)
 */
export default class SMTableSet {
  constructor(set = {}, keys = [], size = 0) {
    this._set = set;
    this._keys = keys;
    this._size = size;
  }

  /**
   * Adds a key to the set
   * @param {any} key the key to be added to the set
   */
  add(key) {
    this._keys.push(key);
    this._set[key] = this._size;
    this._size++;
  }

  /**
   * Returns the size of the set
   * @returns {number} the number of elements in the set
   */
  get size() {
    return this._size;
  }

  /**
   * Returns the keys of the set as an array
   * @returns {Array} keys of the set in array form
   */
  keys() {
    return this._keys;
  }

  /**
   * Returns true if the set contains key `key` else return false
   * @param {any} key key to check
   * @returns {boolean} whether or not `key` is in the set
   */
  has(key) {
    return this._set.hasOwnProperty(key);
  }

  /**
   * Deletes a key from the set
   * @param {any} key key to delete
   */
  delete(key) {
    let index = this._set[key];
    delete this._set[key];

    this._keys[index] = this._keys[this._size - 1];
    this._keys.pop();
    this._size--;
  }
}
