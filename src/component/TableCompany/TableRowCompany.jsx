import { useEffect, useState } from "react";
import { useActions } from '../../hooks/actions';
import { useDebounce } from '../../hooks/debounce';
import TableCell from "../Table/TableCell";

export default function TableRow({ content, isAllActive, allCheckbox, handleUpdate }) {

    const [name, setName] = useState(content.name);
    const debName = useDebounce(name);
    const [address, setAddress] = useState(content.address);
    const debAddress= useDebounce(address);
    const [checkbox, setCheckbox] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [stateContent, setStateContent] = useState(content);

    const { addCompanyChecked, removeCompanyChecked } = useActions();

    const handleChange = () => {
        if (!checkbox) {
            setStateContent(prevState => ({
                ...prevState,
                checked: !checkbox
            }))

            addCompanyChecked(stateContent);
        }

        if (checkbox) {
            setStateContent(prevState => ({
                ...prevState,
                checked: !checkbox
            }))

            removeCompanyChecked(stateContent);
        }

        setCheckbox(!checkbox);
        setIsActive(!checkbox);
    };

    useEffect(() => {
        setCheckbox(allCheckbox);
        setIsActive(isAllActive);
    }, [allCheckbox, isAllActive]);

    useEffect(() => {
        if(debName !== stateContent.name || debAddress !== stateContent.address) {

            setStateContent(prevState => ({
                ...prevState,
                name: debName,
                address: debAddress
            }))

            const newContent = {
                ...stateContent,
                name: debName,
                address: debAddress
            };
            
            handleUpdate(newContent);
        }
    }, [debName, debAddress, stateContent, handleUpdate]);

    return (
        <div className="table__row">
            <TableCell item={name} setItem={setName} isActive={isActive} setIsActive={setIsActive} />
            <TableCell item={content.countEmp} isActive={isActive} setIsActive={setIsActive} />
            <TableCell item={address} setItem={setAddress} isActive={isActive} setIsActive={setIsActive} />
            <TableCell
                item={checkbox}
                setItem={setCheckbox}
                onChange={handleChange}
                isActive={isActive}
            />
        </div>
    )
};