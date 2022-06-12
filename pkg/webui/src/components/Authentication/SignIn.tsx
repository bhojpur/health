// Copyright (c) 2018 Bhojpur Consulting Private Limited, India. All rights reserved.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from "react"
import {Button, TextField} from "@material-ui/core"

import './SignIn.css'

interface SignInState {
    roles : Array<any>
    form : JSX.Element | null
    error: boolean
    message : string | null
    role : string
}

class SignIn extends React.Component<{}, SignInState>{

    constructor(props: any){
        super(props);
        this.state = {
            roles: [ 
                {label:"Doctor", value:"doctor"}, 
                {label:"Assistant", value:"assistant"} , 
                {label:"Patient", value:"beneficiary"}
            ],
            form : < this.SignInForm />,
            error: false,
            message: null,
            role: "doctor"
        }

        
        this.SignInForm = this.SignInForm.bind(this)
        this.Authenticate = this.Authenticate.bind(this)
        this.handleRoleChange = this.handleRoleChange.bind(this)
    }

    handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            role: event.currentTarget.value
        })
      }
    
    Authenticate = () =>{
        const form : HTMLFormElement | null = document.querySelector(".signInForm")
        const role = form?.role.value
        const userid = form?.userid.value 
        const password = form?.password.value
        const data = JSON.stringify({
            "role": role,
            "userid": userid,
            "password": password
        })
        // console.log(data)
        fetch(
            "/authentication/login",
            {
                method: "POST",
                headers: {
                    ContentType: "application/json; charset=utf-8"
                },
                body: data
            }
        ).then((response) => {
            if (!response.ok) {
                response.text().then(message => {
                    this.setState({
                        error: true,
                        message: message
                    },
                    ()=>{
                        this.setState({
                            form: <this.SignInForm />
                        })
                    })
                    console.log(message)
                })
                // response.json().then(value => console.log(value))
                return            
            }
            return response.json().then(data => console.log(data))
        }).catch(e => {
            console.error(e)
        })

    }

    SignInForm = () => {
        const { roles, role } = this.state 
        return (
            <form className="signInForm">

                <TextField
                    className="formImput"
                    select
                    type="text"
                    name="role"
                    label="Role"
                    defaultValue={role}
                    onChange={this.handleRoleChange}
                    variant="outlined"
                    required
                    error={this.state.error}
                    helperText={this.state.message}
                    SelectProps={{
                        native: true,
                      }}   
                >
                    {
                        roles.map((role) => <option key={role.value} value={role.value}>{role.label}</option>, roles)
                    }
                </TextField>
            
                <TextField
                    className="formInput"
                    type="phonenumber"
                    name="userid"
                    label="WhatsApp Number"
                    variant="outlined"
                    placeholder="+9120450662"
                    required
                    error={this.state.error}
                    helperText={this.state.message}
                />

                <TextField
                    className="formInput"
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    placeholder="******************"
                    required
                    error={this.state.error}
                    helperText={this.state.message}
                />

                <div>
                    <em>Forgot password? <a href="http://members/authentication/resetCredentials" target="#" rel="noopener noreferrer">Reset credentials</a> or subscribe if your are not a member.</em>
                </div>

                <div className="bottonsBar">
                    <Button
                        type="submit"
                        value="Login" 
                        style={{
                            alignSelf:"flex-end",
                            fontWeight: 900,
                            border: "1px solid lightslategrey",
                            color: "lightslategrey",
                            marginTop: 32
                        }}
                        onClick={this.Authenticate}>Authenticate</Button>
                </div>
            </form>
        )
    }

    render(){
        // const errorMessage = this.state.error ?   : nulls
        return(
            <div>
                <p> Select your role and provide your WhatsApp ID and Password to authenticate. </p>
                {this.state.form}            
            </div>
        )
    }
}

export default SignIn;