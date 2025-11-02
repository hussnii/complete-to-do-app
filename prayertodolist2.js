// --- Welcome Prompt ---
const username = window.prompt("ASSEALMUALEYKUM WEREHMETULUAHI WEBEREKATUHU PLEASE ENTER YOUR NAME:");
alert(`Welcome to this simple prayer to-do list website ${username}!`);

let fardselatTasks = [
  { id: 1, name: "Fajr", completed: false },
  { id: 2, name: "Dhuhr", completed: true },
  { id: 3, name: "Asr", completed: false },
  { id: 4, name: "Magrib", completed: true },
  { id: 5, name: "Isha", completed: false }
];

let sunnahselatTasks = [
  { id: 1, name: "Fajr sunnah", completed: true },
  { id: 2, name: "Dhuhr sunnah", completed: false },
  { id: 3, name: "Asr sunnah", completed: true },
  { id: 4, name: "Maghrib sunnah", completed: false },
  { id: 5, name: "Isha sunnah", completed: true }
];

let zikirTasks = [
  { id: 1, name: "morning zikir", completed: false },
  { id: 2, name: "evening zikir", completed: true },
  { id: 3, name: "after praying zikir", completed: false },
  { id: 4, name: "special zikir", completed: true },
  { id: 5, name: "Isha", completed: false }
];

let ramadanTasks = [
  { id: 1, name: "Fasting", completed: false },
  { id: 2, name: "Read Qur'an today", completed: true },
  { id: 3, name: "Giving charity", completed: true },
  { id: 4, name: "Tarawih prayer", completed: false },
  { id: 5, name: "Dua", completed: true }
];


const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("tasklists");
const allBtn = document.getElementById("alltasks");
const completedBtn = document.getElementById("completedtasks");
const pendingBtn = document.getElementById("pendindtasks");
const clearBtn = document.getElementById("deletetasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function showTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.done) return;
    if (filter === "pending" && task.done) return;

    const li = document.createElement("li");
    li.className = task.done ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      showTasks(filter);
    };

    const span = document.createElement("span");
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      showTasks(filter);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return alert("Please enter a task!");
  tasks.push({ text, done: false });
  input.value = "";
  saveTasks();
  showTasks();
});

allBtn.addEventListener("click", () => showTasks("all"));
completedBtn.addEventListener("click", () => showTasks("completed"));
pendingBtn.addEventListener("click", () => showTasks("pending"));
clearBtn.addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveTasks();
    showTasks();
  }
});
const prayerCheckboxes = [
  { id: "fajir", textId: "prayertext1", doneText: "✅ Fajr completed!", undoneText: "💭 Don’t miss Fajr!" },
  { id: "dhuhr", textId: "prayertext2", doneText: "☀️ Dhuhr completed!", undoneText: "💼 Don’t miss Dhuhr!" },
  { id: "asr", textId: "prayertext3", doneText: "🌇 Asr completed!", undoneText: "🕒 Don’t miss Asr!" },
  { id: "maghrib", textId: "prayertext4", doneText: "🌄 Maghrib completed!", undoneText: "🌅 Don’t miss Maghrib!" },
  { id: "isha", textId: "prayertext5", doneText: "🌙 Isha completed!", undoneText: "🌌 Don’t miss Isha!" }
];

prayerCheckboxes.forEach(({ id, textId, doneText, undoneText }) => {
  const checkbox = document.getElementById(id);
  const textElem = document.getElementById(textId);
  const saved = JSON.parse(localStorage.getItem(id)) || false;
  checkbox.checked = saved;
  textElem.textContent = saved ? doneText : undoneText;

  checkbox.addEventListener("change", () => {
    localStorage.setItem(id, checkbox.checked);
    textElem.textContent = checkbox.checked ? doneText : undoneText;
  });
});
function setupCounter(counterId, increaseId, decreaseId, resetId) {
  let count = parseInt(localStorage.getItem(counterId)) || 0;
  const counterElem = document.getElementById(counterId);
  const incBtn = document.getElementById(increaseId);
  const decBtn = document.getElementById(decreaseId);
  const resBtn = document.getElementById(resetId);

  counterElem.textContent = count;

  incBtn.onclick = () => { count++; counterElem.textContent = count; localStorage.setItem(counterId, count); };
  decBtn.onclick = () => { count--; counterElem.textContent = count; localStorage.setItem(counterId, count); };
  resBtn.onclick = () => { count = 0; counterElem.textContent = count; localStorage.setItem(counterId, count); };
}

setupCounter("counter", "increase", "decrease", "reset");
setupCounter("tecounter", "teincrease", "tedecrease", "tereset");
showTasks();
