
function showActiveRubricItems(rubricItems) {
  let listElement = document.getElementById('list-of-rubric-items') as HTMLUListElement
  listElement.innerHTML = ''
  for (let idx = 0; idx < rubricItems.length; idx++) {
    let item = document.createElement('li')
    item.setAttribute('data-rubric-item-id', rubricItems[idx][0])
    item.setAttribute('data-rubric-item-point', rubricItems[idx][3])
    item.innerHTML = '<input type="checkbox" class="item-checkbox" value="" /> ' + rubricItems[idx][2] + ' (' + rubricItems[idx][3] + ')'
    listElement.append(item)
  }
}

function onNewItemFormSubmit() {
  let descriptionElem = document.getElementById('item-description') as HTMLInputElement
  let pointsElem = document.getElementById('item-points') as HTMLInputElement
  let idElem = document.getElementById('item-id') as HTMLInputElement

  const description = descriptionElem.value
  const points = pointsElem.value
  const id = idElem.value

  google.script.run.withSuccessHandler(function() {
    console.log('Rubric item added')

    descriptionElem.value = ""
    pointsElem.value = ""
    idElem.value = ""

    google.script.run.withSuccessHandler(showActiveRubricItems).getActiveRubricItems()
  }).addRubricItem(id, description, points)
}

function onAddItems() {
  let listElement = document.getElementById('list-of-rubric-items') as HTMLUListElement
  let text = '=RUBRIC_ITEMS('
  console.log(listElement.children.length)
  console.log('before loop')
  for (var idx = 0; idx < listElement.children.length; idx++) {
    console.log(listElement.children[idx].children[0])
    const item = listElement.children[idx] as HTMLLIElement
    const checkbox = item.children[0] as HTMLInputElement
    if (checkbox.checked) {
      console.log('Checked')
      text = text + '"' + item.getAttribute('data-rubric-item-id') + '", '
    }
  }
  text = text.slice(0, -2)
  text = text + ")"
  console.log(text)
  google.script.run.withSuccessHandler(function() {
    console.log('Value should be set')
  }).setCellValue(text)
}

window.addEventListener('load', function() {
  let formElement = document.getElementById('new-rubric-item')
  formElement.addEventListener('submit', onNewItemFormSubmit)

  let addItemformElement = document.getElementById('add-items')
  addItemformElement.addEventListener('submit', onAddItems)

  google.script.run.withSuccessHandler(showActiveRubricItems).getActiveRubricItems()
})
