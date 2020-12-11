import Axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'
import AddTask from '../Task/addTask'
import UpdateTask from '../Task/updateTask'


//  A FAIRE: ou ranger les contextes ?
export const UpdateOperationContext = createContext()


function ProjectTask(props) {

    const state = useContext(AuthContext)

    const [showUpdateTaskComponent, setShowUpdatetaskComponent] = useState(false)


    const deleteTask = (id) => {
        Axios.delete(`http://localhost:3000/task/delete/${id}`, { headers: { Authorization: `Bearer ${state.token}` } })
            .then(() => {
                props.updateTaskListAfterDelete(id)
            })
    }

    const handleUpdate = () => {
        setShowUpdatetaskComponent(true)
    }



    return (
        <div key={props.taskId}>


            <li className="list-group-item">
                <h6>{props.libelle}</h6>
                <div><p>{props.description}</p></div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#updateOrAddTaskModal" onClick={handleUpdate}>Modifier</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => { deleteTask(props.taskId) }}>Supprimer</button>
                </div>
            </li>
            <UpdateOperationContext.Provider
                value={{ showUpdateTaskComponent, setShowUpdatetaskComponent }}
            >
                {showUpdateTaskComponent && <UpdateTask taskData={{ id: props.taskId, libelle: props.libelle, description: props.description }} projectId={props.projectId} />}
            </UpdateOperationContext.Provider>
        </div>
    )
}

export default ProjectTask

