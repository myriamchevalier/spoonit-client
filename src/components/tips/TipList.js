import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { deleteTip, getCurrentUser, getTips, getTopics } from "./TipManager";

export const TipList = () => {
    const [topics, setTopics] = useState([])
    const [tips, setTips] = useState([])
    const [params, setParams] = useState({}) //State for query parameters(if applicable)
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        getCurrentUser().then(data => setCurrentUser(data))
    }, [])

    const tipFetcher = () => {
        getTips(params).then(data => { setTips(data) })
    }
    useEffect(() => {
        tipFetcher()
        getTopics().then(data => { setTopics(data) })
    }, [])

    const handleControlledInputChange = (e) => {
        const value = e.currentTarget.value
        const updatedParams = { ...params }
        if (value) {
            updatedParams[e.currentTarget.name] = value
        } else {
            delete updatedParams[e.currentTarget.name]
        }
        setParams(updatedParams)
    }
    const onDelete = (id) => {
        const updatedTips = tips.filter(t => t.id !== id)
        setTips(updatedTips)
    }

    return (
        <>
            <article>

                <form>
                    <fieldset>
                        <div className='form-group'>
                            <label htmlFor='topicId'></label>
                            <select name='topicId' onChange={handleControlledInputChange}>
                                <option value=''>Select a topic</option>
                                {
                                    topics.map(t => {
                                        return <option value={t.id} key={t.id}>{t.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </fieldset>
                    <button onClick={(event) => {
                        event.preventDefault()
                        tipFetcher()
                    }}>Apply filter</button>
                </form>

                <article>
                    {
                        tips.length === 0 ?
                            <p>There are not results to be displayed</p> :
                            tips.map(tip => {
                                return <div className='tip-box'>
                                    <p>{tip.topic.label}</p>
                                    <div>{tip.content}</div>
                                    <div>{tip.spoonie.first_name}</div>
                                    {currentUser.id === tip.spoonie.id ? 
                                    <div>
                                        <button onClick={()=> {
                                        history.push({ pathname: `/tips/edit/${tip.id}`})}}>Edit</button>
                                        <button onClick={()=> deleteTip(tip.id)
                                        .then(onDelete(tip.id))}>Delete</button>
                                    </div> 
                                    : ''}
                                </div>
                            })
                    }
                </article>
                <button onClick={()=> {
                history.push({ pathname: "/tips/form"})}}>Share a tip!</button>
            </article>
        </>
    )


}
