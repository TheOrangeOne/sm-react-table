import React, { Component } from 'react'
import { SMTable } from 'sm-react-table'

class Example extends Component {
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

    return <SMTable rows={rows} columns={columns}/>;
  }
}
