import { useEffect, useState } from 'react';
import { loadUsers, saveUsers, adminEditUser } from './storage';
import EditProfile from './EditProfile'
import { EditeButton, DeleteButton } from "./Style"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

function SystemAdmin() {
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        onLoadUsers()
    }, [])

    const deleteUser = (email) => {
        const tempUsers = registeredUsers.filter(u => u.email !== email);
        setRegisteredUsers(tempUsers)
        saveUsers(tempUsers)
    }
    const toggleShowEdit = (user) => {
        setSelectedUser(user)
    }

    const onLoadUsers = () => {
        const users = loadUsers();
        setRegisteredUsers(users)
    }

    return (
        <div>
            <h1 style={{ color: 'palevioletred' }}>The Users In The System:</h1><br />
            <table style={{ direction: 'rtl', width: '1300px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: 'pink', border: '1px solid black' }}>
                        <th style={{ textAlign: 'center' }}>שם משתמש</th>
                        <th style={{ textAlign: 'center' }}>שם מלא</th>
                        <th style={{ textAlign: 'center' }}>תאריך לידה</th>
                        <th style={{ textAlign: 'center' }}>כתובת</th>
                        <th style={{ textAlign: 'center' }}>דואר אלקטרוני</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {

                        registeredUsers.map(u => {
                            return (
                                <tr style={{ border: '1px solid black' }} key={u.email}>
                                    <td style={{ textAlign: 'right' }}><img style={{ width: '30px' }} src={u.image} alt="profile picture" /> {u.username}</td>
                                    <td style={{ textAlign: 'center' }}>{u.firstName + " " + u.lastName}</td>
                                    <td style={{ textAlign: 'center' }}>{new Date(u.birthDate).toLocaleString()}</td>
                                    <td style={{ textAlign: 'center' }}>{`${u.street} ${u.streetNum}, ${u.city}`}</td>
                                    <td style={{ textAlign: 'center' }}>{u.email}</td>
                                    <td style={{ textAlign: 'center' }}><DeleteButton startIcon={<DeleteForeverIcon />} onClick={() => deleteUser(u.email)}></DeleteButton><EditeButton startIcon={<EditIcon />} onClick={() => toggleShowEdit(u)}></EditeButton></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {selectedUser !== null && <EditProfile user={selectedUser} updateUser={onLoadUsers} adminEditUser={adminEditUser} />}
        </div>
    )

}

export default SystemAdmin;