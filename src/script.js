{
  let tasks = [];
  let hideTasks = false;

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      {
        ...tasks[index],
        done: !tasks[index].done,
      },
      ...tasks.slice(index + 1),
    ];

    render();
  };

  const toogleHideDoneTasks = () => {
    hideTasks = !hideTasks;
    render();
  };

  const allTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const removeTask = (index) => {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

    render();
  };

  const bindEvents = () => {
    const removeDoneTask = document.querySelectorAll(".js-removeTask");

    removeDoneTask.forEach((removeDoneTask, index) => {
      removeDoneTask.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButton = document.querySelectorAll(".js-done");

    toggleDoneButton.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", allTasksDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toogleHideDoneTasks"
    );

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toogleHideDoneTasks);
    }
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (tasks.length < 1) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
    
    <button class = "buttons__button js-toogleHideDoneTasks">

      ${hideTasks ? "Pokaz" : "Ukryj"} ukończone </button>

    <button class="buttons__button js-markAllDone" ${
      tasks.every(({ done }) => done) ? "disabled" : ""
    } > Ukończ wszystkie </button>

    `;
  };

  const renderTasks = () => {
    const taskToHTML = (task) => `

     <li class="list__item ${
       task.done && hideTasks ? "list__item--hidden" : ""
     } "
      >
      <button class="list__button list__button--buttonDone js-done" 
       ${task.done ? 'style="color: white"' : ""}>✓</button>
      <span class="taskContent"${
        task.done ? 'style="text-decoration: line-through"' : ""
      }>
      ${task.content}
      </span>
      <button class="list__button list__button--buttonRemove js-removeTask">🗑️</button>

      </li>`;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
    bindButtonsEvents();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");

    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent) {
      addNewTask(newTaskContent);
    }

    newTaskContent.value = "";
    newTaskContent.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
