import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useUserCreate, useUserDelete, useUsers } from '../../../hooks/useUsers';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useForm } from 'react-hook-form';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const PageUsers = () => {
    const [visibleCreate , setVisibleCreate] = useState(false);
    const [levelSelected, setLevelSelected] = useState(1);
    const { 
        register: createData, 
        handleSubmit: createSubmit, 
        setValue: createValue, 
        reset: createReset 
    } = useForm({
        defaultValues: {
            level: 1
        }
    });
    const { 
        register: editData, 
        handleSubmit: editSubmit, 
        reset: editReset 
    } = useForm();
    const { data: usuarios } = useUsers();
    const useCreate = useUserCreate()
    const useDelete = useUserDelete()
     
    const createUser = (data) => {
        try {
            useCreate.mutateAsync(data);
            createReset();
            setVisibleCreate(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteUser = (id) => {
        try {
            useDelete.mutateAsync(id);
            setVisibleCreate(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    const toast = useRef();
    const sim = () => {
        toast.current.show({
            severity: 'info',
            detail: 'Item deletado'
        });
    }

    const confirm = () => {
        confirmDialog({
            header: 'Atenção',
            message: 'Deseja realmente apagar este item?',
            accept: sim(),
            acceptLabel: 'Sim',
            rejectLabel: 'Não'
        })
    }

    return (
        <>
            <div className={'flex justify-content-between mb-4'}>
            <h1>Usuários</h1>
            <Button onClick={() => setVisibleCreate(true)}>Novo usuário</Button>
            </div>

            <DataTable value={usuarios} paginator rows={10} rowsPerPageOptions={[5,10,25,50]}>
                <Column field="name" header="Nome"></Column>
                <Column field="email" header="Email"></Column>
                <Column header="Nível" body={(rowData) => (
                    <div className='bg-primary border-round text-light inline-block p-1'>
                        { rowData.level === 1 ? 'Usuario' : 'Admin'}
                    </div>
                )}></Column>
                <Column header={'Ações'} bodyClassName={'w-1'} body={(rowData) => (
                    <div className='flex gap-3'>
                        <Button rounded icon={'pi pi-pencil'} />
                        <Button 
                        rounded 
                        icon={'pi pi-trash'}
                        onClick={() => {
                            confirm();
                            // deleteUser(rowData.id);
                        }}    
                    />
                    </div>
                )} />
            </DataTable>

            <Sidebar
                visible={visibleCreate}
                onHide={() => setVisibleCreate(false)}
                position={'right'}
            >
                <form onSubmit={createSubmit(createUser)}>
                    <label htmlFor="name" className='block mb-1'>Nome</label>
                    <InputText
                        type='text'
                        id='name'
                        className='w-full mb-3'
                        placeholder='Digite seu nome'
                        {...createData('name', {required:true})}
                    />
                    <label htmlFor="email" className='block mb-1'>E-mail</label>
                    <InputText
                        type='text'
                        id='email'
                        className='w-full mb-3'
                        placeholder='Digite seu email' 
                        {...createData('email', {required:true})}
                    />
                    <label htmlFor="email" className='block mb-1'>Nível</label>
                    <Dropdown 
                        value={levelSelected}
                        onChange={(e) => {
                            setLevelSelected(e.value);
                            createValue('level', e.value);
                        }}
                        className='w-full'
                        options={[
                            {
                                level: 'user',
                                value: 1
                            },
                            {
                                level: 'admin',
                                value: 2
                            }
                        ]}
                        optionLabel='level'
                        optionValue='value'
                        
                    />

                    <Button
                        label='Salvar'
                        type='submit'
                        className='w-full mt-3' 
                    />
                </form>
            </Sidebar>

            <Toast ref={toast} />
            <ConfirmDialog />
        </>
    )
}

export default PageUsers;