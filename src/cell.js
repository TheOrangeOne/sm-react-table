import React, { Component, PropTypes } from 'react';

export default class Cell extends Component {
  static defaultProps = {
    row: {},
    data: '',
    renderer: (v, r) => v
  }

  render() {
    let {
      row,
      data,
      renderer,
      width
    } = this.props;

    let cellStyle = {
      flex: '0 1 ' + width + 'px'
    };

    return (
      <div className='smtable-cell' style={cellStyle}>
        {renderer(data, row)}
      </div>
    );
  }
}
