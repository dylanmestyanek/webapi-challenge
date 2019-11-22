import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"

const ProjectInfo = props => {
    const [actions, setActions] = useState([]);
    const [newAction, setNewAction] = useState({
        description: "",
        notes: ""
    });
    const project = props.projects.find(item => item.id === +props.match.params.id)

    useEffect(() => {
        project && axios.get(`http://localhost:4000/api/projects/${project.id}/actions`)
        .then(res => setActions(res.data))
        .catch(err => console.log("You suck", err))
    }, [project, props.projects])
    

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:4000/api/projects/${project.id}/actions`, newAction)
        .then(res => setActions([
            ...actions,
            res.data
        ]))
        .catch(err => console.log("Idiot", err))
        setNewAction({
            description: '',
            notes: ''
        })
    }

    const handleChange = e => {
        setNewAction({
            ...newAction,
            [e.target.name]: e.target.value
        })
    }

    const removeAction = id => {
        axios.delete(`http://localhost:4000/api/actions/${id}`)
        .then(res => setActions(actions.filter(action => action.id !== id)))
        .catch(err => console.log("Deletion Failed!", err))
    }

    return (
        <ActionContainer>
            <h2>Actions for :</h2>
            <form onSubmit={handleSubmit}>
                <label>Add a new action:</label>
                <input 
                    type="text"
                    name="description"
                    value={newAction.description}
                    placeholder="Enter new description here..."
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="notes"
                    value={newAction.notes}
                    placeholder="Enter new notes here..."
                    onChange={handleChange}
                />
                <button type="submit">Add Action</button>
            </form>
            <ol>
                {
                    actions.map(action => (
                            <li>{action.description} <button onClick={() => removeAction(action.id)}>delete</button></li>
                    ))
                }   
            </ol>
        </ActionContainer>
    )
}

export default ProjectInfo

const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: pink;
    width: 30%;
    margin: 0 auto;
    padding: 20px;
    margin-top: 20px;

    li {
        list-style-position: inside;
        margin-left: -38px;
    }
`;