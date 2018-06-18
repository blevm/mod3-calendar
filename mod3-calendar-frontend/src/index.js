document.addEventListener("DOMContentLoaded", function(event) {

EVENTS_URL = "http://localhost:3000/api/v1/events"
calendarTable = document.getElementById('calendar-table')

function index () {
    fetch(EVENTS_URL).then(r=>r.json()).then(d=>appendToCal(d))
}

index()

function appendToCal(eventsObj) {
    eventsObj.forEach(event => {
        dateTd = document.querySelector(`td[data-day-id='${event.time.split('T')[0]}']`)
        dateTd.innerHTML += `<div>${event.title}<div>`
    });
}

calendarTable.addEventListener('click', e=>{
    if (e.target.tagName === "TD"){
        $('#exampleModal').modal('show')
    const date = e.target.dataset.dayId
    const eventForm = document.getElementById('add-event-form')
    eventForm.addEventListener('click', e=>{
        if (e.target.className === 'btn btn-primary') {
           eventTitle = document.getElementById('event-title')
           eventDescription =  document.getElementById('event-description')
           saveNewEvent(eventTitle.value, eventDescription.value, date)
        }
    })
    
    }
})


function saveNewEvent (eventTitle,eventDescription, eventDate) {
    config ={
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body:JSON.stringify({
            
        })
    }

    fetch(EVENTS_URL, config).then(r=>r.json()).then(console.log)
    debugger
}


});