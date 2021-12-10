// Options to filter tasks combined with og fetch.

export const getTasks = (params) => {
    let url = "";
    const { categoryId, spoonId, createdBy } = params // Deconstructing params obj. 
    
    if (categoryId && spoonId && createdBy) url = `http://localhost:8000/tasks?category=${categoryId}&spoon=${spoonId}&created_by`;
    else if (categoryId && spoonId && !createdBy) url = `http://localhost:8000/tasks?category=${categoryId}&spoon=${spoonId}`;
    else if (categoryId && !spoonId && createdBy) url = `http://localhost:8000/tasks?category=${categoryId}&created_by`;
    else if (categoryId && !spoonId && !createdBy) url = `http://localhost:8000/tasks?category=${categoryId}`;
    else if (!categoryId && spoonId && createdBy) url = `http://localhost:8000/tasks?spoon=${spoonId}&created_by`;
    else if (!categoryId && spoonId && !createdBy) url = `http://localhost:8000/tasks?spoon=${spoonId}`;
    else if (!categoryId && !spoonId && createdBy) url = `http://localhost:8000/tasks?created_by`;
    else url = "http://localhost:8000/tasks";
    
    const options = {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    }
    
    return fetch(url, options)
    .then(res => res.json())
}

export const getRandomTask = (params) => {
    let url = "";
    const { categoryId, spoonId, createdBy } = params // Deconstructing params obj. 
    
    if (categoryId && spoonId && createdBy) url = `http://localhost:8000/tasks/random_task?category=${categoryId}&spoon=${spoonId}&created_by`;
    else if (categoryId && spoonId && !createdBy) url = `http://localhost:8000/tasks/random_task?category=${categoryId}&spoon=${spoonId}`;
    else if (categoryId && !spoonId && createdBy) url = `http://localhost:8000/tasks/random_task?category=${categoryId}&created_by`;
    else if (categoryId && !spoonId && !createdBy) url = `http://localhost:8000/tasks/random_task?category=${categoryId}`;
    else if (!categoryId && spoonId && createdBy) url = `http://localhost:8000/tasks/random_task?spoon=${spoonId}&created_by`;
    else if (!categoryId && spoonId && !createdBy) url = `http://localhost:8000/tasks/random_task?spoon=${spoonId}`;
    else if (!categoryId && !spoonId && createdBy) url = `http://localhost:8000/tasks/random_task?created_by`;
    else url = "http://localhost:8000/tasks/random_task";
    
    const options = {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    }
    
    return fetch(url, options)
    .then(res => res.json())
}

export const getSingleTask = (id) => {
    return fetch(`http://localhost:8000/tasks/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
    .then(res => res.json())
}

export const getAllCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
        .then(response => response.json())
}

export const getAllSpoons = () => {
    return fetch("http://localhost:8000/spoons", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
        .then(response => response.json())
}

export const createNewTask = (newTask) => {
    return fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        },
        body: JSON.stringify(newTask)
     })
        .then(getTasks)
}

export const updateTask = (task) => {
    return fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        },
        body: JSON.stringify(task)
     })
        .then(getTasks)
}

export const deleteTask = (id) => {
    return fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }})
        .then(getTasks)
}