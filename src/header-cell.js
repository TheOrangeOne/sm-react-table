import React, { Component, PropTypes } from 'react';
import className from 'classnames';

export default class HeaderCell extends Component {
  static defaultProps = {
    onClick: () => {},
    render: (v) => <b>{v}</b>,
    isFirstColumn: false,
    isLastColumn: false
  }

  render() {
    let {
      width,
      height,
      title,
      lowercaseHeader,
      isFirstColumn,
      isLastColumn,
      render,
      onClick
    } = this.props;

    let cellStyle = {
      height: height,
      paddingTop: height/2 + 1, // TODO: this should be able to be done via CSS
      border: '1px solid #fff',
      flex: '0 1 ' + width + 'px'
    };

    if (isFirstColumn) {
      cellStyle['borderLeft'] = 'none';
    }

    if (isLastColumn) {
      cellStyle['borderRight'] = 'none';
    }

    let classes = className(
      'smtable-header-row-cell',
      {
        'smtable-capitalize': !lowercaseHeader,
        'smtable-clickable': !!onClick
      }
    );

    return (
      <div className={classes} style={cellStyle} onClick={onClick}>
        {render(title)}
      </div>
    );
  }
}
