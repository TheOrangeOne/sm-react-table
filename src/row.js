import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Cell from './cell';


export default class Row extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    selectionEnabled: PropTypes.bool,
    selectionColumnEnabled: PropTypes.bool,
    onSelectionChange: PropTypes.func
  }

  static defaultProps = {
    selectionEnabled: false  // selection is disabled by default
  };

  onClick = (e) => {
    const { selectionEnabled, selectionColumnEnabled } = this.props;

    if (selectionEnabled) {
      const { onSelectionChange, index, row } = this.props;

      // call the callback with the index, row and whether or
      // not the shift key has been pressed
      // note: to deal with osx I use ctrl OR meta to detect ctrl/meta
      onSelectionChange(index, row, e.shiftKey, e.ctrlKey || e.metaKey);
    }
  }

  onMouseDown = (e) => {
    if (e.shiftKey) {
      // don't select text if user performs a multi-row select using shift
      e.preventDefault();
    }
  }

  render() {
    const {
      row,
      height,
      width,
      index,
      columns,
      rowHeaderHeight,
      onClick,
      isSelected,
      selectionEnabled,
      selectionColumnEnabled
    } = this.props;

    let rowStyle = {
      height: height,
      width: width,
      left: '0px',
      top: index * height
    };

    let rowClasses = classNames(
      'smtable-row',
      {
        'smtable-row-selectable': selectionEnabled,
        'smtable-row-selected': isSelected
      }
    );

    return(
      <div className={rowClasses}
        style={rowStyle}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}>
        {selectionEnabled && selectionColumnEnabled ?
          <Cell
            data={isSelected ? '2' : 'ç'}
            width={50}
            renderer={
              (v, r) =>
                <span className='smf-icon smtable-check-icon smtable-unselectable'>
                  {v}
                </span>
            }/>
          : ''
        }
        {columns.map(
          (col, i) =>
            <Cell
              key={i}
              row={row}
              width={col.width}
              data={row[col.name]}
              renderer={col.render}/>
        )}
      </div>
    );
  }
}
