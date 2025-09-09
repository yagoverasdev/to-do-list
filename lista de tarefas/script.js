const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const clearTasksBtn = document.getElementById("clear-tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Função para renderizar tarefas
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    // Botão de remover
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", () => removeTask(index));

    // Clicar para marcar como concluído
    li.addEventListener("click", () => toggleTask(index));

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adicionar tarefa
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

// Alterna concluído
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Remove tarefa
function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Limpar todas as tarefas
clearTasksBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

// Renderiza tarefas ao carregar
renderTasks();