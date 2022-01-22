let enterButton = document.getElementById("add");
let input = document.getElementById("myInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");
let numTasks=document.getElementById('task-count')

let all=document.getElementById('showAll')
let active=document.getElementById('showActive')
let comp=document.getElementById('showComplete')


class ToDo {
	constructor(title) {
		this.id = ++lastId;
		this.title = title;
		this.completed = false;
	}
}

let lastId = 0;
let todoItems = [];



function createListElement() {
	const todo = new ToDo(input.value);
	todoItems.push(todo);

	const li = document.createElement("li"); 
	li.setAttribute("id", `li${todo.id}`);

	const litext=document.createElement("p");
	litext.setAttribute("id", `p${todo.id}`);
	litext.innerText=input.value
	li.appendChild(litext);

	li.addEventListener("click", (event) => {
		changeCompleted(+event.target.id.substring(2));
	});

	litext.addEventListener("click", (event) => {
		event.stopPropagation();
		changeCompleted(+event.target.id.substring(1));
	});

	const changeCompleted = (id) => {
		console.log(id);
		itemIndex = todoItems.findIndex((it => it.id === id));
		todoItems[itemIndex].completed = !todoItems[itemIndex].completed;
		console.log(todoItems);
		litext.classList.toggle("done");
	}

	const dBtn = document.createElement("button");
	dBtn.setAttribute("id", `btn${todo.id}`);
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", (event)=> {
		event.stopPropagation();
		console.log(event.target.id.substring(3));
		todoItems = todoItems.filter(it => it.id !== +event.target.id.substring(3));
		numTasks.textContent = todoItems.length;
		li.remove();
	});


	ul.appendChild(li);

	numTasks.textContent = todoItems.length;
	input.value = ""; 
}


all.addEventListener("click",(event)=>{
	console.log("itis ok all")
})
active.addEventListener("click",(event)=>{
	console.log("itis ok active")
})
comp.addEventListener("click",(event)=>{
	console.log("itis ok comp")
})



function addListAfterClick(){
	if ( input.value.length > 0) { 
		createListElement();
	}
}




function addListAfterKeypress(event) {
	if ( event.which === 13 && input.value.length > 0 ) { 
		createListElement();
	} 
}


enterButton.addEventListener("click",addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);
