
function createEmployeeRecord(array){

    let person = []
    person.firstName = array[0]
    person.familyName = array[1]
    person.title = array[2]
    person.payPerHour = array[3]
    person.timeInEvents = []
    person.timeOutEvents = []
    return person
}

function createEmployeeRecords(array){
 return array.map(nameCard=>createEmployeeRecord(nameCard))
}

function createTimeInEvent(person, timeIn){
    let newEvent = {}
    
    newEvent.type = 'TimeIn'
    newEvent.date = timeIn.split(' ')[0]
    newEvent.hour = parseInt(timeIn.split(' ')[1],10)
    person.timeInEvents.push(newEvent)
    return person

}

function createTimeOutEvent(person, timeOut){
    let newEvent = {}
    
    newEvent.type = 'TimeOut'
    newEvent.date = timeOut.split(' ')[0]
    newEvent.hour = parseInt(timeOut.split(' ')[1],10)
    person.timeOutEvents.push(newEvent)
    return person

}


function hoursWorkedOnDate(name, date){
 //take name of employee and date, return the hours worked
    //make an array of all clock ins on target date and fill it
    let clockIns = []
    name.timeInEvents.map(element=> {if (element.date === date){clockIns.push(element.hour)}})


    //make an array of all clock outs on target date and fill it
   
    let clockOuts = []
    name.timeOutEvents.map(element=> {if (element.date === date){clockOuts.push(element.hour)}})


    let hoursWorked = 0

    for (let i = 0 ; i < clockIns.length ; i++){
        hoursWorked = (hoursWorked + (clockOuts[i]-clockIns[i]))/100
    }

    return hoursWorked
}

function wagesEarnedOnDate(name, date){
    return name.payPerHour * hoursWorkedOnDate(name,date)
}

function allWagesFor(name){
    //create an array of unique dates the employee worked
    let allDates = []
    name.timeInEvents.map(event=>{if ( ! (event.date in allDates))  {allDates.push(event.date) }} )
    

    let totalPay = allDates.reduce(
        (prev, cur) => prev + wagesEarnedOnDate(name,cur), 0
    )

    return totalPay
    
}

//takes an array of employees and returns the sum of allwages for all the employees together
function calculatePayroll(employeeArray){
    
   return employeeArray.reduce(
        (prev,cur) => prev + allWagesFor(cur),0
    )
 
}




////////////////////to test with//////////
const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]

  let employeeRecords = createEmployeeRecords(csvDataEmployees)

  employeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
      return rec.firstName === row[0]
    })

    let timesOutRecordRow = csvTimesOut.find(function (row) {
      return rec.firstName === row[0]
    })

    timesInRecordRow[1].forEach(function(timeInStamp){
      createTimeInEvent(rec, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
      createTimeOutEvent(rec, timeOutStamp)
    })
  })

  
      let twoRows = [
        ["moe", "sizlak", "barkeep", 2],
        ["bartholomew", "simpson", "scamp", 3]
      ]

  console.log(` testEmployee = ${twoRows}   `)