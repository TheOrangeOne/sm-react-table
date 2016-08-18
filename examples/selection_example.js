import React, { Component } from 'react'
import { SMTable, SMTableSelection } from 'sm-react-table'

// basic selection example

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: new SMTableSelection()
    }
  }

  handleSelection() {
    console.log(this.state.selection.selected())
  }

  render() {
    let columns = [
      { name: 'NAME', title: 'Name', width: 200 },
      { name: 'AGE', title: 'Age', width: 100 },
      { name: 'EMPLOYER', 'title': 'Employer', width: 100 }
    ]

    let rows = [
      { NAME: 'Eddard Stark', AGE: '36', EMPLOYER: 'Winterfell' },
      { NAME: 'Robert Baratheon', AGE: '36', EMPLOYER: 'Self-employed' }
    ]

    return
    <SMTable
    rows={rows}
    columns={columns}
    selectionEnabled={true}
    selection={this.state.selection}
    selectionColumnEnabled={true}
    onSelectionChange={this.handleSelection}/>;
  }
}
