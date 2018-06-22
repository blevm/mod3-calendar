document.addEventListener("DOMContentLoaded", function(event) {

let allTags = []
EVENTS_URL = "http://localhost:3000/api/v1/events"
USERS_URL ="http://localhost:3000/api/v1/users"
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
let currentUser
let gameInPlay = false 

function sayHello () {
  debugger
  alert('Hello')
}

logInForm.addEventListener('submit', function(event) {
  event.preventDefault();
    if (usernameInput.value === 'game') {
      game()
      gameInPlay = true
  }else {
  postingUsername(usernameInput.value)
  }
})

function postingUsername(user) {
  let config = {
    method: 'POST',
    headers: {'Content-type':'application/json'},
    body: JSON.stringify({username: user})
  }
  fetch('http://localhost:3000/api/v1/login', config).then(r=>r.json()).then(d=> {
    currentUser = d.id;
    logInForm.innerHTML = `<h1>Welcome ${d.username}</h1>`
    index(d.id)
  })
}


function index(userId) {
  fetch(`${USERS_URL}/${userId}/events`).then(r=>r.json()).then(d=>
    {
      const tags = d.map(e => e.tag)
      displayTagsOnHeader(getUniqueTags(tags))
      appendToCal(d)
    })
}


function getUniqueTags(array) {
  uniqueTags = []
  array.forEach(obj => {
    if (uniqueTags.find(item => item.id === obj.id) === undefined) {
      uniqueTags.push(obj)
    }
  })
  return uniqueTags
}


///////////TAG THINGS

// function loadTags() {
//   fetch(TAGS_URL).then(r=>r.json()).then(d=>displayTagsOnHeader(d))
// }

newTagForm.addEventListener('click', function(event) {
  event.preventDefault();
  postingATag(event.target.parentElement.querySelector('input').value, event.target.parentElement.querySelector('select').value)
})

tagSpan.addEventListener('click', function(event) {
  let affectedEvents = Array.from(document.querySelectorAll(`div[data-tag-id="${event.target.dataset.tagId}"]`))
  if (event.target.className === 'alert') {
    affectedEvents.forEach(function(e) {
      e.style.visibility = "visible";
    })
    event.target.className = event.target.dataset.tagClassName;
  } else {
    affectedEvents.forEach(function(e) {
      e.style.visibility = "hidden";
    })
    event.target.className = 'alert';
    }
})

function postingATag(tagName, className) {
  let config = {
    method: 'POST',
    headers: {'Content-type':'application/json'},
    body: JSON.stringify({name: tagName, class_name: className})
  }
  fetch(TAGS_URL, config).then(resp => resp.json()).then(displayOneTagOnHeader)
}

function displayTagsOnHeader(tags) {
  allTags = tags
  tags.forEach(tag => {
    tagSpan.innerHTML += `<span style="margin: 8px;"><span class="${tag.class_name}" data-tag-class-name="${tag.class_name}" data-tag-id="${tag.id}" style="padding: 10px;">${tag.name}<span></span>`
  })
}

function displayOneTagOnHeader(tag) {
    allTags.push(tag)
    tagSpan.innerHTML += `<span style="margin: 8px;"><span class="${tag.class_name}" data-tag-class-name="${tag.class_name}" data-tag-id="${tag.id}" style="padding: 10px;">${tag.name}<span></span>`
}





function deleteAnEvent(id) {
  let uniqueURL = `${EVENTS_URL}/${id}`
  fetch(uniqueURL, {method: "DELETE"})
}

function standardizeTimes(time) {
  time = time.split(':');

  let hours = Number(time[0]);
  let minutes = Number(time[1]);

  let standardTime;

  if (hours > 0 && hours <= 12) {
    standardTime = "" + hours;
  } else if (hours > 12) {
    standardTime = "" + (hours - 12);
  } else if (hours === 0) {
    standardTime = "12";
  }

  standardTime += (minutes < 10) ? ":0" + minutes : ":" + minutes;
  standardTime += (hours >= 12) ? " PM" : " AM";

  if (standardTime === "12:00 AM") {
    standardTime = "All day"
  }

  return standardTime;
}

function appendToCal(eventsObj) {
    eventsObj.forEach(event => {
        dateDiv = document.querySelector(`div[data-day-id='${event.time.split('T')[0]}']`)
        dateDiv.innerHTML += `<div draggable="true" ondragstart="dragstart_handler(event);" class="${event.tag.class_name}" data-tag-id="${event.tag.id}" data-event-id="${event.id}" data-event-title="${event.title}" data-event-description="${event.description}" data-event-time=${event.time}">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
          <span aria-hidden="true">&times;</span>
        </button><em>${standardizeTimes(event.time.split("T")[1])}</em><br>${event.title}</div>`
    });
}

function appendOneEventToCal(singleEvent) {
    dateDiv = document.querySelector(`div[data-day-id='${singleEvent.time.split('T')[0]}']`)
    dateDiv.innerHTML += `<div draggable="true" ondragstart="dragstart_handler(event);" class="${singleEvent.tag.class_name}" data-tag-id="${singleEvent.tag.id}" data-event-id="${singleEvent.id}" data-event-title="${singleEvent.title}" data-event-description="${singleEvent.description}" data-event-time=${singleEvent.time}">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button><em>${standardizeTimes(singleEvent.time.split("T")[1])}</em><br>${singleEvent.title}<div>`
}

function tagOptionsForANewEvent() {
  let returnValue = ''
  if (allTags.length === 0) {
    return `<span style="color:red;">Create a tag before creating an event!</span>`
  } else {
    allTags.map(function(tagObj) {
    returnValue += `<option value="${tagObj.id}">${tagObj.name}</option>`
    })
    return `<select id='new-event-tag'>${returnValue}</select>`
  }
}

calendarTable.addEventListener('click', e=>{
  // Game stuff
  if (e.target.tagName === "TD" && gameInPlay === true) {
    if (e.target.bgColor === "FF0000") {
      e.target.bgColor = "E6E6FA"
      return
    }
    if (e.target.bgColor === "") {
      alert("You Lose!!")
      location.reload();
     }

  }
  // Game stuff

  if (e.target.tagName === "SPAN" && gameInPlay === false){
    deleteAnEvent(e.target.parentElement.parentElement.dataset.eventId)
  } else if (e.target.tagName === "DIV" || e.target.parentElement.tagName === "DIV"  && gameInPlay === false) {
      if (e.target.tagName === "DIV") {
        modalDiv.innerHTML =
        `<div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="detailsModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="detailsModalLabel"><em>${standardizeTimes(e.target.dataset.eventTime.split("T")[1])}</em> |  ${e.target.dataset.eventTitle}</h5>
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
      } else {
        modalDiv.innerHTML =
        `<div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="detailsModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="detailsModalLabel"><em>${standardizeTimes(e.target.parentElement.dataset.eventTime.split("T")[1])}</em> |  ${e.target.parentElement.dataset.eventTitle}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ${e.target.parentElement.dataset.eventDescription}
              </div>
            </div>
          </div>
        </div>`
        $('#detailsModal').modal('show')
      }
    } else if (e.target.tagName === "TD" && e.target.innerText !== ""  && gameInPlay === false){
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
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">Event Time:</label>
                    <input type="time">
                  </div>
                  <div class-"form-group">Select a tag:
                    ${tagOptionsForANewEvent()}<br><br>
                  </div>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button id="new-event-form-button" type="button" class="btn btn-primary" ${disabled()}>Save changes</button>
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
           eventTime = e.target.parentElement.querySelector('input[type="time"]')
           eventTag = document.getElementById('new-event-tag')
           // debugger
           saveNewEvent(eventTitle.value, eventDescription.value, `${date} ${eventTime.value}` , eventTag.value)
           $('#exampleModal').modal('hide')
        }
    })
  }
})

function disabled() {
  if (allTags.length === 0) {
    return `disabled`
  }
}

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
            user_id: currentUser,
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
      <td style="width: 300px;" >${flatironEvent.title}</td>
      <td>${flatironEvent.description}</td>
      <td class="f-e-time">${flatironEvent.time.split('T')[0]}</td>
      <td>${flatironEvent.location}</td>
     </tr>
    `
});     //new Date(${flatironEvent.time}).toLocaleDateString()
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



// calendarTable.addEventListener('drag', ev => {
//   if (ev.target.tagName === "DIV") { 

//     debugger
    // ev.dataTransfer.setData("text", ev.target.dataset.eventId);
    // ev.dataTransfer.dropEffect = "move";

//    }
// })


// const calendarTableTD = calendarTable.getElementsByTagName('TD')

// calendarTableTD.addEventListener('ondragover', ev => {
//   ev.preventDefault();
//   ev.dataTransfer.dropEffect = "move"

// })



function dragstart_handler(ev) {
  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("text/plain", ev.target.dataset.eventId);
  ev.dropEffect = "move";
 }
 function dragover_handler(ev) {
  ev.preventDefault();
  // Set the dropEffect to move
  ev.dataTransfer.dropEffect = "move"
 }
 function drop_handler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
 }

// Game start

const coloredTd = []

 function game () {
  const tds = document.querySelectorAll('#calendar-table td')
    alert('Youve unlocked game mode\n Click the red boxes!')
    calendarTable.scrollIntoView()
   
    setInterval(function(){
    tdColoredArr1 = [...tds].filter(td=>td.bgColor === "")
    tdColoredArr2 = [...tds].map(td=> td.bgColor)
    if (tdColoredArr1.length === 0 && tdColoredArr2.includes('FF0000') === false ) {
      alert('You Win!!!!')
      location.reload();   
   }
    else if (tdColoredArr1.length === 0 && tdColoredArr2.includes('FF0000') === true ) {
      alert('You Lose!!!!')
      location.reload();
    } 
    setBackgroundColor()
   }, 500 );

  }




  function createRandomNumber () {
    let minimum21 = 0
    let maximum21 = 34
    let randomnumber = Math.floor(Math.random() * (maximum21 - minimum21 + 1)) + minimum21;
    if (coloredTd.includes(randomnumber)) {createRandomNumber() }
    else { coloredTd.push(randomnumber)  }
  }

  function setBackgroundColor(){
    createRandomNumber ()
    const randomNum = coloredTd[coloredTd.length-1]
  const td = document.querySelectorAll('#calendar-table td')
  
  td[`${randomNum}`].bgColor = 'FF0000'
  }

// Game end




// loadTags()

});
