export default function TableCell({ item, setItem, onChange, isActive }) {

    const handleChange = (event) => {
        if (typeof item === 'number') {
            setItem(+event.target.value);
        } else {
            setItem(event.target.value);
        }
    }

    return (
        <div className={isActive ? "table__cell item_active" : "table__cell"}>
            {typeof item === 'number' &&
                <input
                    className={isActive ? "item_active" : ""}
                    value={item}
                    onChange={handleChange}
                    type="number"
                    readOnly />}

            {typeof item === 'string' &&
                <input
                    className={isActive ? "item_active" : ""}
                    value={item}
                    onChange={handleChange}
                    type="text"
                />}
            {typeof item === 'boolean' &&
                <input
                    checked={item}
                    onChange={onChange}
                    type="checkbox"
                />}
        </div>
    )
};