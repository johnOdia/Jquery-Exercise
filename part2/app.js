 //selectors
 $('form').on('submit',handleSubmitForm)
 $('ul').on('click', handleClickDeleteOrCheck)
 $('.clearAll').on('click',handleClearAll)


 //event handlers
 function handleSubmitForm(e) {
     e.preventDefault();
     let input = $('input')
     let existingTodos = JSON.parse(localStorage.getItem('todos'))
     if(input.val() != ''){
         addTodo(input.val())
         let todos = []
         todos.push(input.val())
         localStorage.setItem('todos',JSON.stringify(todos))
         if (existingTodos === null){
             existingTodos = ['anything']
         }
         existingTodos.push(input.val())
         
    localStorage.setItem("todos", JSON.stringify(existingTodos))
         input.val('')
     }
 }



 
 //PART 4 OF THE EXERCISE ~~ IMPLEMENTING LOCAL STORAGE
const storeTodosInLocalStorage = (() => {
    let ul = $('ul')
    let currentTodos = JSON.parse(localStorage.getItem('todos'))
        for (let i = currentTodos.length -1; i > 0; i--){
           let li = $('<li>')
           li.html(`
           <span class='todo-item'>${currentTodos[i]}</span>
           <button name='checkButton'><i class='fas fa-check-square'></i></button>
           <button name='deleteButton'><i class='fas fa-trash'></i></button>
           `)
           li.addClass('todo-list-item')
           ul.append(li)
        }
})()




function handleClickDeleteOrCheck(e){
    if (e.target.name === 'checkButton'){
        checkTodo(e)
    }
    if(e.target.name === 'deleteButton'){
        deleteTodo(e)
    }
}

function handleClearAll(e){
    $('ul').text('')
    localStorage.clear()
}

 //helpers
 function addTodo(todo){
     let ul = $('ul')

     let li = $('<li>')
     li.html(`
     <span class='todo-item'>${todo}</span>
     <button name='checkButton'><i class='fas fa-check-square'></i></button>
     <button name='deleteButton'><i class='fas fa-trash'></i></button>
     `)
 
     li.addClass('todo-list-item')
     ul.prepend(li)
 }


function checkTodo(e){
    let item = $(e.target).parent()
    if(item.css('text-decoration') === 'line-through'){
        item.css('text-decoration','none')
    }
    else{
        item.css('text-decoration','line-through')
    }
}

function deleteTodo(e){
    let item = $(e.target).parent()
    item.remove()
}