import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/actions';
import { employeeAPI } from '../../store/services/EmployeeService';
import AddFormEmployee from '../AddFormEmployee/AddFormEmployee';
import Menu from '../Menu/Menu';
import '../Table/Table.css';
import TableHeader from './TableHeaderEmployee';
import TableRow from './TableRowEmployee';

const fourHeader =  ['Фамилия', 'Имя', 'Должность', 'checkbox'];

export default function TableEmployee({idCompany}) {

  const { data: employee, isError: empError, isLoading: empLoading } = employeeAPI.useFetchOneEmployeeQuery(idCompany);
  const [ createEmpl ] = employeeAPI.useCreateEmployeeMutation();
  const [ deleteEmpl ] = employeeAPI.useDeleteEmployeeMutation();
  const [ updateEmpl ] = employeeAPI.useUpdateEmployeeMutation();
  
  const { emplChecked } = useSelector(state => state.employeeChecked);
  const { removeEmployeeChecked } = useActions();

  const [isAllActive, setIsAllActive] = useState(false);
  const [allCheckbox, setAllCheckbox] = useState(false);
  const [modalActiveAdd, setModalActiveAdd] = useState(false);

  const handleCreate = async (empl) => {
    await createEmpl({
      ...empl,
      idCompany: idCompany
    })
  }

  const handleDelete = () => {
    if(emplChecked.length > 0) {
      emplChecked.forEach(async (element) => {
        removeEmployeeChecked(element);
        await deleteEmpl(element.id);
      });
    }
  }

  const handleUpdate = async (empl) => {
    if(empl) {
      await updateEmpl(empl)
    }
  }

  return (
    <>
      {empError && <div className='table'>Error...</div>}
      {employee && !empLoading
        ? <div className='table'>
            <Menu active={modalActiveAdd} setActive={setModalActiveAdd} handleDelete={handleDelete}>
              <AddFormEmployee setActive={setModalActiveAdd} handleCreate={handleCreate}/>
            </Menu>
            <TableHeader 
              header={fourHeader}
              setIsAllActive={setIsAllActive}
              allCheckbox={allCheckbox}
              setAllCheckbox={setAllCheckbox}
              content={employee}
            />
            {employee.map((empl, idkey) => 
              <TableRow 
                key={idkey} 
                content={empl}
                isAllActive={isAllActive}
                allCheckbox={allCheckbox}
                handleUpdate={handleUpdate}
              />)}
          </div>
        : <div className='table'>Загрузка...</div>}
    </>
  );
}