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
