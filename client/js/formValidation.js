const url = "http://localhost:3000/users/";
const tableContainer = document.querySelector(".table-container");
const submit = document.getElementById("submit");
const overlay = document.querySelector(".overlay");
const loader = document.querySelector(".loader");
let updateId = "";
getUsers();

class Validation {
    isValidPassword = false;
    user = {
        name: "",
        email: "",
        gender: "",
        mobileNumber: "",
        dateOfBirth: "",
        address: "",
        country: "",
        password: "",
        confirmPassword: ""
    };

    displayError = (index, message) => {
        const formGroup = document.getElementsByClassName("form-group")[index];
        formGroup.classList.add("error");
        formGroup.getElementsByClassName("error-container")[0].textContent = message;
        this.isInvalidInput = true;
    };

    displaySuccess = (index) => {
        const formGroup = document.getElementsByClassName("form-group")[index];
        formGroup.classList.remove("error");
        formGroup.classList.add("success");
    };

    getInputs = () => {
        this.user.name = document.getElementById("name").value.trim();
        this.user.email = document.getElementById("email").value.trim();
        const genderElement = document.querySelectorAll('input[name="gender"]')
        genderElement.forEach(element => {
            if (element.checked) {
                this.user.gender = element.value;
            }
        })
        this.user.mobileNumber = document.getElementById("mobileNumber").value.trim();
        this.user.dateOfBirth = document.getElementById("dateOfBirth").value.trim();
        this.user.address = document.getElementById("address").value.trim();
        this.user.country = document.getElementById("location").value.trim();
        this.user.password = document.getElementById("password").value.trim();
        this.user.confirmPassword = document.getElementById("confirmPassword").value.trim();
    };

    validateName = () => {
        const regExp = /^[a-zA-Z\s\.]+$/
        if (this.user.name === "") {
            this.displayError(0, "Name is required");
        } else if (!regExp.test(this.user.name)) {
            this.displayError(0, "Name should contain only alphabets");
        } else {
            this.displaySuccess(0);
        }
    };

    validateEmail = () => {
        const regExp = /^([\w\-\.]+)@([\w]+)\.([a-zA-Z]{2,10})$/;
        if (this.user.email === "") {
            this.displayError(1, "E-mail is required");
        } else if (!regExp.test(this.user.email)) {
            this.displayError(1, "invalid E-mail");
        } else {
            this.displaySuccess(1);
        }
    };

    validateGender = () => {
        if (!this.user.gender) {
            this.displayError(2, "Please select the gender");
        } else {
            this.displaySuccess(2);
        }
    };

    validateMobileNumber = () => {
        const regExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (this.user.mobileNumber === "") {
            this.displayError(3, "Mobile number is required");
        } else if (!regExp.test(this.user.mobileNumber)) {
            this.displayError(3, "invalid mobile number");
        } else {
            this.displaySuccess(3);
        }
    };

    validateAge = () => {
        if (!(this.user.dateOfBirth === "")) {
            const date = new Date(this.user.dateOfBirth);
            const difference = Date.now() - date.getTime();
            var ageDate = new Date(difference);
            var calculatedAge = Math.abs(ageDate.getFullYear() - 1970);

            if (!(calculatedAge > 18 && calculatedAge < 100)) {
                this.displayError(4, "Age should be in between 18 and 100");
            } else {
                this.displaySuccess(4);
            }
        } else {
            this.displayError(4, "Please select date of birth");
        }
    };

    validateAddress = () => {
        if (this.user.address === "") {
            this.displayError(5, "Please enter the address");
        } else {
            this.displaySuccess(5);
        }
    };

    validateCountry = () => {
        if (this.user.country === "") {
            this.displayError(6, "Please select the country");
        } else {
            this.displaySuccess(6);
        }
    };

    validatePassword = () => {
        const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (this.user.password === "") {
            this.displayError(7, "Please enter your password");
        } else if (!regExp.test(this.user.password)) {
            this.displayError(7, "Password should contain atleast one number and one special character with minimum length of 6");
        } else {
            this.displaySuccess(7);
            this.isValidPassword = true;
        }
    };

    validateConfirmPassword() {
        if (this.user.confirmPassword === "") {
            this.displayError(8, "Please confirm your password");
        } else if (!(this.user.password === this.user.confirmPassword)) {
            this.displayError(8, "Password must match");
        } else if (!this.isValidPassword) {
            this.displayError(8, "Password should contain atleast one number and one special character with minimum length of 6");
        } else {
            this.displaySuccess(8);

        }
    };
}

const userInputs = new Validation();

function resetForm() {
    const formGroups = document.querySelectorAll(".form-group");
    formGroups.forEach(formGroup => {
        formGroup.className = "";
        formGroup.className = "form-group";
    })
    document.querySelector("form").reset();
}

function isValidInput() {
    let isValid = true;
    const formGroups = document.querySelectorAll(".form-group");
    formGroups.forEach(formGroup => {
        if (formGroup.classList.contains("error")) {
            isValid = false;
        }
    })
    return isValid;
}

document.querySelector(".close").addEventListener("click", () => {
    toggleForm();
})

document.querySelector(".add-user").addEventListener("click", () => {
    submit.value = "Submit";
    resetForm()
    toggleForm();
})

function toggleForm() {
    document.querySelector(".container").classList.toggle("blur");
    document.querySelector(".modal").classList.toggle("display");
}

submit.addEventListener("click", event => {
    event.preventDefault();
    userInputs.getInputs();
    userInputs.validateName();
    userInputs.validateEmail();
    userInputs.validateGender();
    userInputs.validateMobileNumber();
    userInputs.validateAge();
    userInputs.validateAddress();
    userInputs.validateCountry();
    userInputs.validatePassword();
    userInputs.validateConfirmPassword();
    if (isValidInput()) {
        displayLoader();
        if (submit.value === "Submit") {
            addUser();
        }
        if (submit.value === "Update") {
            editUser(updateId);
            submit.value = "Submit";
        }
    } else {
        alert("Please give valid inputs");
    }
});

tableContainer.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.getAttribute("job") === "delete") {
        deleteUser(event.target.id);
    } else if (event.target.getAttribute("job") === "edit") {
        updateId = event.target.id;
        getUserById(updateId).then(user => populateForm(user));
     }
})

function displayLoader() {
    overlay.style.display = "block";
    loader.style.display = "block";
    setTimeout(() => {
        overlay.style.display = "none";
        loader.style.display = "none";
    }, 5000);
}

function hideLoader() {
    overlay.style.display = "none";
    loader.style.display = "none";
}

function addUser() {
    displayLoader();
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInputs.user)
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Something went wrong!");
        }
    }).then(() => {    
        toggleForm();
        resetForm();
        alert("User created successfully");    
        getUsers();
    }).catch(error => console.log(error))
}

function getUsers() {
    tableContainer.innerHTML = "";
    fetch(url).then(res => res.json())
        .then(users => {
            let table = `<table class="table">
            <tr>
                <th>Name</th>
                <th>Mail Id</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Date Of Birth</th>
                <th>Address</th>
                <th>Country</th>
                <th>Options</th>
            </tr>`
            if (users.length) {
                users.forEach(user => {
                    table += `<tr>
                    <td>${user.user.name}</td>
                    <td>${user.user.email}</td>
                    <td>${user.user.gender}</td>
                    <td>${user.user.mobileNumber}</td>
                    <td>${user.user.dateOfBirth}</td>
                    <td>${user.user.address}</td>
                    <td>${user.user.country}</td>
                    <td><button type="button" class="edit-btn" job="edit" id="${user.id}">Edit</button>&nbsp
                    <button type="button" class="delete-btn" job="delete" id="${user.id}">Delete</button></td>
                </tr>`
                })
            } else {
                table += `<tr><td class="center" colspan = "8">No records found</td></tr>`
            }
            table += '</table>'
            tableContainer.innerHTML += table;
        })
}

function deleteUser(id) {
    if (confirm("Are you sure you want to delete?")) {
        fetch(url + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(user => {
            alert(JSON.stringify(user.message))
            getUsers();
        });
    }
}

function getUserById(id) {
    return fetch(url + id).then(res => res.json()).then(user => {
        return user;
    });
}

function populateForm(user) {
    document.getElementById("name").value = user.user.name;
    document.getElementById("email").value = user.user.email;
    const genderElement = document.querySelectorAll('input[name="gender"]')
    genderElement.forEach(element => {
        if (element.value === user.user.gender) {
            element.checked = true;
        }
    })
    document.getElementById("mobileNumber").value = user.user.mobileNumber;
    document.getElementById("dateOfBirth").value = user.user.dateOfBirth;
    document.getElementById("address").value = user.user.address;
    document.getElementById("location").value = user.user.country;
    document.getElementById("password").value = user.user.password;
    document.getElementById("confirmPassword").value = user.user.confirmPassword;
    submit.value = "Update";
    toggleForm();
}

function editUser(id) {
    fetch(url + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInputs.user)
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Something went wrong!");
        }
    }).then(() => {
        resetForm()
        alert("User updated successfully");
        getUsers();
        toggleForm();
    }).catch(error => console.log(error))
}


