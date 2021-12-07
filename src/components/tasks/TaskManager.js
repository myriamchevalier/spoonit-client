export const getAllTasks = () => {
    return fetch("http://localhost:8000/tasks", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
        .then(response => response.json())
}
