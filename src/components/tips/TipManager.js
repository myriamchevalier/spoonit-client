export const getTips = (params) => {
    let url = "";
    const { topicId } = params

    if (topicId) url = `http://localhost:8000/tips?topic=${topicId}`
    else url = "http://localhost:8000/tips"

    const options = {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    }
    
    return fetch(url, options)
    .then(res => res.json())
}

export const getTopics = () => {
    return fetch("http://localhost:8000/topics", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
    .then(res => res.json())
}

export const getSingleTip = (id) => {
    return fetch(`http://localhost:8000/tips/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
    .then(res => res.json())
}

export const updateTip = (tip) => {
    return fetch(`http://localhost:8000/tips/${tip.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        },
        body: JSON.stringify(tip)
     })
        .then(getTips)
}

export const createNewTip = (newTip) => {
    return fetch("http://localhost:8000/tips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        },
        body: JSON.stringify(newTip)
     })
        .then(getTips)
}

export const deleteTip = (id) => {
    return fetch(`http://localhost:8000/tips/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }})
        .then(getTips)
}

export const getCurrentUser = () => {
    return fetch("http://localhost:8000/get-user",{
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    }
    )
    .then(res => res.json())
}