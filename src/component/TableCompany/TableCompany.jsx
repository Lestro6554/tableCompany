import { useState } from 'react';
import { companyAPI } from '../../store/services/CompanyService';
import '../Table/Table.css';
import TableEmployee from '../TableEmployee/TableEmployee';
import TableHeader from './TableHeaderCompany';
import TableRow from './TableRowCompany';
import { useSelector } from 'react-redux';
import { employeeAPI } from '../../store/services/EmployeeService';
import AddFormCompany from '../AddFormCompany/AddFormCompany';
import Menu from '../Menu/Menu';
import { useActions } from '../../hooks/actions';


const fourHeader = ['Наименование', 'Количество сотрудников', 'Адрес', 'checkbox'];

export default function TableCompany() {

  const [isAllActive, setIsAllActive] = useState(false);
  const [allCheckbox, setAllCheckbox] = useState(false);
  const [modalActiveAdd, setModalActiveAdd] = useState(false);

  const { data, isError, isLoading } = companyAPI.useFetchAllCompanyQuery('');
  const [ createCompany ] = companyAPI.useCreateCompanyMutation();
  const [ deleteCompany ] = companyAPI.useDeleteCompanyMutation();
  const [ updateCompany ] = companyAPI.useUpdateCompanyMutation();

  const [ deleteEmpl ] = employeeAPI.useDeleteEmployeeMutation();
  const { data: dataEmpl } = employeeAPI.useFetchAllEmployeeQuery('');

  const { companyChecked } = useSelector(state => state.companyChecked);
  const { removeCompanyChecked } = useActions();

  const handleCreate = async (company) => {
    await createCompany(company);
  }

  const handleDelete = () => {
    if(companyChecked.length > 0) {
      companyChecked.forEach(async (element) => {
        removeCompanyChecked(element);
        await deleteCompany(element);
        const filterEmpl = dataEmpl.filter(i => i.idCompany === element.id);
        if(filterEmpl.length > 0) {
          filterEmpl.forEach(async (empl) => {
            await deleteEmpl(empl.id)
          })
        }
      });
    }
  }

  const handleUpdate = async (company) => {
    if(company) {
      await updateCompany(company)
    }
  }

  return (
    <>
      {isError && <div className='table'>Error...</div>}
      {data && dataEmpl && !isLoading
        ? <div className='table'>
          <Menu active={modalActiveAdd} setActive={setModalActiveAdd} handleDelete={handleDelete}>
            <AddFormCompany setActive={setModalActiveAdd} handleCreate={handleCreate}/>
          </Menu>
          <TableHeader
            header={fourHeader}
            setIsAllActive={setIsAllActive}
            allCheckbox={allCheckbox}
            setAllCheckbox={setAllCheckbox}
            content={data}
          />
          {data.map((company, idkey) => {

            const cntEmpl = dataEmpl.filter(e => e.idCompany === company.id);

            company = {
              ...company,
              countEmp: cntEmpl.length
            }

            return (
              <TableRow
                key={idkey}
                content={company}
                isAllActive={isAllActive}
                allCheckbox={allCheckbox}
                handleUpdate={handleUpdate}
              />)
          })}
        </div>
        : <div className='table'>Загрузка...</div>}
      {companyChecked && companyChecked.length === 1 ?
        <TableEmployee
          idCompany={companyChecked[0].id}
        /> : <div className='table'>Выберете одну компанию для просмотра сотрудников</div>}
    </>
  );
}
