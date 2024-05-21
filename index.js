const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

const createEmployeeRecords = (records) => {
  const recordsArray = []
  records.map(record => {
    recordsArray.push(createEmployeeRecord(record))
  })
  return recordsArray
}

const createTimeInEvent = (employeeRecord, event) => {
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: event.slice(0,10),
    hour: parseInt(event.slice(-4))
  })
  return employeeRecord
}

const createTimeOutEvent = (employeeRecord, event) => {
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: event.slice(0,10),
    hour: parseInt(event.slice(-4))
  })
  return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, date) => {
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour
  return (timeOut - timeIn ) / 100
}

const wagesEarnedOnDate = (employeeRecord, date) => {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  return hoursWorked * employeeRecord.payPerHour
}

const allWagesFor = (employeeRecord) => {
  const allDatesArray = employeeRecord.timeInEvents.map(event => event.date)
  const allWagesArray = allDatesArray.map(date => wagesEarnedOnDate(employeeRecord,date))
  return allWagesArray.reduce((acc,amount) => acc + amount)
}

const calculatePayroll = (employeeRecords) => {
  const allWagesOwed = employeeRecords.map(record => allWagesFor(record))
  return allWagesOwed.reduce((acc, amount) => acc + amount)
}
