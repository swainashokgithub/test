import React, { useState, useEffect } from "react";
import "./Userlist.css";
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useHistory } from "react-router";

const Userlist = () => {


    const [userList1, setUserList1] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // we are getting data through api--method: 'GET' called
        const apiKey = "https://618eb8c250e24d0017ce1403.mockapi.io/student";
        fetch(apiKey).then(res => {
            return res.json();
        }).then(data => {
            console.log(data)
            setUserList1(data.sort((a, b) => b.id - a.id));
        })
    }, [])

    const columns = [{
        dataField: 'id',
        text: 'ID',
        sort: true
    },
    {
        dataField: 'username',
        text: 'User Name'
    },
    {
        dataField: 'birthdate',
        text: 'Birth date'
    },
    {
        dataField: 'address',
        text: 'Address'
    },
    {
        dataField: 'gender',
        text: 'gender'
    },
    {
        dataField: 'country',
        text: 'country'
    },
    {
        dataField: 'college',
        text: 'College'
    },
    ];
    //Navigating from table data to register page to upadate the data
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log("row", row);
            history.push({
                pathname: '/register',
                Userlist: row.id
            })
        }
    };

    return (
        <div style={{ marginTop: 40, padding: '5px' }}>
            <Container>
                <BootstrapTable keyField="id" data={userList1} columns={columns} rowEvents={rowEvents} />
            </Container>
        </div>
    );

}



export default Userlist;



