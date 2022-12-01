import { useState } from "react";

function AddFormEmployee({ setActive, handleCreate }) {

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [position, setPosition] = useState('');

    const hundleChangeFirstName = (e) => {
        const reg = /^[a-zA-Zа-яА-Я ]*$/
        if (reg.test(e.target.value)) {
            setFirstName(e.target.value)
        }
    }

    const hundleChangeSecondName = (e) => {
        const reg = /^[a-zA-Zа-яА-Я ]*$/
        if (reg.test(e.target.value)) {
            setSecondName(e.target.value)
        }
    }

    const hundleChangePos = (e) => {
        const reg = /^[a-zA-Zа-яА-Я ]*$/
        if (reg.test(e.target.value)) {
            setPosition(e.target.value)
        }
    }

    const resetForm = () => {
        setActive(false)
        setFirstName('')
        setSecondName('')
        setPosition('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const addEmp = {
            firstName: firstName,
            secondName: secondName,
            position: position
        }

        handleCreate(addEmp)
        resetForm()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Имя
                <br />
                <input type="text" required value={firstName} id='firstName' name='firstName' onChange={hundleChangeFirstName} />
            </label>
            <br />
            <label>
                Фамилия
                <br />
                <input type="text" required value={secondName} id='secondName' name='secondName' onChange={hundleChangeSecondName} />
            </label>
            <br />
            <label>
                Должность
                <br />
                <input type="text" required value={position} id='position' name='position' onChange={hundleChangePos} />
            </label>
            <br />
            <br />
            <input type="submit" value="Добавить" />
        </form>
    )
}

export default AddFormEmployee