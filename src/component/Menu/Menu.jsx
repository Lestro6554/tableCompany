import Modal from '../Modal/Modal';
import './Menu.css'

function Menu({ active, setActive, handleDelete, children }) {

    const deleteActive = () => {
        handleDelete()
    }

    return (
        <div className="menu">
            <button onClick={() => setActive(true)}>Добавить</button>
            <Modal active={active} setActive={setActive}>
                <Modal active={active} setActive={setActive}>
                    {children}
                </Modal>
            </Modal>
            <button onClick={deleteActive}>Удалить</button>
        </div>
    )
}

export default Menu