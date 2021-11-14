import React, { useState, useEffect } from 'react';
import { Form, Container, Button, Modal } from "react-bootstrap";
import "./Register.css";
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
// import { Modal } from 'react-responsive-modal';

const Register = (props) => {

    let history = useHistory();

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);



    const [existingStudentId, setExistingStudentId] = useState();
    const [editMode, setEditMode] = useState(false);


    const [apiRecords, setApiRecords] = useState([]);
    const [userRecords, setUserRecords] = useState({
        username: "",
        birthdate: "",
        address: "",
        gender: "",
        college: "",
        hobbies: { reading: "", gaming: "", traveling: "", drawing: "" }
    });

    const [error, setError] = useState({
        username: false,
        birthdate: false,
        address: false,
        gender: false,
        college: false,

    })

    useEffect(() => {
        collegeListData();
    }, []);

    const collegeListData = () => {
        //we are getting data through api--method: 'GET' called
        const apiKey = "http://universities.hipolabs.com/search?name=Middle";
        fetch(apiKey).then(res => {
            console.log("res", res);
            return res.json();
        }).then(data => {
            setApiRecords(data);
            console.log("data", data);
        });

    }

    useEffect(() => {

        // update record fetch api call
        let studentId = props.history.location.studentId;
        console.log("studentId", studentId);

        if (studentId) {
            setExistingStudentId(studentId)
            setEditMode(true)
            fetch(`https://6130765d5fc50700175f18e9.mockapi.io/student/${parseInt(studentId)}`)
                .then(result => { return result.json() })
                .then(response => {
                    console.log("Data for Students", response);
                    setUserRecords({
                        username: response.username, birthdate: response.birthdate, address: response.address, gender: response.gender,
                        college: response.college,
                        hobbies: {
                            reading: response.reading,
                            gameing: response.gameing,
                            traveling: response.traveling,
                            drawing: response.drawing,
                            other: response.other,
                        }
                    })
                })
        }
    }, [])

    const createRecord = () => {
        // e.preventDefault(); //written to prevent the refresh browser effect(if the form is in <form> tag)
        console.log("userRecords", userRecords);
        let data = userRecords;
        //let allData = localStorage.getItem("tableData");
        //let newData = [];

        //method: "POST" api call 
        //fetch("1-url",{2-request-option{a-method,b-headers,c-body}}).then(response)/.catch(error)
        fetch("https://618eb8c250e24d0017ce1403.mockapi.io/student", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)  //body will take request json
        })
            .then(result => { return result.json() })
            .then(response => {
                alert("Add Data Successfully");
                history.push("/userlist");
                //pushing the data to the table i.e DetailScreen component
                console.log("response", response);
            }).catch(error => {
                console.log("Error in adding student", error)
                alert("Error in adding student")
            })  //api end
        }


        const updateRecord = () => {

            let data = userRecords;
            //  `within `back-tick ` element-called  TEMPLATE STRING LITERAL`
            fetch(`https://618eb8c250e24d0017ce1403.mockapi.io/student/${parseInt(existingStudentId)}`, {
                method: "PUT",
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)  //body will take request json
            }).then(result => result.json())
                .then(response => {
                    alert("Record has been updated succesfully")
                    props.history.push('/userlist');
                }).catch(error => {
                    console.log("Error", error)
                    alert("Something went wrong while updating")
                })
        }


        const onRegistrationComplete = (e) => {
          e.preventDefault()
            if (editMode === true) {
                updateRecord();
            }
            if (editMode === false) {
                createRecord();
            }
        }


        const onDelete = (e) => {
            e.preventDefault();
            //delete api
            fetch(`https://618eb8c250e24d0017ce1403.mockapi.io/student/${parseInt(existingStudentId)}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(result => { return result.json() })
                .then(response => {
                    console.log("response", response);
                    alert("Record has been deleted succesfully")
                    props.history.push("/userlist");
                }).catch(error => {
                    console.log("error", error)
                    alert("Something went wrong")
                })
    
        }


    const onRegistration = (e) => {
    
        console.log("submitted", userRecords);

        if (!userRecords.username) {
            setError({ ...error, username: true })
            return;
        } else {
            setError({ ...error, username: false })
        }

        if (!userRecords.birthdate) {
            setError({ ...error, birthdate: true })
            return;
        }
        if (!userRecords.address) {
            setError({ ...error, address: true })
            return;
        }
        if (!userRecords.gender) {
            setError({ ...error, gender: true })
            return;
        }
        if (!userRecords.college) {
            setError({ ...error, college: true })
            return;
        }
        createRecord()

    }

    const onSubmitForm = (data) => {
        console.log("Form Validation", data);
    }

    return (

        <>
        
        <Container className=" mt-5 mb-4">
        <button onClick={onOpenModal}>Add User</button>
             <Modal show={open} onHide={onCloseModal}>
            <Form>
                <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-6 ms-auto me-auto ">
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control id="txtName" value={userRecords.username} type="text" placeholder="Enter Your Name"
                        onChange={(e) => {
                            setUserRecords({ ...userRecords, username: e.target.value })
                            setError({ ...error, username: false })
                        }} />
                    {error.username && <p className="text-danger">User Name is required*</p>}

                </Form.Group>

                <Form.Group className="mb-3 col-sm-6 ms-auto me-auto ">
                    <Form.Label>Birth Date:</Form.Label>
                    <Form.Control id="txtDob" value={userRecords.birthdate} type="date"
                        onChange={(e) => {
                            setUserRecords({ ...userRecords, birthdate: e.target.value })
                            setError({ ...error, birthdate: false })
                        }} />
                    {error.birthdate && <p className="text-danger">This field is required*</p>}
                </Form.Group>

                <Form.Group className="mb-3 col-sm-6 ms-auto me-auto ">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control id="txtAddress" value={userRecords.address} as="textarea" rows="2" placeholder="Enter Your Address"
                        onChange={(e) => {
                            setUserRecords({ ...userRecords, address: e.target.value })
                            setError({ ...error, address: false })
                        }} />
                    {error.address && <p className="text-danger">This field is required*</p>}
                </Form.Group>


                <Form.Group className="mb-3 d-flex col-sm-6 ms-auto me-auto" >
                    <Form.Label >Gender:</Form.Label>
                    <Form.Label className="mx-2">Male:</Form.Label>
                    <Form.Check checked={userRecords.gender === "Male"} onChange={(e) => { setUserRecords({ ...userRecords, gender: e.target.value }) }} type="radio" name="Gender" value="Male" />
                    <Form.Label className="mx-2">Female:</Form.Label>
                    <Form.Check checked={userRecords.gender === "Female"} onChange={(e) => { setUserRecords({ ...userRecords, gender: e.target.value }) }} type="radio" name="Gender" value="Female" />
                    <Form.Label className="mx-2">Other:</Form.Label>
                    <Form.Check checked={userRecords.gender === "Other"} onChange={(e) => { setUserRecords({ ...userRecords, gender: e.target.value }) }} type="radio" name="Gender" value="Other" />
                </Form.Group>



                <Form.Group className="mb-3 col-sm-6 ms-auto me-auto ">
                    <Form.Label>College:</Form.Label>
                    <Form.Control as="select" type="text"
                        onChange={(e) => { setUserRecords({ ...userRecords, college: e.target.value }) }} >
                        <option value="">{"Choose Your College Name"}</option>
                        {apiRecords.map(x => {
                            return (

                                <option title={x.alpha_two_code, x.name}>{x.name}</option>
                            )
                        })}
                    </Form.Control>
                    {error.college && <p className="text-danger">This field is required*</p>}
                </Form.Group>

                <Form.Group className="d-flex mb-3 col-sm-6 ms-auto me-auto textfont" >
                    <Form.Label>Hobbies:</Form.Label>
                    <Form.Label className="mx-2">Reading:</Form.Label>
                    <Form.Check onChange={(e) => { setUserRecords({ ...userRecords, hobbies: { ...userRecords.hobbies, reading: e.target.value } }) }} type="checkbox" name="Reading" value="Reading" />
                    <Form.Label className="mx-2">Gaming:</Form.Label>
                    <Form.Check onChange={(e) => { setUserRecords({ ...userRecords, hobbies: { ...userRecords.hobbies, gaming: e.target.value } }) }} type="checkbox" name="Gaming" value="Gaming" />
                    <Form.Label className="mx-2">Traveling:</Form.Label>
                    <Form.Check onChange={(e) => { setUserRecords({ ...userRecords, hobbies: { ...userRecords.hobbies, traveling: e.target.value } }) }} type="checkbox" name="Traveling" value="Traveling" />
                    <Form.Label className="mx-2">Drawing:</Form.Label>
                    <Form.Check onChange={(e) => { setUserRecords({ ...userRecords, hobbies: { ...userRecords.hobbies, drawing: e.target.value } }) }} type="checkbox" name="Drawing" value="Drawing" />
                    <Form.Label className="mx-2">Other:</Form.Label>
                    <Form.Check onChange={(e) => { setUserRecords({ ...userRecords, hobbies: { ...userRecords.hobbies, other: e.target.value } }) }} type="checkbox" name="Other" value="Other" />
                </Form.Group>


                <div className="text-center">
                    <Button type="submit" onClick={(e)=>{onRegistrationComplete(e)}} className="col-lg-4 col-md-4 col-sm-4 btn ms-auto me-auto btn-primary">
                    {editMode ? "Update" : "Add"}</Button>{editMode ? <Button type="submit" onClick={onDelete} variant="btn-primary">Delete</Button> : null}
                </div>
                {/* <Button type='submit' onClick={onRegistration} variant="outline-success" id="buttoncss"> {editMode ? "Update" : "Register"}</Button>
                            {editMode ? <Button type="submit" onClick={onDelete} variant="outline-success"> Delete</Button> : null} */}
            </Form>
            </Modal>
        </Container>
       
        </>
    )
}

export default Register;


