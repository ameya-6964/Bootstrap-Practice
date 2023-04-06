document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const taskNameInput = document.getElementById("task-name");
  const dueDateInput = document.getElementById("due-date");
  const listGroup = document.querySelector("ul.list-group");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newListItem = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span class="task-name">${taskNameInput.value}</span>
          <div>
            <button class="btn btn-success completed-btn">Completed</button>
            <button class="btn btn-danger delete-btn">Delete</button>
          </div>
        </li>
      `;
    listGroup.insertAdjacentHTML("beforeend", newListItem);
    taskNameInput.value = "";
    dueDateInput.value = "";

    // Animate new task
    const newTask = listGroup.lastElementChild;
    newTask.style.opacity = 0;
    newTask.style.transform = "translateX(-20px)";
    newTask.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
    setTimeout(() => {
      newTask.style.opacity = 1;
      newTask.style.transform = "translateX(0)";
    }, 100);
  });

  listGroup.addEventListener("click", (event) => {
    if (event.target.classList.contains("completed-btn")) {
      const taskName = event.target.closest("li").querySelector(".task-name");
      taskName.style.textDecoration = "line-through";
      event.target.classList.replace("btn-success", "btn-secondary");
      event.target.disabled = true;
    } else if (event.target.classList.contains("delete-btn")) {
      // Animate task deletion
      const task = event.target.closest("li");
      task.style.opacity = 0;
      task.style.transform = "scale(0.8)";
      task.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
      setTimeout(() => {
        task.remove();
      }, 500);
    }
  });
});
