const currentDate = document.querySelector(".current-date")
const dateTag = document.querySelector(".days")
const prevNextIcon = document.querySelectorAll(".icons span")

// getting new date, current month and year
let date = new Date()
let currYear = date.getFullYear()
let currMonth = date.getMonth()

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay() // getting the first day of month
    let lastDateOfMonth = new Date(currYear, currMonth+1, 0).getDate() // getting the last date of month
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay() // getting last day of month
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate() // getting last date of previous month

    let liTag = ""

    for(let i=firstDayOfMonth; i>0; i--){ // creating li of previous month last days
        liTag += `<li class = "inactive">${lastDateOfLastMonth - i + 1}</li>`
    }

    for (let i = 1; i <= lastDateOfMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month and year is matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && new Date().getFullYear() ? "active" : ""
        liTag += `<li class="${isToday}">${i}</li>`
    }

    for (let i = lastDayOfMonth; i < 6; i++){ // creating li of next month first days
        liTag += `<li class = "inactive">${i - lastDayOfMonth + 1}</li>`
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`
    dateTag.innerHTML = liTag
}
renderCalendar()

prevNextIcon.forEach((icon)=>{
    icon.addEventListener('click', () => { // adding click event on both icons
        // id clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1

        if(currMonth < 0 || currMonth > 11){
            date = new Date(currYear, currMonth)
            currYear = date.getFullYear() // updating current year with new date year
            currMonth = date.getMonth() // updating current month with new date month
        }
        else{ // else pass new date as date value
            date = new Date()
        }

        renderCalendar()
    })
})