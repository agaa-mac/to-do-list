{
  const tasks = [
    {
      content: "zrobić notatki",
      done: false,
    },
    {
      content: "wyprowadzić psa",
      done: true,
    },
  ];
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
  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += ` <li
       ${task.done ? 'style="text-decoration: line-through"' : ""}
      >
      <button class="js-done">✅</button>
      ${task.content}
      
      <button class="js-removeTask">🗑️</button>

      </li>`;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

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
    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };
  init();
}
