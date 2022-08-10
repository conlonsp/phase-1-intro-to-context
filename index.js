function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrays) {
  return arrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employee, timeSheet) {
  let [date, hour] = timeSheet.split(' ')
  let eventObj = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  }
  employee.timeInEvents.push(eventObj)
  return employee
}

function createTimeOutEvent(employee, timeSheet) {
  let [date, hour] = timeSheet.split(' ')
  let eventObj = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  }
  employee.timeOutEvents.push(eventObj)
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(e => e.date === date)
  let timeOut = employee.timeOutEvents.find(e => e.date === date)
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date)
  let pay = employee.payPerHour
  return hours * pay
}

function allWagesFor(employee) {
  let sum = 0
  for(let i = 0; i < employee.timeInEvents.length; i++) {
    let date = employee.timeInEvents[i].date
    var wages = wagesEarnedOnDate(employee, date)
    sum += wages
  }
  return sum
}

function calculatePayroll(employees) {
  let sum = 0
  employees.map(employee => {
    var wages = allWagesFor(employee)
    sum += wages
  })
  return sum
}

/////////////// I DID IT! I AM THE CHOSEN ONE! BEHOLD!!! ///////////////