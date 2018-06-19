document.addEventListener("DOMContentLoaded", function(event) {

EVENTS_URL = "http://localhost:3000/api/v1/events"
calendarTable = document.getElementById('calendar-table')
const modalDiv = document.getElementById('modal-container')
const logInForm = document.querySelector('form')
const usernameInput = document.querySelector('form input')


logInForm.addEventListener('submit', function(event) {
  event.preventDefault();
  postingUsername(usernameInput.value)
})

function postingUsername(user) {
  let config = {
    method: 'POST',
    headers: {'Content-type':'application/json'},
    body: JSON.stringify({username: user})
  }
  console.log(config)
  fetch('http://localhost:3000/api/v1/login', config)
}


function index() {
    fetch(EVENTS_URL).then(r=>r.json()).then(d=>appendToCal(d))
}

function appendToCal(eventsObj) {
    eventsObj.forEach(event => {
        dateDiv = document.querySelector(`div[data-day-id='${event.time.split('T')[0]}']`)
        dateDiv.innerHTML += `<div class="alert alert-success" data-event-id="${event.id}" data-event-description="${event.description}">${event.title}<div>`
    });
}

function appendOneEventToCal(singleEvent) {
    dateDiv = document.querySelector(`div[data-day-id='${singleEvent.time.split('T')[0]}']`)
    dateDiv.innerHTML += `<div class="alert alert-success" data-event-id="${event.id}" data-event-description="${event.description}">${singleEvent.title}<div>`
}

calendarTable.addEventListener('click', e=>{
    if (e.target.tagName === "DIV") {
      modalDiv.innerHTML =
      `<div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="detailsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="detailsModalLabel">${e.target.innerText}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ${e.target.dataset.eventDescription}
            </div>
          </div>
        </div>
      </div>`
      $('#detailsModal').modal('show')

    } else if (e.target.tagName === "TD"){
      modalDiv.innerHTML =
      `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create Event:</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="add-event-form">
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Event Title:</label>
                    <input type="text" class="form-control" id="event-title">
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">Event Description:</label>
                    <textarea class="form-control" id="event-description"></textarea>
                  </div>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button id="new-event-form-button" type="button" class="btn btn-primary">Save changes</button>
                </form>
            </div>
          </div>
        </div>
      </div>`

      $('#exampleModal').modal('show')
    const date = e.target.firstElementChild.dataset.dayId
    const eventForm = document.getElementById('add-event-form')
    eventForm.addEventListener('click', e=>{
        if (e.target.className === 'btn btn-primary') {
           eventTitle = document.getElementById('event-title')
           eventDescription =  document.getElementById('event-description')
           saveNewEvent(eventTitle.value, eventDescription.value, date)
           $('#exampleModal').modal('hide')
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
            title: eventTitle,
            description: eventDescription,
            time: eventDate,
            user_id: 1
        })
    }
    fetch(EVENTS_URL, config).then(resp => resp.json()).then(appendOneEventToCal)
}

index()

});
