import React, { Component, PropTypes } from 'react';
import { ContextMenu, MenuItem, connect } from 'react-contextmenu';


export const MENU_ID = "row-context-menu";

class Menu extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      item: PropTypes.any,
      action: PropTypes.string,
      onClick: PropTypes.func
    }))
  }

  render() {
    return (
      <ContextMenu identifier={MENU_ID}>
        {this.props.items.map((item, i) => {
           return (
             <MenuItem key={i}
               data={{action: item.action}}
               onClick={item.onClick}>
               {item.item}
             </MenuItem>
           );
         })
        }
      </ContextMenu>
    );
  }
}

export default connect(Menu);
