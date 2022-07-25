// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitButton = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearButton = document.querySelector('.clear-btn')

// edit option
let editElement
let editFlag = false
let editID = ''

// ****** EVENT LISTENERS **********
//SUBMIT FORM
form.addEventListener('submit', addItem)
//CLEAR ITEMS
clearButton.addEventListener('click', clearItems)
//load items
window.addEventListener('DOMContentLoaded', setupItems)
// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault()
  //console.log(grocery.value)
  const value = grocery.value
  const id = new Date().getTime().toString()
  console.log(id)
  if (value && !editFlag) {
    createListItem(id, value)

    //display alert
    displayAlert('Item adicionado a lista', 'success')
    container.classList.add('show-container')
    //add to local storage
    addToLocalStorage(id, value)
    //set back to default
    setBackToDefault()
  } else if (value && editFlag) {
    editElement.innerHTML = value
    displayAlert('Item editado com sucesso', 'sucesso')
    //edit local storage
    editLocalStorage(editID, value)
    setBackToDefault()
  } else {
    displayAlert('Por favor digite algo', 'danger')
  }
}
//DISPLAY ALERT
function displayAlert(text, action) {
  alert.textContent = text
  alert.classList.add(`alert-${action}`)
  //REMOVE ALERT
  setTimeout(function () {
    alert.textContent = ''
    alert.classList.remove(`alert-${action}`)
  }, 2000)
}
//SET BACK TO DEFAULT
function setBackToDefault() {
  grocery.value = ''
  editFlag = false
  editID = ''
  submitButton.textContent = 'Adicionar'
}
//CLEAR ALL ITEMS
function clearItems() {
  const items = document.querySelectorAll('.grocery-item')
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item)
    })
  }
  container.classList.remove('show-container')
  displayAlert('Itens removidos com sucesso', 'success')
  setBackToDefault()
  localStorage.removeItem('list')
}

//DELETE ITEM
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement
  const id = element.dataset.id
  list.removeChild(element)

  if (list.children.length === 0) {
    container.classList.remove('show-container')
  }
  displayAlert('Item removido com sucesso', 'success')
  setBackToDefault()
  //remove from local storage
  removeFromLocalStorage(id)
}

//EDIT ITEM
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling
  //set form value
  grocery.value = editElement.innerHTML
  editFlag = true
  editID = element.dataset.id
  submitButton.textContent = 'Editar'
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value }
  let items = getLocalStorage()

  items.push(grocery)
  localStorage.setItem('list', JSON.stringify(items))
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage()
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item
    }
  })
  localStorage.setItem('list', JSON.stringify(items))
}
function editLocalStorage(id, value) {
  let items = getLocalStorage()
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value
    }
    return item
  })
  localStorage.setItem('list', JSON.stringify(items))
}
function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : []
}
// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage()
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value)
    })
    container.classList.add('show-container')
  }
}
function createListItem(id, value) {
  const element = document.createElement('article')
  // add class
  element.classList.add('grocery-item')
  //add id
  const attr = document.createAttribute('data-id')
  attr.value = id
  element.setAttributeNode(attr)
  element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`
  //delete event listener
  const deleteButton = element.querySelector('.delete-btn')
  deleteButton.addEventListener('click', deleteItem)
  //edit event listener
  const editButton = element.querySelector('.edit-btn')
  editButton.addEventListener('click', editItem)
  //append child
  list.appendChild(element)
}
