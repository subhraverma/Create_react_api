import React, { useEffect, useState } from 'react'

export default function DeleteApi() {
    const [data, setData] = useState('');
    useEffect(() => {
        getlist();
    }, [])
    function getlist() {
        fetch("http://localhost:5000/users").then((res) => {
            res.json.then((e) => {
                setData(e);
            })
        })
    }
    function deleteUser(id) {
        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE"
        }).then((res) => {
            res.json().then((e) => {
                getlist();
            })
        })
    }
    return (
        <>
            <table>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Password</td>
                    <td>Mobile</td>
                    <td>DELETE</td>
                    <td>EDIT</td>
                </tr>
                {
                    data.map((item, i) =>
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.mobile}</td>
                            <td><button onClick={() => { deleteUser(item.id) }}>DELETE</button></td>
                            <td><button>EDIT</button></td>
                        </tr>
                    )
                }
            </table>
        </>
    )
}
