import React, { useState, useEffect } from 'react'
export default function App() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [id, setId] = useState(null)
    useEffect(() => {
        getList()
    }, [])
    function getList() {
        fetch("http://localhost:5000/users").then((res) => {
            res.json().then((result) => {
                setData(result);
                setName(result[0].name)
                setEmail(result[0].email)
                setPassword(result[0].password)
                setMobile(result[0].mobile)
                setId(result[0].id)
            })
        })
    }
    function deleteUser(id) {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            res.json().then((e) => {
                console.log(e);
                getList()
            })
        })
    }
    function selectUser(id) {
        let item = data[id - 1];
        setName(item.name)
        setEmail(item.email)
        setPassword(item.password)
        setMobile(item.mobile)
        setId(item.id)
    }
    function updateUser() {
        console.log(name, email, password, mobile, id);
        const item = { name, email, password, mobile, id }
        fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((res) => {
            res.json().then((e) => {
                getList();
                console.log(e);
            })
        })
        function saveUser() {
            console.log(name, email, password, mobile)
            let data = { name, email, password, mobile }
            fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    'Accept': "application/json", 
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => {
                res.json().then((e) => {
                    console.log(e);
                })
            })
        }

    }
    return (
        <>
            <h1>GET API CALL</h1>
            <table border="1">
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
                            <td><button onClick={() => deleteUser(item.id)}>DELETE</button></td>
                            <td><button onClick={() => selectUser(item.id)}>EDIT</button></td>
                        </tr>
                    )
                }
            </table>
            <br />
            <br />
            <form>
                <label for="name">Name:</label><br />
                <input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value) }} name="name" /><br />
                <label for="email">Email:</label><br />
                <input type="text" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" /><br />
                <label for="password">Password:</label><br />
                <input type="text" id="pass" value={password} onChange={(e) => { setPassword(e.target.value) }} name="password" /><br />
                <label for="mobile">Mobile:</label><br />
                <input type="text" id="mob" value={mobile} onChange={(e) => { setMobile(e.target.value) }} name="mobile" /><br /><br />
                <button type='button' onClick={updateUser}>Update USER</button>
            </form>
            <br />
            <br />
        </>
    )
}
