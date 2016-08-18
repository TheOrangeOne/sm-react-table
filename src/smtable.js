import React, { Component, PropTypes } from 'react';
import HeaderRow from './header-row';
import Row from './row';
import { ContextMenu, MenuItem, ContextMenuLayer } from 'react-contextmenu';
import Menu, { MENU_ID } from './menu';
import SMTableSelection from './lib/selection'


let LOWER = 0;
let UPPER = 50;

export default class SMTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wrapperWidth: 500,
      width: 500
    };
  }

  static propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    selectionEnabled: PropTypes.bool,
    selected: PropTypes.object,
    selectionColumnEnabled: PropTypes.bool,
    onSelectionChange: PropTypes.func,
    menuEnabled: PropTypes.bool,
    menu: PropTypes.array
  }

  static defaultProps = {
    rowHeight: 40,
    rowHeaderHeight: 35,
    width: 500,
    height: 500,
    selectionEnabled: false,
    selected: new SMTableSelection(),
    selectionColumnEnabled: false,
    menuEnabled: false,
    menu: []
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.width !== this.state.width) {
      this.setState(nextState);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { selection, selectionEnabled, rows, columns } = nextProps;
    let width = columns
      .map((c) => c.width)
      .reduce((x, y) => x + y, 0);

    if (selectionEnabled) {
      selection.update(rows.length);
    }

    this.setState({
      ...this.state,
      width
    });
  }

  onSelectionChange = (rowIndex, row, shift, ctrl) => {
    this.props.selection.onSelectionEvent(rowIndex, shift, ctrl);
    this.setState(this.state);
    this.props.onSelectionChange();
  }

  onToggleSelectAll = () => {
    this.props.selection.toggleAllSelected();
    this.setState(this.state);
    this.props.onSelectionChange();
  }

  // need to sync the header wrapper scroll position with the scroll
  // position of the rows wrapper
  syncHeader = () => {
    this.headerWrapper.scrollLeft = this.rowsWrapper.scrollLeft;
  }

  rowRangeToRender = (scrollTop, rowHeight, wrapperHeight) => {
    let rowsPerView = (wrapperHeight / rowHeight);
    let num = Math.floor(scrollTop / wrapperHeight) * rowsPerView;
    let MYLOWER = Math.floor(Math.max(0, num - rowsPerView));
    let MYUPPER = Math.floor(num + 2.2 * rowsPerView);

    if (MYLOWER != LOWER || MYUPPER != UPPER) {
      LOWER = MYLOWER;
      UPPER = MYUPPER;
      this.setState(this.state);
    }
    console.log(UPPER - LOWER);
  }

  onScroll = (wrapperHeight) => {
    this.syncHeader();
    let scrollTop = this.rowsWrapper.scrollTop;
    let rowHeight = this.props.rowHeight;

    //this.rowRangeToRender(scrollTop, rowHeight, wrapperHeight);
  }

  get wrapperStyle() {
    return {
      height: this.props.height,
      width: '100%'
    }
  }

  render() {
    const {
      height,
      rows,
      columns,
      rowHeaderHeight,
      rowHeight,
      selectionEnabled,
      selection,
      selectionColumnEnabled
    } = this.props;

    let { width } = this.state;

    let wrapperWidth = this.wrapper ? this.wrapper.offsetWidth : 500;

    let wrapperHeight = this.wrapper ? this.wrapper.offsetHeight : 500;

    let wrapperStyle = {
      height: height,
      width: '100%'
    };

    let tableStyle = {
      height: rows.length * rowHeight + rowHeaderHeight,
      width: width,
      maxWidth: width
    };

    let headerRowWrapperStyle = {
      height: rowHeaderHeight,
      width: wrapperWidth,
      flex: '0 1 ' + rowHeaderHeight + 'px'
    };

    let rowsWrapperStyle = {
      height: height - rowHeaderHeight,
      width: wrapperWidth,
      marginTop: rowHeaderHeight // TODO this doesn't seem to work
    };

    let rowsStyle = {
      height: rows.length * rowHeight,
      width: width,
      maxWidth: width,
      pointerEvents: 'auto'
    };

    // TODO:  && Object.keys(this.state.selectedRows) == 0 ???
    const RowComponent = this.props.menuEnabled ? RowWithMenu : Row;

    //let myRows = rows.slice(LOWER, UPPER);

    return (
      <div className='smtable-wrapper'>
        <div className='smtable-table-wrapper'
          style={this.wrapperStyle}
          ref={x => this.wrapper = x}>
          <Menu items={this.props.menu}/>
          <div className='smtable-table' style={tableStyle}>
            <div className='smtable-header-row-wrapper'
              style={headerRowWrapperStyle}
              ref={x => this.headerWrapper = x}>
              <HeaderRow width={width}
                height={rowHeaderHeight}
                columns={columns}
                selectionEnabled={selectionEnabled}
                selectionColumnEnabled={selectionColumnEnabled}
                toggleAllSelected={this.onToggleSelectAll}
                allSelected={selectionEnabled && selection.allSelected()}/>
            </div>

            <div className='smtable-rows-wrapper'
              style={rowsWrapperStyle}
              onScroll={() => this.onScroll(wrapperHeight - rowHeaderHeight)}
              ref={x => this.rowsWrapper = x}>
              <div className='smtable-rows' style={rowsStyle}>
                {rows.map(
                  (row, i) =>
                    <RowComponent key={i} index={i+LOWER-LOWER}
                      height={rowHeight}
                      rowHeaderHeight={rowHeaderHeight}
                      width={width}
                      columns={columns}
                      row={row}
                      selectionEnabled={selectionEnabled}
                      selectionColumnEnabled={selectionColumnEnabled}
                      onSelectionChange={this.onSelectionChange}
                      isSelected={selectionEnabled &&
                        selection.isSelected(i+LOWER-LOWER)}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// target the context menu with the corresponding row
const RowWithMenu = ContextMenuLayer(MENU_ID, (props) => ({
  index: props.index
}))(Row);
