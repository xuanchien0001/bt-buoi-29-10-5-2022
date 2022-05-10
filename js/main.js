const taskTodo = [];

function dom(element) {
  return document.querySelector(element);
}
function validate() {
  let newTask = dom("#newTask").value;
  let newTaskClone = newTask.replace(/\s+/g, "");
  // validate tiếng việt có dấu
  newTaskClone = newTaskClone.toLowerCase();
  newTaskClone = newTaskClone.replace(
    /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
    "a"
  );
  newTaskClone = newTaskClone.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  newTaskClone = newTaskClone.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  newTaskClone = newTaskClone.replace(
    /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
    "o"
  );
  newTaskClone = newTaskClone.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  newTaskClone = newTaskClone.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  newTaskClone = newTaskClone.replace(/đ/g, "d");
  const regex = /^[a-zA-Z0-9]+$/;
  if (newTaskClone.trim().length > 0 && regex.test(newTaskClone)) {
    dom(".error").style.opacity = "0";

    return { newTask, newTaskClone };
  } else {
    dom(".error").style.opacity = "1";
    return undefined;
  }
}
dom(".card__add").addEventListener("submit", (e) => {
      e.preventDefault();
  let newTask = validate();
  if (newTask) {
    taskTodo.push({
      id: Math.random() * Math.random() * 10,
      contentShow: newTask.newTask,
      contentHidden: newTask.newTaskClone,
      status: false,
    });
  }
  renderTodo(taskTodo);
});

function renderTodo(arrayTask) {
  let todoUnDone = arrayTask.filter((item) => item.status === false);
  let html = todoUnDone
    .map((item) => {
      return `<li>
       <span>${item.contentShow}</span>
       <div class="buttons">
           <button onclick="deleteTask(${item.id})" class="remove">
               <i class="fa fa-trash-alt"></i>
           </button>
           <button onclick="acceptTask(${item.id})" class="complete">
               <i class="far fa-check-circle"></i>
               <i class="fas fa-check-circle"></i>
           </button>
       </div>
   </li>`;
    })
    .join("");
  dom("#todo").innerHTML = html;

  let todoDone = arrayTask.filter((item) => item.status === true);
  let htmlDone = todoDone.map((item) => {
    return `<li>
        <span>${item.contentShow}</span>
        <div class="buttons">
            <button onclick="deleteTask(${item.id})" class="remove">
                <i class="fa fa-trash-alt"></i>
            </button>
            <button class="complete">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-check-circle"></i>
            </button>
        </div>
    </li>`;
  });
  dom("#completed").innerHTML = htmlDone.join("");
}
// accept task
function acceptTask(id) {
  for (let i of taskTodo) {
    if (i.id === id) i.status = true;
  }
  renderTodo(taskTodo);
}

// delete task
function deleteTask(id) {
  for (let i = 0; i < taskTodo.length; i++) {
    if (taskTodo[i].id === id) {
      taskTodo.splice(i, 1, 0);
    }
  }
  renderTodo(taskTodo);
}

// sap xep tu a den z va nguoc lai
function sapXepA_Z(value) {
  let sapXepA_Z = [...taskTodo];
  let arrayContentHidden = [];
  let SapXepDone = [];
  for (let i of sapXepA_Z) {
    arrayContentHidden.push(i.contentHidden);
  }
  arrayContentHidden.sort();
  if (value === false) arrayContentHidden.reverse();
  for (let item of arrayContentHidden) {
    for (let a = 0; a < sapXepA_Z.length; a++) {
      if (item === sapXepA_Z[a].contentHidden) {
        SapXepDone.push(sapXepA_Z[a]);
      }
    }
  }
  renderTodo(SapXepDone);
}

// sap xep task done va not done
function filterTaskDone(valueBoolean) {
  let arrTaskDone = [];
  let arrTaskNotDone = [];
  for (let i of taskTodo) {
    i.status ? arrTaskDone.push(i) : arrTaskNotDone.push(i);
  }
  valueBoolean ? renderTodo(arrTaskDone) : renderTodo(arrTaskNotDone);
}
