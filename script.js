const calendar =
  document.getElementById("calendar");

const monthYear =
  document.getElementById("monthYear");

let currentDate = new Date();

let selectedDate = null;

let reminders = {};

function renderCalendar() {

  calendar.innerHTML = "";

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const firstDay =
    new Date(year, month, 1).getDay();

  const lastDate =
    new Date(year, month + 1, 0).getDate();

  monthYear.innerText =
    currentDate.toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric"
      }
    );

  for(let i = 0; i < firstDay; i++) {

    const empty =
      document.createElement("div");

    calendar.appendChild(empty);
  }

  for(let day = 1; day <= lastDate; day++) {

    const dayDiv =
      document.createElement("div");
const dateKey =
  `${year}-${month}-${day}`;

if(reminders[dateKey]) {

  dayDiv.innerHTML = `
  <span class="day-number">
    ${day}
  </span>

  <span class="dot"></span>
`;
  

} else {

  dayDiv.innerText = day;

}
    

    dayDiv.onclick = () => {

      selectedDate =
        `${year}-${month}-${day}`;
        document.getElementById(
        "selectedDateText"
         ).innerText =
         `Selected: ${day}`;

      if(reminders[selectedDate]) {

  alert(
    reminders[selectedDate]
  );

}
    };

    const today = new Date();

    if(
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    const dayOfWeek =
      new Date(year, month, day).getDay();

    if(dayOfWeek === 0) {
      dayDiv.classList.add("sunday");
    }

    calendar.appendChild(dayDiv);
  }
}

function prevMonth() {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderCalendar();
}

function nextMonth() {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderCalendar();
}

function saveReminder() {

  const input =
    document.getElementById(
      "reminderInput"
    );

  if(!selectedDate || !input.value)
    return;

  reminders[selectedDate] =
    input.value;

  alert("Reminder Saved!");
  renderCalendar();

  input.value = "";
}

