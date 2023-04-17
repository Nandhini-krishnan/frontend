import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import Form from "./Form.js";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUserById, updateUser } from '../redux/actions/userActions.js';

//const url = "http://localhost:5000/users/";
const initialValues = {
    name: "",
    email: "",
    gender: "",
    mobileNumber: "",
    dateOfBirth: "",
    address: "",
    country: "",
    password: "",
    confirmPassword: ""
}

function CreateOrUpdate() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const singleUser = useSelector((state) => (state.user))

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id));
            if (singleUser) {
                setUser({ ...singleUser });
            }
        }
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            id ? dispatch(updateUser(id, user)) : dispatch(addUser(user));
            navigate(-1);
        }
    }, [formErrors, singleUser.name]);

    const formValidation = () => {
        let isValidPassword = false;
        const errors = {};
        const nameRegExp = /^[a-zA-Z\s.]+$/;
        const emailRegExp = /^([\w-.]+)@([\w]+)\.([a-zA-Z]{2,10})$/;
        const mobileRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        const passwordRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

        if (!user.name) {
            errors.name = "Name is required";
        } else if (!nameRegExp.test(user.name)) {
            errors.name = "Name should contain only alphabets";
        }

        if (!user.email) {
            errors.email = "E-mail is required";
        } else if (!emailRegExp.test(user.email)) {
            errors.email = "invalid E-mail";
        }

        if (!user.gender) {
            errors.gender = "Please select the gender";
        }

        if (!user.mobileNumber) {
            errors.mobileNumber = "Mobile number is required";
        } else if (!mobileRegExp.test(user.mobileNumber)) {
            errors.mobileNumber = "invalid mobile number";
        }

        if (user.dateOfBirth) {
            const date = new Date(user.dateOfBirth);
            const difference = Date.now() - date.getTime();
            var ageDate = new Date(difference);
            var calculatedAge = Math.abs(ageDate.getFullYear() - 1970);

            if (!(calculatedAge > 18 && calculatedAge < 100)) {
                errors.dateOfBirth = "Age should be in between 18 and 100";
            }
        } else {
            errors.dateOfBirth = "Please select date of birth";
        }

        if (!user.address) {
            errors.address = "Please enter the address";
        }

        if (!user.country) {
            errors.country = "Please select the country";
        }

        if (!user.password) {
            errors.password = "Please enter your password";
        } else if (!passwordRegExp.test(user.password)) {
            errors.password = "Password should contain atleast one number and one special character with minimum length of 6";
        } else {
            isValidPassword = true;
        }

        if (!user.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (!(user.password === user.confirmPassword)) {
            errors.confirmPassword = "Password must match";
        } else if (!isValidPassword) {
            errors.confirmPassword = "Password should contain atleast one number and one special character with minimum length of 6";
        }

        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmit(true);
        setFormErrors(formValidation());
    }

    // const getUserById = async (id) => {
    //     const response = await axios.get(url + id);
    //     if (response.status === 200) {
    //         setUser(response.data.user);
    //     }
    // }

    const handleFormValues = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    // const addUser = async (data) => {
    //     const response = await axios.post(url, data);
    //     if (response.status === 200) {
    //         alert("user created successfully");
    //     }
    // }

    // const updateUser = async (data, id) => {
    //     const response = await axios.put(url + id, data);
    //     if (response.status === 200) {
    //         alert("User updated successfully");
    //     }
    // }

    return (
        <Form user={user} formErrors={formErrors} handleFormValues={handleFormValues} handleSubmit={handleSubmit} id={id} />
    )
}

export default CreateOrUpdate;