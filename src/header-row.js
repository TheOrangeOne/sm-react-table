import React, { Component, PropTypes } from 'react';
import className from 'classnames';
import HeaderCell from './header-cell';

export default class HeaderRow extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    columns: PropTypes.array,
    selectionEnabled: PropTypes.bool,
    selectionColumnEnabled: PropTypes.bool,
    toggleAllSelected: PropTypes.func,
    allSelected: PropTypes.bool
  }

  render() {
    const {
      height,
      width,
      columns,
      selectionEnabled,
      selectionColumnEnabled,
      toggleAllSelected,
      allSelected
    } = this.props;

    let headerRowStyle = {
      height: height,
      width: width,
      left: '0px',
      top: 0
    };

    let selectionHeaderCellStyles = className(
      'smf-icon', 'smtable-check-header-icon', 'smtable-unselectable'
    );

    return (
      <div className='smtable-header-row' style={headerRowStyle}>
        {selectionEnabled && selectionColumnEnabled ?
          <HeaderCell
            index={0}
            height={height}
            width={50}
            title={allSelected ? '2' : 'ç'}
            isFirstColumn={true}
            onClick={toggleAllSelected}
            lowercaseHeader={true}
            render={
              v =>
                <span className={selectionHeaderCellStyles}>
                  {v}
                </span>
            }/>
          : ''
        }
        {columns.map(
          (col, i) =>
            <HeaderCell
              key={i}
              isFirstColumn={!selectionEnabled && i == 0}
              isLastColumn={i == columns.length - 1}
              title={col.title}
              height={height}
              width={col.width}
              render={col.headerRender}
              lowerCaseHeader={col.lowerCaseHeader}
              onClick={col.onHeaderClick}/>
        )}
      </div>
    );
  }
}
