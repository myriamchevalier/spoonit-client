export const getAllTasks = () => {
    return fetch("http://localhost:8000/tasks", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
        .then(response => response.json())
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