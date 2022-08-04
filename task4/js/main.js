async function startTable(config, data) {
  if (data === undefined && config.hasOwnProperty('apiUrl')) {
    fetch("https://mock-api.shpp.me/mknidze/users").then(function (response) {
      return response.json()
    }).then((reqData) => {
      DataTable(config, reqData)
    })
  }
}

function DataTable(config, data) {

  const tableElement = document.getElementById(config.parent.substring(1))
  let table = document.createElement("table")
  table.appendChild(createHead(config))
  table.appendChild(createBody(config, data['data']))
  tableElement.appendChild(addingButton(config))
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
  console.log(data)
  let body = document.createElement("tbody");
  Object.keys(data).forEach((key) => {
    let tr = document.createElement("tr")
    for (let i = 0; i < config.columns.length; i++) {
      let block = document.createElement("td")
      block.innerHTML = data[key][(config.columns[i].value)] || config.columns[i].value
      if (new Date(block.innerHTML).getDate().toString() !== "NaN") {
        block.innerHTML = new Date(block.innerHTML).toDateString()
      }
      addActionButton(block, key)
      tr.appendChild(block)
    }
    body.appendChild(tr)
  })

  return body
}

function addActionButton(block, id) {
  if (block.innerHTML === 'actions') {
    block.innerHTML = ''
    let button = document.createElement('button');
    button.className = 'delete_button'
    button.innerHTML = 'delete'
    button.onclick = function () {
      deleteUser(id).then(function () {
        let table = document.getElementById('usersTable')
        table.removeChild(table.firstChild)
      }).then(()=>location.reload())

    }
    block.appendChild(button)
  }
}

async function deleteUser(id) {
  await fetch("https://mock-api.shpp.me/mknidze/users/" + id, {
    method: 'DELETE',
  })
}

function addingButton(config) {

  let button = document.createElement("button")
  button.innerHTML = "ADD"
  button.className = 'add'
  button.onclick = function () {
    if (document.getElementById('name') != null){
      alert("You can add user already")
      return 1
    }
    let table = document.getElementsByTagName("table")[0]
    let tr = document.createElement('tr')
    config.columns.forEach((value) => {
          let block = document.createElement("td")
          block.id = value.value;
          block.className = 'table_input';
          if (block.id !== 'actions') {
            block.contentEditable = 'true';
          }
          block.addEventListener('keydown', (key) => {
            if (key.code === "Enter") {
              key.preventDefault();
              addUser(config);
            }
          })
          tr.appendChild(block)
        }
    )
    table.tBodies[0].insertBefore(tr, table.tBodies[0].firstChild)
  }

  return button
}

function addUser(config) {
  let canPost = true;
  config.columns.forEach((value) => {
    let block = document.getElementById(value.value)
    if (block.innerHTML
        .length === 0 && block.id !== 'actions') {
      canPost = false
      block.style.backgroundColor = 'red'
      setNormalColor(block).then(() => console.log('normal color'))
    }
  })
  if (canPost) {
    let postUser = {}
    config.columns.forEach((value) => {
      let block = document.getElementById(value.value)
      if (value.value !== 'actions')

        postUser[value.value] = value.value !== 'birthday'? block.innerHTML: new Date(block.innerHTML).toJSON()
    })
    postData(postUser).then(()=>location.reload())
  }
}

async function setNormalColor(block) {
  setTimeout(() => {
    block.style.backgroundColor = 'initial';
  }, 2000)
}
async function postData(data){
  try {
    console.log(data)
    const response = await fetch("https://mock-api.shpp.me/mknidze/users", {
      method : "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json()
    console.log("DONE:", JSON.stringify(json))
  }catch (error){
    console.log("Error", error)
  }

}
const config1 = {
  parent: '#usersTable',
  columns: [{title: 'Имя', value: 'name'}, {title: 'Фамилия', value: 'surname'}, {
    title: "Аватарка",
    value: 'avatar'
  }, {title: "День рождения", value: 'birthday'}, {title: "Действия", value: 'actions'}],
  apiUrl: "https://mock-api.shpp.me/mknidze/users"
};

const users = [{id: 30050, name: 'Вася', surname: 'Петров', age: 12}, {
  id: 30051,
  name: 'Вася',
  surname: 'Васечкин',
  age: 15
},
];
startTable(config1);

