import { useState } from "react";

function AddFormCompany({ setActive, handleCreate }) {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const hundleChangeName = (e) => {
        const reg = /^[a-zA-Zа-яА-Я ]*$/
        if (reg.test(e.target.value)) {
            setName(e.target.value)
        }
    }

    const hundleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const resetForm = () => {
        setActive(false)
        setName('')
        setAddress('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const addCompany = {
            name: name,
            address: address
        }

        handleCreate(addCompany)
        resetForm()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Наименование
                <br />
                <input type="text" required value={name} id='name' name='name' onChange={hundleChangeName} />
            </label>
            <br />
            <label>
                Адрес
                <br />
                <input type="text" required value={address} id='address' name='address' onChange={hundleChangeAddress} />
            </label>
            <br />
            <br />
            <input type="submit" value="Добавить" />
        </form>
    )
}

export default AddFormCompany