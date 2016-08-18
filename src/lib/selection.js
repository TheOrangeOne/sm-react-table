import SMTableSet from './set';

/**
 * TableSelection is a class that puts to use a @module:SMTableSet to
 * represent the selected rows of a table
 */
export default class TableSelection {
  constructor(selected = new SMTableSet(), numRows = 0, lastSelected = 0) {
    this._selected = selected;
    this._numRows = numRows;
    this._lastSelected = lastSelected;
  }

  /**
   * Returns whether or not a row is selected
   * @param {number} i index of the row
   * @returns {boolean} whether or not the row with index `i` is selected
   */
  isSelected(i) {
    return this._selected.has(i);
  }

  /**
   * Returns the size (number of selected rows) there are in the selection
   * @returns {number} number of selected rows in the selection
   */
  get size() {
    return this._selected.size;
  }

  /**
   * Sets the selected rows to be the SMTableSet given
   * @param {SMTableSet} selected Set to use
   */
  setSelected(selected) {
    delete this._selected;
    this._selected = new SMTableSet();

    selected.map(index => this.select(index));
    this._lastSelected = 0;
  }

  selected() {
    return this._selected.keys();
  }

  onSelectionEvent(index, shift, ctrl) {
    if (shift) {
      const low = Math.min(index, this._lastSelected);
      const high = Math.max(index, this._lastSelected);

      for (let i = low; i <= high; i++) {
        this.select(i);
      }
    }
    else if (ctrl) {
      this.toggle(index);
    }
    else {
      this.selectOnly(index);
    }

    this._lastSelected = index;
    return this;
  }

  select(index) {
    if (!this.isSelected(index)) {
      this._selected.add(index);
    }
  }

  selectOnly(index) {
    delete this._selected;
    this._selected = new SMTableSet();
    this.select(index);
  }

  deselectAll() {
    delete this._selected;
    this._selected = new SMTableSet();
  }

  // this is O(numRows) for now (fine for cases <<< 100000)
  selectAll() {
    for (let i = 0; i < this._numRows; i++) {
      this.select(i);
    }
  }

  toggle(index) {
    if (this.isSelected(index)) {
      this._selected.delete(index);
    } else {
      this._selected.add(index);
    }
  }

  update(numRows) {
    if (numRows < this._numRows) {
      let keys = this._selected.keys();
      keys.map(k => {
        if (k >= numRows) {
          this._selected.delete(k);
        }
      });
    }

    this._numRows = numRows;
    return this;
  }

  allSelected() {
    return this.size == this._numRows;
  }

  toggleAllSelected() {
    if (this.allSelected()) {
      this.deselectAll();
    }
    else {
      this.selectAll();
    }
  }
}
