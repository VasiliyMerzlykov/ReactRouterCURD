import React from 'react'

function AddForm(props) {
    let onChange = (e) => {
        props.handleInputChange(e)
    }

    let handleAdd = (e) => {
        e.preventDefault()
        props.handleAdd()
    }

    return (
        <form  >
            <input name = 'input' onChange = {onChange} type="text" value = {props.message}></input>
            <button onClick = {handleAdd}>Отправить</button>
        </form>
    )
}

export default AddForm
