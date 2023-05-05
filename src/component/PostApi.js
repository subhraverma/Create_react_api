import React, { useState } from 'react'

export default function PostApi() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
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
    return (  
        <>
            <form>
                <label for="fname">Name:</label><br />
                <input type="text" id="fname" value={name} onChange={(e) => { setName(e.target.value) }} name="name" /><br />
                <label for="lname">Email:</label><br />
                <input type="text" id="lname" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" /><br />
                <label for="lname">Password:</label><br />
                <input type="text" id="lname" value={password} onChange={(e) => { setPassword(e.target.value) }} name="password" /><br />
                <label for="lname">Mobile:</label><br />
                <input type="text" id="lname" value={mobile} onChange={(e) => { setMobile(e.target.value) }} name="mobile" /><br /><br />
                <button type='button' onClick={saveUser}>SAVE USER</button>
            </form>

        </>
    )
}
