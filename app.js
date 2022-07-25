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
// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault()
  //console.log(grocery.value)
  const value = grocery.value
  const id = new Date().getTime().toString
  if (value && !editFlag) {
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
    //display alert
    displayAlert('item adicionado a lista', 'success')
    container.classList.add('show-container')
    //add to local storage
    addToLocalStorage(id, value)
    //set back to default
    setBackToDefault()
  } else if (value && editFlag) {
  } else {
    displayAlert('por favor digite algo', 'danger')
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
  displayAlert('itens deletados com sucesso', 'success')
  setBackToDefault()
  localStorage.removeItem('list')
}

//DELETE ITEM
function deleteItem(e) {
  const id = element.dataset.id
  const element = e.currentTarget.parentElement.parentElement
  list.removeChild(element)

  if (list.children.length === 0) {
    container.classList.remove('show-container')
  }
  displayAlert('item removido com sucesso', 'success')
  setBackToDefault()
  //remove from local storage
  removeFromLocalStorage(id)
}

//EDIT ITEM
function editItem() {}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  //console.log('added to local storage')
}
function removeFromLocalStorage(id) {}

// ****** SETUP ITEMS **********
