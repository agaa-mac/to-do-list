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
  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += ` <li>${task.content}</li>`;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };
  const init = () => {
    render();
  };
  init();
}
