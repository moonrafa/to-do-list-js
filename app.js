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
form.addEventListener('submit', addItem)
// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault()
  //console.log(grocery.value)
  const value = grocery.value
  const id = new Date().getTime().toString
  if (value && !editFlag) {
    console.log('add item to the list')
  } else if (value && editFlag) {
    console.log('editing')
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

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
