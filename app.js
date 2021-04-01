////LES VARIABLES////
const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".todoButton");
const todoOutput = document.querySelector(".todoOutput");
const filterTodo = document.querySelector(".filterTodo");


////LES ECOUTEURS////
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", ajouter);
todoOutput.addEventListener("click", supprimer);
filterTodo.addEventListener("input", filtrer);


////LES FONCTIONS////
function ajouter(event) {
  event.preventDefault();

  //CREATION D'UNE BALISE DIV//
  newDiv = document.createElement("div")
  newDiv.classList.add("newDiv");
    
  //CREATION D'UNE BALISE LI//
  newTaf = document.createElement("li");
  newTaf.classList.add("newTaf");
  newTaf.innerText = todoInput.value;
  newDiv.appendChild(newTaf);

  //AJOUTER NEWDIV A LOCALSTORAGE//
  saveLocalTodos(todoInput.value);

  //CREATION D'UN BOUTON VALIDER//
  validButton = document.createElement("button");
  validButton.classList.add("validButton");
  validButton.innerHTML = "Valider";
  newDiv.appendChild(validButton);

  //CREATION D'UN BOUTON SUPPRIMER//
  suppButton = document.createElement("button");
  suppButton.classList.add("suppButton");
  suppButton.innerHTML = "Supprimer";
  newDiv.appendChild(suppButton);

  //AJOUT DE LA BALISE DIV AU todoOutput//
  todoOutput.appendChild(newDiv);

  //METTRE A JOUR INPUT//
  todoInput.value = ""
};

function supprimer(event) {
  event.preventDefault();

  const item = event.target;
  const todo = item.parentElement;
  if (item.classList[0] === "suppButton") {
      todo.remove();
  }   
  if (item.classList[0] === "validButton") {
     todo.classList.toggle("validButtonSecond");
  }
};

function filtrer(event) {
  event.preventDefault();
    
  const todos = todoOutput.childNodes;
  console.log(todos)
  todos.forEach(function(todo) {
      switch (event.target.value) {
          case "toutes":
              todo.style.display = "flex";
              break;
          case "terminees":
              if (todo.classList.contains("validButtonSecond")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
              break;
          case "restantes":
              if (!todo.classList.contains("validButtonSecond")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
              break;
      }
  })
}

function saveLocalTodos(newDiv) {
  //CHECK S'IL Y A DES ITEMS EXISTANT//
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(newDiv);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
        todos = [];
  } else {
        todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (newDiv) {
    //CREATION D'UNE BALISE DIV//
    newDiv = document.createElement("div")
    newDiv.classList.add("newDiv");
    
    //CREATION D'UNE BALISE LI//
    newTaf = document.createElement("li");
    newTaf.innerHTML= newDiv;
    newTaf.classList.add("newTaf");
    newDiv.appendChild(newTaf);

    //CREATION D'UN BOUTON VALIDER//
    validButton = document.createElement("button");
    validButton.classList.add("validButton");
    validButton.innerHTML = "Valider";
    newDiv.appendChild(validButton);

    //CREATION D'UN BOUTON SUPPRIMER//
    suppButton = document.createElement("button");
    suppButton.classList.add("suppButton");
    suppButton.innerHTML = "Supprimer";
    newDiv.appendChild(suppButton);

    //AJOUT DE LA BALISE DIV AU todoOutput//
    todoOutput.appendChild(newDiv);
  });
}

function removeLocalTodos(newDiv) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = newDiv.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}






