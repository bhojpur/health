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
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./Members.css"
import { Tabs, Tab, Paper } from "@material-ui/core";

interface MemberState {
    signUpInFace: JSX.Element| null
    authenticate: any | boolean
    // option: JSX.Element
    value: number
}

class Members extends React.Component<{}, MemberState>{
    
    constructor(props: any){
        super(props)
        // const [termsLink, setTermsLink] = useState();
        // const [signUp, setSignUp] = useState();
        this.state = {
            authenticate: props.authenticate || false,
            value: 0,
            signUpInFace: <SignIn />,
            // option: <this.Join callback={this.changeStatus(false)} />
        }
        this.changeStatus = this.changeStatus.bind(this)
        this.Join = this.Join.bind(this)
        this.Login = this.Login.bind(this)
    }
    
    changeStatus = (e: React.ChangeEvent<{}>, tabNumber: number) => {
        this.setState({
            value: tabNumber
        }, ()=>{
            this.state.value === 0 ? this.setState({
                authenticate: false
            }) : this.setState({
                authenticate: true
            })
        })
    }

    Header(){
        return [
            <span>Subscribe for free</span>,
            <span className="joinusAction">SignUp</span>
        ]
    }

    Join = (props:any): JSX.Element =>{
        const changeToSignIn = () => {
            this.setState({authenticate : false}) 
        }
        return <i onClick={changeToSignIn}>JOIN US</i>
    }

    Login = (): JSX.Element => {
        const changeToJoin = () => {
            this.setState({authenticate : true})
        }
        return <i onClick={changeToJoin}>SIGN IN</i>
    }

    render(){
        const message = "Welcome! Fill this form and submit to subscribe."
        const auhenticationUI : JSX.Element = this.state.authenticate ? <SignIn /> : <SignUp message={message}/>
        const {value} = this.state
        return(

            <Paper 
                style={{
                    flexGrow: 1,
                    paddingTop: 32
                }}>
                <Tabs 
                    value={value}
                    onChange={this.changeStatus}
                    centered
                    style={{
                        border: 1,
                        borderBottomColor: "lightslategray",
                        
                    }}>

                    <Tab 
                        label="JOIN US" 
                        style={{
                            fontWeight: 800
                        }}/>
                    <Tab 
                        label="Sign In"
                        style={{
                            fontWeight: 800
                        }}/>            
                </Tabs>
                
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                        paddingTop: 32,
                        borderTop: "1px solid lightskyblue"
                    }}>

                    <section
                        style={{
                            maxWidth: 700,
                            // minWidth: 700,
                            marginBottom: 64
                        }}>
                        {auhenticationUI}
                    </section>
                    
                </div>
                
            </Paper>
        )
    }
}

export default Members;