let enterButton = document.getElementById('add');
let input = document.getElementById('myInput');
let ul = document.querySelector('ul');
let item = document.getElementsByTagName('li');
let numTasks = document.getElementById('task-count');

let all = document.getElementById('showAll');
let active = document.getElementById('showActive');
let comp = document.getElementById('showComplete');


class ToDo {
  constructor(title) {
    this.id = ++lastId;
    this.title = title;
    this.completed = false;
  }
}

const FilterTypes = Object.freeze({
    ALL:   Symbol("all"),
    ACTIVE:  Symbol("active"),
    COMPLETED: Symbol("completed")
});

let filterType = FilterTypes.ALL;

let lastId = 0;
let todoItems = [];
let todoItemsFiltered = [];

function createListElement(todo) {
  const li = document.createElement('li');
  li.setAttribute('id', `li${todo.id}`);

  const litext = document.createElement('p');
  litext.setAttribute('id', `p${todo.id}`);
  if(todo.completed) {
	litext.classList.add('done');
  }
  litext.innerText = todo.title;
  li.appendChild(litext);

  li.addEventListener('click', (event) => {
    changeCompleted(+event.target.id.substring(2));
  });

  litext.addEventListener('click', (event) => {
    event.stopPropagation();
    changeCompleted(+event.target.id.substring(1));
  });

  const changeCompleted = (id) => {
    console.log(id);
    itemIndex = todoItems.findIndex((it) => it.id === id);
    todoItems[itemIndex].completed = !todoItems[itemIndex].completed;
	if(filterType === FilterTypes.ACTIVE && todoItems[itemIndex].completed) {
		todoItemsFiltered = todoItems.filter(it => !it.completed);
		li.remove();
	}
    console.log(todoItems);
    litext.classList.toggle('done');
  };

  const dBtn = document.createElement('button');
  dBtn.setAttribute('id', `btn${todo.id}`);
  dBtn.appendChild(document.createTextNode('X'));
  li.appendChild(dBtn);
  dBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log(event.target.id.substring(3));
    todoItems = todoItems.filter(
      (it) => it.id !== +event.target.id.substring(3)
    );
    numTasks.textContent = todoItemsFiltered.length;
    li.remove();
  });

  ul.appendChild(li);

  numTasks.textContent = todoItemsFiltered.length;
  input.value = '';
}

all.addEventListener('click', (event) => {
  filterType = FilterTypes.ALL;
  todoItemsFiltered = [...todoItems];
  ul.innerHTML = "";
  generateTodos();
});


active.addEventListener('click', (event) => {
  console.log('itis ok active');
  filterType = FilterTypes.ACTIVE;
  todoItemsFiltered = todoItems.filter(it => !it.completed);
  ul.innerHTML = "";
  generateTodos();
});


comp.addEventListener('click', (event) => {
  console.log('itis ok comp');
  filterType = FilterTypes.COMPLETED;
  todoItemsFiltered = todoItems.filter(it => it.completed);
  ul.innerHTML = "";
  generateTodos();
});

const generateTodos = () => {
	todoItemsFiltered.forEach((it) => {
	  createListElement(it);
  });
}


const addListAfterClick = () => {
  if (input.value.length > 0) {
    const todo = new ToDo(input.value);
    todoItems.push(todo);
    todoItemsFiltered = [...todoItems];
    createListElement(todo);
  }
}

const addListAfterKeypress = (event) => {
  if (event.which === 13 && input.value.length > 0) {
	const todo = new ToDo(input.value);
    todoItems.push(todo);
    todoItemsFiltered = [...todoItems];
    createListElement(todo);
  }
}

enterButton.addEventListener('click', addListAfterClick);

input.addEventListener('keypress', addListAfterKeypress);
// -----------------------------modeTheme-----------------------------------
function toggleMode(){
   let element = document.body;
   let inpmode=document.querySelector('.add')
   let h=document.querySelector(".header")
   let dchild=document.querySelector(".d-child")
   let fchild=document.querySelector(".f-child")
   let sumo=document.querySelector(".sun-moon")

   sumo.classList.toggle("sun-moon-tog")
   element.classList.toggle("dark-mode")
   h.classList.toggle("header-dark")
   inpmode.classList.toggle("inp-dark")
   dchild.classList.toggle("dark-mode2")
   fchild.classList.toggle("dark-mode2")
}