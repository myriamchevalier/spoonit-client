// Options to filter tasks combined with og fetch.

export const getTasks = (params) => {
    let endpoint = "";
    const { categoryId, spoonId } = params // Deconstructing params obj. 
    
    if (categoryId && spoonId) endpoint = `http://localhost:8000/tasks?category=${categoryId}&spoon=${spoonId}`;
    else if (categoryId && !spoonId) endpoint = `http://localhost:8000/tasks?category=${categoryId}`;
    else if (!categoryId && spoonId) endpoint = `http://localhost:8000/tasks?spoon=${spoonId}`;
    else endpoint = "http://localhost:8000/tasks";
    
    const options = {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    }
    
    return fetch(endpoint, options)
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
