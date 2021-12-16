export const getTips = (params) => {
    let url = "";
    const { topicId } = params

    if (topicId) url = `https://spoon-it.herokuapp.com/tips?topic=${topicId}`
    else url = "https://spoon-it.herokuapp.com/tips"

    const options = {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    }
    
    return fetch(url, options)
    .then(res => res.json())
}

export const getTopics = () => {
    return fetch("https://spoon-it.herokuapp.com/topics", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
    .then(res => res.json())
}

export const getSingleTip = (id) => {
    return fetch(`https://spoon-it.herokuapp.com/tips/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    })
    .then(res => res.json())
}

export const updateTip = (tip) => {
    return fetch(`https://spoon-it.herokuapp.com/tips/${tip.id}`, {
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
    return fetch("https://spoon-it.herokuapp.com/tips", {
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
    return fetch(`https://spoon-it.herokuapp.com/tips/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }})
        .then(getTips)
}

export const getCurrentUser = () => {
    return fetch("https://spoon-it.herokuapp.com/get-user",{
        headers: {
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        }
    }
    )
    .then(res => res.json())
}