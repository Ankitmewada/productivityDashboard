function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var FullElemPage = document.querySelectorAll('.fullElem')
    var FullElemPageBackBtn = document.querySelectorAll('.fullElem .back')


    allElems.forEach(function(elem) {
        elem.addEventListener('click',function() {
            FullElemPage[elem.id].style.display = 'block'       
        }) 
    })

    FullElemPageBackBtn.forEach(function(back){
        back.addEventListener('click',function(){
            FullElemPage[back.id].style.display = 'none'
        })
    })
}

openFeatures()

                //todo list

function todoList(){
 
    var currentTask = []

    if(localStorage.getItem('currentTask')){
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }else{
        console.log("Task list is empty");
    }


    function renderTask() {
        let allTask = document.querySelector('.allTask')
        
        var sum = ''
        
        currentTask.forEach(function(elem,idx) {
            sum+= `<div class="task">
            <h5>${elem.task} <span ${elem.imp}>imp</span></h5>
            <button id=${idx}>Mark as Completed</button>
            </div>`
        })
        
        allTask.innerHTML = sum;

        localStorage.setItem('currentTask',JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function(btn){
            btn.addEventListener('click',function() {
                currentTask.splice(btn.id,1)
                renderTask()
                // location.reload()
            })
        })
}

renderTask()

let form = document.querySelector('.addTask form')
let taskInput = document.querySelector('.addTask form #task-input')
let taskDetailsInput = document.querySelector(".addTask form textarea")
let taskCheckbox = document.querySelector('.addTask form #check')

form.addEventListener('submit',function(e) {
    e.preventDefault()
    currentTask.push({
        task:taskInput.value,
        details:taskDetailsInput.value,
        imp:taskCheckbox.checked
    })   
    renderTask()
    //saved to localstorage
    taskInput.value = ''
    taskDetailsInput.value = ''
    taskCheckbox.checked = false
    //location.reload()
    
})

}
todoList()

                 // daily planner

function DailyPlanner() {
   
    let dayPlanner = document.querySelector('.day-planner')
    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({length:18},(elem,idx) =>
        `${6+idx}:00 - ${7+idx}:00`
    )

    var wholeDaySum = ''

    hours.forEach(function(elem,idx){
        var savedData = dayPlanData[idx] || ''
        wholeDaySum = wholeDaySum+ `<div class="day-planner-time">
                        <p>${elem}</p>
                        <input id=${idx} type="text" placeholder="..."
                        value=${savedData}>                  
                    </div>`
    })
    dayPlanner.innerHTML = wholeDaySum


    let dayPlannerInput = document.querySelectorAll('.day-planner-time input')

    dayPlannerInput.forEach(function(elem){
        elem.addEventListener('input',function(){
            dayPlanData[elem.id] =elem.value
            
            localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
        })
    })
}
DailyPlanner()

                //motivationalquote page

function motivationalquote(){
    let quoteContent = document.querySelector('.motivation-2 h1')
    let quoteAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let response =await fetch('https://dummyjson.com/quotes/random')
        let data = await response.json()
        
        quoteContent.innerHTML = data.quote
        quoteAuthor.innerHTML = data.author
    }

    fetchQuote()
}

motivationalquote()

              //pomodoro timer

function pomodoroTimer(){

        let timer = document.querySelector('.pomo-timer h1')
        let startBtn = document.querySelector('.pomo-timer .start')
        let pauseBtn = document.querySelector('.pomo-timer .pause')
        let resetBtn = document.querySelector('.pomo-timer .reset')
        let session = document.querySelector('.pomodoro-fullpage .session')

        let isWorkSession = true

        let timerInterval = null
        let totalSeconds = 25*60

        function pomoTimer() {
            let minutes = Math.floor(totalSeconds/60)
            let seconds = totalSeconds%60

            timer.innerHTML = `${String(minutes).padStart(2, "0")}: ${String(seconds).padStart('2','0')}`
        }

        function startTimer() {
            clearInterval(timerInterval)

            if(isWorkSession) {

                session.innerHTML = 'Work session'
                session.style.backgroundColor = 'green'
                timerInterval = setInterval( function(){
                    if(totalSeconds>0) {
                        totalSeconds--
                        pomoTimer()
                    }
                    else{
                        isWorkSession =false
                        clearInterval(timerInterval)
                        timer.innerHTML = '05:00'
                        session.innerHTML = 'Break'
                        session.style.backgroundColor = 'blue'
                        totalSeconds = 5*60         
                    }
                },1000)
            }
            else{
                
                
                timerInterval = setInterval( function(){
                    if(totalSeconds>0) {
                        totalSeconds--
                        pomoTimer()
                    }
                    else{
                        isWorkSession =true
                        clearInterval(timerInterval)
                        timer.innerHTML = '25:00'
                        totalSeconds = 25*60

                    }
                },1000)
            }

        }

        function stopTimer() {
            clearInterval(timerInterval)
        }

        function resetTimer() {
            session.innerHTML = 'Work session'
            session.style.backgroundColor = 'green'
            totalSeconds = 25*60
            clearInterval(timerInterval)
            pomoTimer()
        }

        startBtn.addEventListener('click',startTimer)
        pauseBtn.addEventListener('click',stopTimer)
        resetBtn.addEventListener('click', resetTimer)

}

pomodoroTimer()

             //Weather functionality

function weatherFunctionality() {
                 
    const apiKey="3b1f111ad992493f8ed104609252811"
    const city="Bhopal"

    let header1Time = document.querySelector('.header1 h1')
    let header1Date = document.querySelector('.header1 h2')

    let header2Temp = document.querySelector('.header2 h2')
    header2Humidity = document.querySelector('.header2 .Humidity')
    header2Wind = document.querySelector('.header2 .wind')
    header2Condition = document.querySelector('.header2 .condition')
    header2heatIndex = document.querySelector('.header2 .precip')

    async function weatherAPICall() {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)

        let data = await response.json();
        header2Temp.innerHTML = `${data.current.temp_c}°c`
        header2heatIndex.innerHTML = `Heat index: ${data.current.heatindex_c}%`
        header2Humidity.innerHTML = `humidity ${data.current.humidity}%`
        header2Wind.innerHTML = `Wind: ${data.current.wind_kph} km/hr`
        header2Condition.innerHTML = `${data.current.condition.text}`
    }
    weatherAPICall()

    function timeDate() {
        const totalDaysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const totalMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let date = new Date()

        let dayOfWeak = totalDaysOfWeek[date.getDay()]
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let currentDate = date.getDate()
        let currentMonth = totalMonths[date.getMonth()]
        let currentYear = date.getFullYear()

        header1Date.innerHTML = `${currentDate} ${currentMonth} ${currentYear}`

        if(hours>12) {
            header1Time.innerHTML = `${dayOfWeak}, ${String(hours-12).padStart('2','0')}:${String(minutes).padStart('2','0')} PM`

        }else{
            header1Time.innerHTML = `${dayOfWeak}, ${String(hours).padStart('2','0')}:${String(minutes).padStart('2','0')} AM`

        }
    }
    setInterval(() => {
        timeDate()
    },1000);
    }

weatherFunctionality()

            //changeTheme
 
function changeTheme() {
    let rootElement = document.documentElement

    let darkMode = document.querySelector('.nav-in .theme')
    let flag = 0
    darkMode.addEventListener('click',() => {
        if(flag===0){
            rootElement.style.setProperty('--pri', '#000')
            flag=1
            console.log(flag);
        }
        else if(flag===1){
            rootElement.style.setProperty('--pri','white')
            flag=0
            // rootElement.style.setProperty('--pri', '#000')
            console.log(flag);
        }
    })
}

changeTheme()