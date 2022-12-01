import { useEffect, useState } from "react";
import { useActions } from "../../hooks/actions";
import { useDebounce } from "../../hooks/debounce";
import TableCell from "../Table/TableCell";

export default function TableRow({content, isAllActive, allCheckbox, handleUpdate}) {

    const [firstName, setFirstName] = useState(content.firstName);
    const debFirstName = useDebounce(firstName);

    const [secondName, setSecondName] = useState(content.secondName);
    const debSecondName = useDebounce(secondName);

    const [position, setPosition] = useState(content.position);
    const debPosition = useDebounce(position);

    const [checkbox, setCheckbox] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const [stateContent, setStateContent] = useState(content);

    const {addEmployeeChecked, removeEmployeeChecked} = useActions();

    const handleChange = () => {
        if(!checkbox) {
            setStateContent(prevState => ({
                ...prevState,
                checked: !checkbox
            }))

            addEmployeeChecked(stateContent);
        }

        if(checkbox) {
            setStateContent(prevState => ({
                ...prevState,
                checked: !checkbox
            }))
            removeEmployeeChecked(stateContent);
        }

        setCheckbox(!checkbox);
        setIsActive(!checkbox);
    }

    useEffect(() => {
        setCheckbox(allCheckbox);
        setIsActive(isAllActive);
    }, [allCheckbox, isAllActive]) 

    useEffect(() => {
        if (debFirstName !== stateContent.firstName
            || debSecondName !== stateContent.secondName
            || debPosition !== stateContent.position) {
                
            setStateContent(prevState => ({
                ...prevState,
                firstName: debFirstName,
                secondName: debSecondName,
                position: debPosition
            }));
        }
    }, [debFirstName, debSecondName, debPosition, stateContent]);

    useEffect(() => {
        const newContent = {
            ...stateContent,
            firstName: debFirstName,
            secondName: debSecondName,
            position: debPosition
        };
        
        handleUpdate(newContent);

    }, [stateContent, handleUpdate]);

    return (
        <div className="table__row">
            <TableCell item={firstName} setItem={setFirstName} isActive={isActive}/>
            <TableCell item={secondName} setItem={setSecondName} isActive={isActive}/>
            <TableCell item={position} setItem={setPosition} isActive={isActive}/>
            <TableCell 
                item={checkbox} 
                setItem={setCheckbox} 
                onChange={handleChange}
                isActive={isActive}
            />
        </div>
    )
};