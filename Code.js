function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Rubic')
      .addItem('Current items', 'showSidebar')
      .addToUi()
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Page')
        .evaluate()
        .setTitle('Current Rubric Items')
  SpreadsheetApp.getUi()
    .showSidebar(html)
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
        .getContent()
}

function getActiveRubricItems() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var rubricSheet = spreadsheet.getSheetByName('rubric')
  var rubricRange = rubricSheet.getDataRange()
  var rubricData = rubricRange.getValues()

  var sheet = SpreadsheetApp.getActiveSheet()
  var applicableRubricItems = []

  for (var i = 0; i < rubricData.length; i++) {
    if (rubricData[i][1] == sheet.getName()) {
      applicableRubricItems.push(rubricData[i])
    }
  }
  return applicableRubricItems
}

function setCellValue(text) {
  var range = SpreadsheetApp.getActiveRange()
  range.setValue(text)
  console.log(range)
  console.log(text)
}

function addRubricItem(id, description, points) {
  var activeSheet = SpreadsheetApp.getActiveSheet()
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var rubricSheet = spreadsheet.getSheetByName('rubric')

  var sheetName = activeSheet.getName()
  rubricSheet.appendRow([id, sheetName, description, points])
}

function RUBRIC_ITEMS() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var rubricSheet = spreadsheet.getSheetByName('rubric')
  var rubricRange = rubricSheet.getDataRange()
  var data = rubricRange.getValues()
  var text = ''

  var is_in_comment_state = false

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