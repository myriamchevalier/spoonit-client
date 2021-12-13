import React, { useEffect, useState } from "react";
import { TaskForm } from "../tasks/TaskForm";
import { getTips, getTopics } from "./TipManager";

export const TipList = () => {
    const [topics, setTopics] = useState([])
    const [tips, setTips] = useState([])
    const [params, setParams] = useState({}) //State for query parameters(if applicable)

    useEffect(() => {
        getTips(params).then(data => {setTips(data)})
        getTopics().then(data => {setTopics(data)})
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

    return (
        <>
            <form>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='topicId'></label>
                        <select name='topicId' onChange={handleControlledInputChange}>
                            <option value=''>Select a topic</option>
                            {
                                topics.map(t => {
                                    return <option value={t.if} key={t.id}>{t.label}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
            </form>

            <article>
                {
                    tips.length === 0 ?
                    <p>There are not results to be displayed</p> :
                    tips.map(tip => {
                        return <div>
                            <p>{tip.topic.label}</p>
                            <div>{tip.content}</div>
                            <div>{tip.spoonie.first_name}</div>
                            </div>
                    })
                }
            </article>
        </>
    )


}
