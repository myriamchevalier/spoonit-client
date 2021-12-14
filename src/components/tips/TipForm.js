import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createNewTip, getSingleTip, getTopics, updateTip } from "./TipManager";

export const TipForm = () => {
    const [topics, setTopics] = useState([])
    const [tip, setTip] = useState({})
    const { tipId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getTopics().then(data => setTopics(data))
    }, [])

    useEffect(() => {
        if (tipId) {
            getSingleTip(tipId).then((tipData) => {
                setTip(
                    {...tipData,
                    topicId: tipData.topic.id}
                )
            })
        }
    }, [tipId])

    const handleControlledInputChange = (e) => {
        const newTip = {...tip}
        newTip[e.target.name] = e.target.value
        setTip(newTip)
    }

    return (
        <>
            <form>
                <h3>{tipId ? 'Edit tip' : 'Create new tip'}</h3>

                <fieldset>
                    <div className='form-group-tip'>
                        <label htmlFor='topicId'>Topic</label>
                        <select name='topicId' value={tip.topicId} required
                        onChange={handleControlledInputChange}>
                            <option value=''>Select a topic</option>
                            {
                                topics.map(topic =>{
                                    return <option value={topic.id} key={topic.id}>{topic.label}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div>
                        <label htmlFor='content'>
                            <input type='text' required name='content' placeholder='Your tip here'
                            value={tip.content} onChange={handleControlledInputChange} />
                        </label>
                    </div>
                </fieldset>
            </form>
            
            <button onClick={e => {
                e.preventDefault()
                tipId? updateTip(tip).then(() => history.push('/tips')) :
                createNewTip(tip).then(() => history.push('/tips'))
            }}>Save Tip</button>
        </>
    )
}