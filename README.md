# sm-react-table

a surveymonkey react table component

![sm-react-table](/examples/screenshot.png)


## installing

```bash
$ npm install --save sm-react-table
```


## features

- selection (with selection column)
- context menu on rows
- custom column formatters (renderers)


## props
- `columns` an array of column objects
```javascript
// a column object
{
  name: "AGE",  // name/id of column
  title: "Age", // displayed text for column
  width: 160,   // width of the column
  render: (r) => <a href='/test'>r</a> // custom render function for the column
}
```
- `rows` an array of objects their keys corresponding to the names of the columns

```javascript
// a corresponding row object for the above column example
{
  "AGE": '50'
}
```

- `width` width of the table
- `height` height of the table
- `selectionEnabled` enable selection
- `selected` `SMTableSet` object to use to store the selected rows
- `selectionColumnEnabled` render the selection column
- `onSelectionChange` callback for when the selection changes
- `menuEnabled` enable the use of a menu for row click
- `menu` a menu to use

```javascript
// example menu (requires smlib-ui)
[
  {
    item: <span>
    <span className='smf-icon smtable-icon'>W</span>
    Edit
    </span>,
    action: CONTEXT_MENU_ACTIONS.EDIT,
    onClick: (e, data) => console.log(data)
  },
  {
    item: <span>
    <span className='smf-icon smtable-icon'>#</span>
    Delete
    </span>,
    action: CONTEXT_MENU_ACTIONS.DELETE,
    onClick: (e, data) => console.log(data)
  }
]
```


## usage

to use `sm-react-table` in your project (using ES6 imports)

```javascript
  import { SMTable } from 'sm-react-table'
  // ...
  <SMTable rows={...} columns={...}/>
```

## examples

### basic example

see [basic_example.js](/examples/basic_example.js)

### selection (with selection column)

see [selection_example.js](/examples/selection_example.js)


### in action

see a full-fledged instance of `sm-react-table` in the `responsestable` project
