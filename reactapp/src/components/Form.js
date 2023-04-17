import { useNavigate } from 'react-router-dom';
import './Form.css';

function Form({ user, formErrors, handleFormValues, handleSubmit, id }) {
    const navigate = useNavigate();

    return (
        <div className="modal">
            <div className="header">
                <h3>REGISTRATION FORM</h3>
                <i className="fa-solid fa-xmark close" onClick={() => navigate(-1)}></i>
            </div>
            <form id="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="name"><i className="fa-regular fa-user"></i></label>
                        <input id="name" type="text" name="name" value={user.name} onChange={handleFormValues} placeholder="Enter your Name" />
                    </div>
                    <div className="error-container">{formErrors.name}</div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="email"><i className="fa-regular fa-envelope"></i></label>
                        <input id="email" type="email" name="email" value={user.email} onChange={handleFormValues} placeholder="Enter your Mail-id" />
                    </div>
                    <div className="error-container">{formErrors.email}</div>
                </div>
                <div className="form-group">
                    <div className="gender">
                        <span>Gender :</span>
                        <p>
                            <input id="male" type="radio" name="gender" onChange={handleFormValues} value="Male" checked={user.gender === "Male"} />
                            <label htmlFor="male">Male</label>
                            <input id="female" type="radio" name="gender" onChange={handleFormValues} value="Female" checked={user.gender === "Female"} />
                            <label htmlFor="female">Female</label>
                        </p>
                    </div>
                    <div className="error-container">{formErrors.gender}</div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="mobile"><i className="fa-solid fa-mobile-screen"></i></label>
                        <input id="mobileNumber" type="tel" name="mobileNumber" value={user.mobileNumber} onChange={handleFormValues} placeholder="Enter your mobile number" />
                    </div>
                    <div className="error-container">{formErrors.mobileNumber}</div>
                </div>
                <div className="form-group date">
                    <div className="gender">
                        <label htmlFor="dateOfBirth">Date of Birth :</label>
                        <input id="dateOfBirth" type="date" name="dateOfBirth" onChange={handleFormValues} value={user.dateOfBirth} />
                    </div>
                    <div className="error-container">{formErrors.dateOfBirth}</div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="address"><i className="fa fa-home"></i></label>
                        <textarea id="address" name="address" className="address" value={user.address} onChange={handleFormValues} placeholder="Enter your address"></textarea>
                    </div>
                    <div className="error-container">{formErrors.address}</div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <select id="country" name="country" value={user.country} onChange={handleFormValues} className="location">
                            <option value="" hidden={true}>Select a Country</option>
                            <option value="India">India</option>
                            <option value="South Korea">South Korea</option>
                            <option value="USA">USA</option>
                            <option value="canada">Canada</option>
                        </select>
                    </div>
                    <div className="error-container">{formErrors.country}</div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
                        <input id="password" type="password" name="password" value={user.password} onChange={handleFormValues} placeholder="Enter your password"></input>
                    </div>
                    <div className="error-container">{formErrors.password}</div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="confirmPassword"><i className="fa-solid fa-lock"></i></label>
                        <input id="confirmPassword" type="password" name="confirmPassword" onChange={handleFormValues} value={user.confirmPassword}
                            placeholder="Confirm your password"></input>
                    </div>
                    <div className="error-container">{formErrors.confirmPassword}</div>
                </div>
                <div className="submit-btn">
                    <input id="submit" type="submit" value={id ? "Update" : "Create"} />
                </div>
            </form>
        </div>
    )
}

export default Form;