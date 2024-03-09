import { useState, useEffect } from 'react';
import { logoutUser } from './storage'
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import { LogOutButton, GameButton, UpdateButton } from "./Style";
import LogoutIcon from '@mui/icons-material/Logout';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import UpgradeIcon from '@mui/icons-material/Upgrade';

const Profile = ({ setIsloggedin }) => {
    const [user, setUser] = useState({});
    const [showEdit, setShowEdit] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const rawUser = sessionStorage.getItem("login");
        if (rawUser) {
            const user = JSON.parse(rawUser);
            setUser(user)
        } else {
            navigate('/')
        }
    }, [])

    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    const toggleShowEdit = () => {
        setShowEdit(!showEdit)
    }

    const onLogout = () => {
        const logoutSuccess = logoutUser(user.email); {
            if (logoutSuccess) {
                setIsloggedin(false);
                navigate("/");
            }
        }
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <img style={{ borderRadius: '200px', width: '150px' }} src={user.image} alt="profile picture" />
                <div>
                    <h1 style={{ color: 'pink' }}>My Profile</h1>
                    <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <PersonIcon style={{ marginRight: '5px' }} />
                        {user.firstName} {user.lastName}
                    </h3><br />
                    <p style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <EmailIcon style={{ marginRight: '5px' }} />
                        {user.email}
                    </p><br />
                    <p style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <HomeIcon style={{ marginRight: '5px' }} />
                        {user.street} {user.streetNum}, {user.city}
                    </p><br />
                    <p style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <CakeIcon style={{ marginRight: '5px' }} />
                        {new Date(user.birthDate).toLocaleDateString()}
                    </p>
                    <div>
                        <UpdateButton startIcon={<UpgradeIcon />} onClick={toggleShowEdit}>עדכון פרטים</UpdateButton>
                        <a href="https://www.bubbleshooter.net/"><GameButton startIcon={<SportsEsportsIcon />}>מעבר למשחק</GameButton></a>
                        <LogOutButton startIcon={<LogoutIcon />} onClick={onLogout}> התנתק</LogOutButton>
                    </div>
                </div>
            </div>
            {showEdit === true && <EditProfile user={user} updateUser={updateUser} />}
        </div>
    )
}

export default Profile;