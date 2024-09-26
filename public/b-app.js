const taskDOM = document.querySelector('.task-form');
const newTaskDOM = document.querySelector('.section-newTasks');


const showTasks = async () =>{
    try {
        const {data:{tasks}} = await axios.get('/api/v1/tasks')

        const newTaskDOM = document.getElementById('newTaskContainer');
        newTaskDOM.innerHTML = '';

        tasks.forEach(element => {
        const newDiv = document.createElement('div')
        newDiv.classList.add(`task-newTask`)
        if(element.completed===true){
            newDiv.classList.add('completed')
        }else{
            newDiv.classList.remove('completed')
        }

        newDiv.innerHTML = `
            <h3>${element.name}</h3>
            <div class="task-newTaskbtn">
                <button class="btnEdit" data-id="${element._id}"><i class="fas fa-check"></i></button>
                <button class="btn-delTask" data-id="${element._id}"><i class="fas fa-trash"></i></button>
            </div>
        `
        newTaskDOM.appendChild(newDiv)
        });
    } catch (error) {
        console.log(error)
    }
}

showTasks()
//Task hinzufügen
    taskDOM.addEventListener('submit', async (event) => {
        event.preventDefault();
        const taskName = document.querySelector('.task-input')
        const name = taskName.value
        try {
            await axios.post('/api/v1/tasks', {name})
            taskName.value = ''
            showTasks()
        } catch (error) {
            console.log(error)
        }  
    });


//delete Task
newTaskDOM.addEventListener('click',async (event)=>{
    const el = event.target
    if (el.parentElement.classList.contains('btn-delTask')) {
      const id = el.parentElement.dataset.id
      try {
        await axios.delete(`/api/v1/tasks/${id}`)
        showTasks()
      } catch (error) {
        console.log(error)
      }
    }
})


// checked task
newTaskDOM.addEventListener('click', async (event)=>{
    const el = event.target
    if(el.parentElement.classList.contains('btnEdit')){
        const id = el.parentElement.dataset.id
        try {
            await axios.patch(`/api/v1/tasks/${id}`,{
                completed:true
            })
            showTasks()
        } catch (error) {
            console.log(error)
        }
    }
})

