document.addEventListener("DOMContentLoaded", function(event) {

let allTags = ''
EVENTS_URL = "http://localhost:3000/api/v1/events"
FLATIRONEVENTS_URL = "http://localhost:3000/api/v1/flatiron_events"  
TAGS_URL = "http://localhost:3000/api/v1/tags"
const calendarTable = document.getElementById('calendar-table')
const modalDiv = document.getElementById('modal-container')
const logInForm = document.getElementById('new-user-form')
const usernameInput = document.querySelector('form input')
const flatironEventsContainer = document.getElementById('flatiron-events-container')
const flatironEventstable = document.getElementById('flatiron-events-table')
const addFlatironEvent = document.getElementById('add-flatiron-events')
const eventTimeHeader = document.getElementById('event-time-header')

const newTagForm = document.getElementById('new-tag-form')
const tagSpan = document.getElementById('tags-go-here')
console.log(newTagForm)


// logInForm.addEventListener('submit', function(event) {
//   event.preventDefault();
//   postingUsername(usernameInput.value)
// })

newTagForm.addEventListener('click', function(event) {
  event.preventDefault();
  postingATag(event.target.parentElement.querySelector('input').value, event.target.parentElement.querySelector('select').value)
})

tagSpan.addEventListener('click', function(event) {
  debugger
  console.log(document.querySelectorAll('div.`${event.target.className}`'))

})

function postingATag(tagName, className) {
  let config = {
    method: 'POST',
    headers: {'Content-type':'application/json'},
    body: JSON.stringify({name: tagName, class_name: className})
  }
  fetch(TAGS_URL, config).then(resp => resp.json()).then(displayOneTagOnHeader)
}

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

function loadTags() {
  fetch(TAGS_URL).then(r=>r.json()).then(d=>displayTagsOnHeader(d))
}

function displayTagsOnHeader(tags) {
  allTags = tags
  tags.forEach(tag => {
    tagSpan.innerHTML += `<span style="margin: 8px;"><span class="${tag.class_name}" data-tag-id="${tag.id}" style="padding: 10px;">${tag.name}<span></span>`
  })
}

function displayOneTagOnHeader(tag) {
    tagSpan.innerHTML += `<span style="margin: 8px;"><span class="${tag.class_name}" data-tag-id="${tag.id}" style="padding: 10px;">${tag.name}<span></span>`
}

function deleteAnEvent(id) {
  let uniqueURL = `${EVENTS_URL}/${id}`
  console.log(uniqueURL)
  fetch(uniqueURL, {method: "DELETE"})
}

function appendToCal(eventsObj) {
    eventsObj.forEach(event => {
        dateDiv = document.querySelector(`div[data-day-id='${event.time.split('T')[0]}']`)
        dateDiv.innerHTML += `<div class="${event.tag.class_name}" data-event-id="${event.id}" data-event-title="${event.title}" data-event-description="${event.description}">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
          <span aria-hidden="true">&times;</span>
        </button>${event.title}<div>`
    });
}

function appendOneEventToCal(singleEvent) {
    dateDiv = document.querySelector(`div[data-day-id='${singleEvent.time.split('T')[0]}']`)
    dateDiv.innerHTML += `<div class="${singleEvent.tag.class_name}" data-event-id="${singleEvent.id}" data-event-title="${singleEvent.title}" data-event-description="${singleEvent.description}">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>${singleEvent.title}<div>`
}

function tagOptionsForANewEvent() {
  let returnValue = ''
  allTags.map(function(tagObj) {
    returnValue += `<option value="${tagObj.id}">${tagObj.name}</option>`
  })
  return returnValue
}

calendarTable.addEventListener('click', e=>{
  console.log(e.target)
  if (e.target.tagName === "SPAN"){
    deleteAnEvent(e.target.parentElement.parentElement.dataset.eventId)
  } else if (e.target.tagName === "DIV") {
      modalDiv.innerHTML =
      `<div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="detailsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="detailsModalLabel">${e.target.dataset.eventTitle}</h5>
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
                  <div class-"form-group">Select a tag:
                  <select id='new-event-tag'>
                    ${tagOptionsForANewEvent()}
                  </select><br><br>
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
           eventTag = document.getElementById('new-event-tag')
           saveNewEvent(eventTitle.value, eventDescription.value, date, eventTag.value)
           $('#exampleModal').modal('hide')
        }
    })
  }
})


function saveNewEvent (eventTitle, eventDescription, eventDate, tagId) {
    config ={
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body:JSON.stringify({
            title: eventTitle,
            description: eventDescription,
            time: eventDate,
            user_id: 1,
            tag_id: tagId
        })
    }
    fetch(EVENTS_URL, config).then(resp => resp.json()).then(appendOneEventToCal)
}


function getFlatironEventsFromServer(){
  fetch(FLATIRONEVENTS_URL).then(r=>r.json()).then(appendFlatironEventsToRows)
}
getFlatironEventsFromServer()

function appendFlatironEventsToRows(flatironEventsObjs) {
  flatironEventsObjs.forEach(flatironEvent => {
    tableBody = document.getElementById('flatiron-events-table-body')
    tableBody.innerHTML += 
    `
     <tr>
      <td><input type="checkbox" data-flatiron-event-id="${flatironEvent.id}" ></td> 
      <td>${flatironEvent.title}</td>
      <td>${flatironEvent.description}</td>
      <td class="f-e-time">${flatironEvent.time.split('T')[0]}</td>
      <td>${flatironEvent.location}</td>
     </tr> 
    `
});
}

flatironEventstable.addEventListener('click', function(event) {

  if (event.target.innerText === 'ADD')  { 
    const allChecked = document.querySelectorAll('input:checked')
      if (allChecked.length === 0 ) {
        alert("Please Select At Least One Event To Add")
      } else if (allChecked.length > 0 ) {
        allChecked.forEach(checkBox => {
          const row = checkBox.parentElement.parentElement
          saveNewEvent (row.children[1].innerText, row.children[2].innerText, row.children[3].innerText, 3)
        });
      }
  }

  if (event.target.innerText === 'Event Time') {
    sorter(3)
  }

  if (event.target.innerText === 'Event Location') {
    sorter(4)
  }

})

function sorter (tdToSort) {
  table = document.getElementById('flatiron-events-table')
  // allRows = table.getElementsByTagName('TR')
  // allTimes = table.querySelectorAll('.f-e-time')

   // Start Paste
  switchcount = 0
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[`${tdToSort}`];
      y = rows[i + 1].getElementsByTagName("TD")[`${tdToSort}`];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  // End Paste
}

eventTimeHeader.addEventListener('click', function(event) {
  
})


index()
loadTags()

});
