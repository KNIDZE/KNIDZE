

//MINE

function DataTable(config, data) {
  const tableElement = document.getElementById(config.parent.substring(1))
  let table = document.createElement("table")
  table.appendChild(createHead(config))
  table.appendChild(createBody(config, data))
  tableElement.appendChild(table)
}

function createHead(config) {
  let head = (document.createElement('thead'))
  for (let i = 0; i < config.columns.length; i++) {
    let block = document.createElement('th')
    block.innerHTML = config.columns[i].title
    head.appendChild(block)
  }
  return head
}

function createBody(config, data) {
  let body = document.createElement("tbody");
  for (let j = 0; j < data.length; j++) {
    let tr = document.createElement("tr")
    for (let i = 0; i < config.columns.length; i++) {
      let block = document.createElement("td")
      console.log()
      block.innerHTML = users[j][(config.columns[i].value)] || "error"
      tr.appendChild(block)
    }
    body.appendChild(tr)
  }

  return body
}
const config1 = {
  parent: '#usersTable',
  columns: [
    {title: 'Имя', value: 'name'},
    {title: 'Фамилия', value: 'surname'},
    {title: 'Возраст', value: 'age'},
  ]
};

const users = [
  {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
  {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},

];
DataTable(config1, users)

