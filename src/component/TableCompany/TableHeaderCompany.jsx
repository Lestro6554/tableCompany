import { useActions } from "../../hooks/actions";

export default function TableHeader({ header, setIsAllActive, allCheckbox, setAllCheckbox, content }) {

    const {addCompanyChecked, removeCompanyChecked} = useActions();

    const handleChange = (event) => {
        if(!allCheckbox) {
            content.forEach(item => {
                item = {
                    ...item,
                    checked: !allCheckbox
                }
                addCompanyChecked(item);
            })
        }

        if(allCheckbox) {
            content.forEach(item => {
                item = {
                    ...item,
                    checked: allCheckbox
                }
                removeCompanyChecked(item);
            })
        }

        setAllCheckbox(event.target.checked);
        setIsAllActive(event.target.checked);
    }

    return (
        <div className="table__row table__row--header">
            {header.map((item, idkey) => {
                if(idkey === (header.length - 1)) {
                    return (
                        <div className="table__cell" key={idkey}>
                            <input 
                                type="checkbox" 
                                id="header-checkbox" 
                                name="header-checkbox"
                                checked={allCheckbox}
                                onChange={handleChange}/>
                        </div>
                    )
                } else {
                    return (<div className="table__cell" key={idkey}>{item}</div>)
                }
            }
            )}
        </div>
    )
};