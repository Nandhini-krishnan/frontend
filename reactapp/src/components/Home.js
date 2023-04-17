import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, deleteUser } from '../redux/actions/userActions';
import './Home.css';

function Home() {
    let element;
    const dispatch = useDispatch();
    const { users } = useSelector(state => state);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            dispatch(deleteUser(id))
        }
    }

    if (users.length) {
        element = users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.user.name}</td>
                    <td>{user.user.email}</td>
                    <td>{user.user.gender}</td>
                    <td>{user.user.mobileNumber}</td>
                    <td>{user.user.dateOfBirth}</td>
                    <td>{user.user.address}</td>
                    <td>{user.user.country}</td>
                    <td>
                        <Link to={`/update/${user.id}`}>
                            <button type="button" className="edit-btn">Edit</button>
                        </Link>{'\u00A0'}
                        <button type="button" className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    } else {
        element = <tr><td className="center" colSpan="8">No records found</td></tr>
    }

    return (
        <div className="container">
            <div className="add-user">
                <Link to={"/add"}>
                    <button type="button" className="add-btn">Create user</button>
                </Link>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mail Id</th>
                            <th>Gender</th>
                            <th>Mobile Number</th>
                            <th>Date Of Birth</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {element}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;