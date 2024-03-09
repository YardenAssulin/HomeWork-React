import { useState, useEffect } from "react";
import ImageSearchOutlinedIcon from '@mui/icons-material/ImageSearchOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { PinkButton } from "./Style";
import { loadUsers, saveUsers, editUser } from './storage'
import Profile from "./Profile";

//defining messages for validation errors
const messages = {
    street: "Street should be in Hebrew only",
    birthDate: "Enter a proper Birth Date",
    password1: "Passwords do not match",
    image: "Image should be jpg or jpeg only",
    email: "Enter a valid email",
    streetNum: "Street number should be numbers only",
    existingUser: "This user already exists in the system",
    username: "Enter a valid username",
    firstName: "Enter a valid first name",
    lastName: "Enter a valid last name"
}

const cities = ["חיפה", "תל אביב", "מגדל העמק", "עכו", "ראשון לציון", "אילת", "באר שבע", "חדרה"]

function Register({ isEdit = false, user = undefined }) {

    const [register, setRegister] = useState({ username: '', password: '', password1: '', image: '', imageFile: '', firstName: '', lastName: '', email: '', birthDate: '', city: '', street: '', streetNum: '' })
    const [valid, setValid] = useState({})

    const changeHandler = (event) => {
        const fieldName = event.target.id;
        const value = event.target.value;
        setRegister({ ...register, [fieldName]: value });
    }


    const changeImageHandler = (event) => {
        // start file image reading
        const reader = new FileReader();
        reader.onload = () => {
            try {
                localStorage.setItem("temp", JSON.stringify({ image: reader.result }))
                setRegister({ ...register, image: reader.result, imageFile: event.target.value });
                localStorage.removeItem("temp")
                setValid({ ...valid, image: undefined })
            } catch (err) {
                if (err.code == DOMException.QUOTA_EXCEEDED_ERR) {
                    setValid({ ...valid, image: "Image too large" })
                } else {
                    setValid({ ...valid, image: "an unknown error has occurred" })
                }
            }

        }
        reader.readAsDataURL(event.target.files[0])
    }

    const registerUser = (event) => {
        event.preventDefault();
        let isValid = true;
        const now = new Date();
        const specialSigns = "!@#$%^&*()-_[]{}+=";
        let v = { ...valid };

        //password validation
        let hasCapitalLetter = false;
        let hasSpecialSign = false;
        let hasNumber = false;
        //validate password length
        if (register.password.length < 7 || register.password.length > 12) {
            setValid({ ...valid, password: "password must be between 7 nd 12 chars" });
            return;
        }
        //validate password chars
        for (let i = 0; i < register.password.length; i++) {
            const c = register.password[i];
            if (c >= 'A' && c <= 'Z') {
                hasCapitalLetter = true;
            }
            if (c >= '0' && c <= '9') {
                hasNumber = true;
            }
            if (specialSigns.includes(c)) {
                hasSpecialSign = true;
            }
        }
        if (hasCapitalLetter == false || hasSpecialSign == false || hasNumber == false) {
            setValid({ ...v, password: "password must include a least onr capital letter, ome special sign and one number" });
            return;
        } else {
            v = { ...v, password: undefined }
        }
        //validate two passwords match
        if (!handleError(v, "password1", register.password === register.password1)) { return; }
        //validate image in the right form
        if (!handleError(v, "image", (register.imageFile.toUpperCase().endsWith("JPG") || register.imageFile.toUpperCase().endsWith("JPEG")))) { return; }
        //validate email in the right form
        if (!handleError(v, "email", register.email.endsWith(".com"))) { return; }
        //userName validation
        for (let i = 0; i < register.username.length; i++) {
            const c = register.username[i];
            if (!(c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' ||
                c >= '0' && c <= '9' || specialSigns.includes(c))) {
                isValid = false;
            }
        }
        //validate userName length
        if (register.username.length > 60) {
            isValid = false;
        }
        if (!handleError(v, "username", isValid)) { return; }
        //firstName validation
        isValid = true;
        for (let i = 0; i < register.firstName.length; i++) {
            const c = register.firstName[i];
            if (!(c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z')) {
                isValid = false;
            }
        }
        if (!handleError(v, "firstName", isValid)) { return; }
        //lastName validation
        isValid = true;
        for (let i = 0; i < register.lastName.length; i++) {
            const c = register.lastName[i];
            if (!(c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z')) {
                isValid = false;
            }
        }
        if (!handleError(v, "lastName", isValid)) { return; }
        //BirthDate validation
        const birthDate = new Date(register.birthDate);
        const yearsDifference = (now.getTime() - birthDate.getTime()) / 1000 / 60 / 60 / 24 / 365;
        if (!handleError(v, "birthDate", yearsDifference > 18 && yearsDifference < 120)) { return; }
        //street validation
        isValid = true;
        for (let i = 0; i < register.street.length; i++) {
            const c = register.street[i];
            if (!(c >= 'א' && c <= 'ת')) {
                isValid = false;
            }
        }

        if (!handleError(v, "city", cities.includes(register.city))) return;
        if (!handleError(v, "street", isValid)) { return; }
        if (!handleError(v, "streetNum", (+register.streetNum) > 0)) { return; }

        //usere in localStorage
        if (isEdit === false) {   // registering a new user
            const users = loadUsers();
            const existingUser = users.find(u => u.email === register.email);
            if (!handleError(v, "existingUser", existingUser === undefined)) {
                return;
            }
            if (!existingUser) {
                users.push(register);
                saveUsers(users);
            }
        }

        setValid(v)
    }

    //defining the handleError method 
    const handleError = (v, fieldName, isValid) => {
        if (isValid == false) {
            setValid({ ...v, [fieldName]: messages[fieldName] });
            return false;
        } else {
            v[fieldName] = undefined;
            return true;
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ padding: 20 }}>
                <h1>Registration Form:</h1>
            </div>
            <div style={{ paddingLeft: '35%', textAlign: 'left', fontWeight: 'bold', width: '100%', display: 'flex' }}>
                <form onSubmit={registerUser}>
                    <div style={{ flex: 1 }}>
                        <div style={{ paddingBottom: 5 }}>
                            <label>Enter UserName: </label>
                            <input style={{ marginLeft: 20 }} type="text" id="username" value={register.username} onChange={changeHandler} required placeholder="Your username" />
                            <p style={{ backgroundColor: valid.username ? 'pink' : 'initial', color: valid.username ? 'red' : 'inherit', fontWeight: 'bold' }}>{valid.username}</p>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <label>Enter Password: </label>
                            <input style={{ marginLeft: 23 }} type="password" id="password" value={register.password} required onChange={changeHandler} placeholder="Your password" />
                            <p style={{ backgroundColor: valid.password ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.password}</p>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <label>Verify Password: </label>
                            <input style={{ marginLeft: 19 }} type="password" id="password1" value={register.password1} required onChange={changeHandler} placeholder="repeat password" />
                            <p style={{ backgroundColor: valid.password1 ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.password1}</p>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <ImageSearchOutlinedIcon />
                            <label>Upload Image: </label>
                            <input style={{ marginLeft: 11 }} type="file" id="image" required onChange={changeImageHandler} />
                            <p style={{ backgroundColor: valid.image ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.image}</p>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <label>First Name: </label>
                            <input style={{ marginLeft: 55 }} type="text" id="firstName" value={register.firstName} onChange={changeHandler} required placeholder="Your first name" />
                            <p style={{ backgroundColor: valid.firstName ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.firstName}</p>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <label>Last name: </label>
                            <input style={{ marginLeft: 57 }} type="text" id="lastName" value={register.lastName} onChange={changeHandler} required placeholder="Your last name" />
                            <p style={{ backgroundColor: valid.lastName ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.lastName}</p>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <label>Email: </label>
                            <input style={{ marginLeft: 92 }} type="email" id="email" value={register.email} onChange={changeHandler} required disabled={isEdit} placeholder="Your email" />
                            <p style={{ backgroundColor: valid.email ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.email}</p>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <label>Birth Date: </label>
                            <input style={{ marginLeft: 60 }} type="Date" id="birthDate" value={register.birthDate} required onChange={changeHandler} />
                            <p style={{ backgroundColor: valid.birthDate ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.birthDate}</p>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <label>City: </label>
                            <input style={{ marginLeft: 104 }} list="cityList" type="text" id="city" value={register.city} onChange={changeHandler} required placeholder="Enter your city" />
                            <p style={{ backgroundColor: valid.city ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.city}</p>
                            <datalist id="cityList">
                                {
                                    cities.map(c => <option key={c} value={c}></option>)
                                }
                            </datalist>

                        </div>
                        <div>
                            <label style={{ paddingBottom: 3 }}>Street: </label>
                            <input style={{ marginLeft: 89 }} type="text" id="street" value={register.street} onChange={changeHandler} required placeholder="Enter your street" />
                            <p style={{ backgroundColor: valid.street ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.street}</p>
                        </div>
                        <div>
                            <label style={{ paddingBottom: 3 }}>Street Number: </label>
                            <input style={{ marginLeft: 28 }} type="number" id="streetNum" value={register.streetNum} onChange={changeHandler} required placeholder="Enter your street number" />
                            <p style={{ backgroundColor: valid.streetNum ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.streetNum}</p>
                        </div><br />
                        <div>
                            <PinkButton style={{ marginLeft: 85 }} size="large" variant="contained" type="submit" startIcon={<PublishIcon />}>Submit</PinkButton>
                            <p style={{ backgroundColor: valid.existingUser ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{valid.existingUser}</p>
                        </div>
                    </div>
                </form>
                <div style={{ flex: 1, border: 'solid pink', fontWeight: 'bold', width: '400px' }}>
                    <p style={{ padding: 2 }}><PriorityHighIcon />UserName must be in English, numbers, and special characters.</p>
                    <p style={{ padding: 2 }}><PriorityHighIcon /> Password must contain at least one special character, one number and one capital letter.</p>
                    <p style={{ padding: 2 }}><PriorityHighIcon />Image should be in JPG or JPEG format only.</p>
                    <p style={{ padding: 2 }}><PriorityHighIcon />The user can't be under 18 or above 120 years old.</p>
                    <p style={{ padding: 2 }}><PriorityHighIcon />City should be chosen from the list.</p>
                    <p style={{ padding: 2 }}><PriorityHighIcon />Sreet should to be in Hebrew only.</p>
                </div>

            </div>

        </div>
    )
}


export default Register;