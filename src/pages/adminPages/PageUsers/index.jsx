import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PageUsers = () => {
    const [visibleCreate , setVisibleCreate] = useState(false);
    const usuarios = [
        {
            nome:'Davi',
            email: 'davi@gmail.com',
            level: 'user'
        },
        {
            nome:'Mateus',
            email: 'mateus@gmail.com',
            level: 'admin'
        }
    ]
    return (
        <>
            <div className={'flex justify-content-between mb-4'}>
            <h1>Usuários</h1>
            <Button onClick={() => setVisibleCreate(true)}>Novo usuário</Button>
            </div>

            <DataTable value={usuarios} paginator rows={10} rowsPerPageOptions={[5,10,25,50]}>
                <Column field="nome" header="Nome"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="level" header="Nível"></Column>
                <Column header={'Ações'} body={() => (
                    <div className='flex gap-3'>
                        <Button rounded icon={'pi pi-pencil'} />
                        <Button rounded icon={'pi pi-trash'} />
                    </div>
                )} />
            </DataTable>

            <Sidebar
                visible={visibleCreate}
                onHide={() => setVisibleCreate(false)}
                position={'right'}
            >
                alguma coisa
            </Sidebar>
        </>
    )
}

export default PageUsers;