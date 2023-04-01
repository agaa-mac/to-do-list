{
  const tasks = [];

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;
    render();
  };
  const removeTask = (index) => {
    tasks.splice(index, 1);
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
  const bindButtonsEvents = () => {};
  const renderButtons = () => {};
  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += ` <li class="list__item"
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
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const render = () => {
    renderTasks();
    bindEvents();
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }
    const resetContent = document.querySelector(".js-newTask");
    resetContent.value = "";
    addNewTask(newTaskContent);
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };
  init();
}
