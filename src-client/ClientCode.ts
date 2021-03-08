/// <reference path="../lib/lib.d.ts" />
// Importing it directly will add export keyword which fail on Google Apps Script.

function showActiveRubricItems(rubricItems: RubricItem[]) {
  let listElement = document.getElementById('list-of-rubric-items') as HTMLUListElement
  listElement.innerHTML = ''
  for (let idx = 0; idx < rubricItems.length; idx++) {
    let item = document.createElement('li')
    item.setAttribute('data-rubric-item-id', rubricItems[idx].id)
    item.setAttribute('data-rubric-item-point', rubricItems[idx].points.toString())
    item.innerHTML = '<input type="checkbox" class="item-checkbox" value="" /> ' + rubricItems[idx].description + ' (' + rubricItems[idx].points + ')'
    listElement.append(item)
  }
  if (rubricItems.length == 0) {
    listElement.innerHTML = '<li>No item found</li>'
  }
}

function onNewItemFormSubmit() {
  let descriptionElem = document.getElementById('item-description') as HTMLInputElement
  let pointsElem = document.getElementById('item-points') as HTMLInputElement
  let idElem = document.getElementById('item-id') as HTMLInputElement

  const description: string = descriptionElem.value
  const points: number = parseFloat(pointsElem.value)
  const id: string = idElem.value

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
  for (let idx: number = 0; idx < listElement.children.length; idx++) {
    const item = listElement.children[idx] as HTMLLIElement
    const checkbox = item.children[0] as HTMLInputElement
    if (checkbox.checked) {
      text = text + '"' + item.getAttribute('data-rubric-item-id') + '", '
    }
  }
  text = text.slice(0, -2)
  text = text + ")"
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
