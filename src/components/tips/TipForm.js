import React, { useState } from "react";
import { useParams } from "react-router";

export const TipForm = () => {
    const [topics, setTopics] = useState([])
    const [tip, setTip] = useState({})
    const { tipId } = useParams
}