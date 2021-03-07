
function onOpen() {
  let ui = SpreadsheetApp.getUi()
  ui.createMenu('Rubic')
      .addItem('Current items', 'showSidebar')
      .addToUi()
}

function showSidebar() {
  let html = HtmlService.createTemplateFromFile('Page')
        .evaluate()
        .setTitle('Current Rubric Items')
  SpreadsheetApp.getUi()
    .showSidebar(html)
}

function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename)
        .getContent()
}

function getActiveRubricItems() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let rubricSheet = spreadsheet.getSheetByName('rubric')
  let rubricRange = rubricSheet.getDataRange()
  let rubricData = rubricRange.getValues()

  let sheet = SpreadsheetApp.getActiveSheet()
  let applicableRubricItems = []

  for (let i: number = 0; i < rubricData.length; i++) {
    if (rubricData[i][1] == sheet.getName()) {
      applicableRubricItems.push(rubricData[i])
    }
  }
  return applicableRubricItems
}

function setCellValue(text: string) {
  let range = SpreadsheetApp.getActiveRange()
  range.setValue(text)
  console.log(range)
  console.log(text)
}

function addRubricItem(id: string, description: string, points: string) {
  let activeSheet = SpreadsheetApp.getActiveSheet()
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let rubricSheet = spreadsheet.getSheetByName('rubric')

  let sheetName = activeSheet.getName()
  rubricSheet.appendRow([id, sheetName, description, points])
}

function RUBRIC_ITEMS() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let rubricSheet = spreadsheet.getSheetByName('rubric')
  let rubricRange = rubricSheet.getDataRange()
  let data = rubricRange.getValues()
  let text = ''

  let is_in_comment_state = false

  for (var arg_idx = 0; arg_idx < arguments.length; arg_idx++) {
    if (is_in_comment_state) {
      text = text + "- " + arguments[arg_idx] + "\n"
    } else {
      for (var i = 1; i < data.length; i++) {
        if (arguments[arg_idx] == 'comment') {
          is_in_comment_state = true
        } else if (arguments[arg_idx] == data[i][0]) {
          text = text + "- " + data[i][2] + " (" + data[i][3].toString() + ")\n"
        }
      }
    }
  }
  return text
}
