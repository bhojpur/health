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
import { render } from "react-dom"
import { createStyles } from "@material-ui/core"

import "./FrontDesk.css"
import logo from "../../logo.svg"

interface FrontDeskState {
    searchBlock: JSX.Element | null,
    availablePractitioners: JSX.Element | null | JSX.Element[],
    promotionBlock: JSX.Element | string | null,
    testimonial: JSX.Element | null,
    locatins: JSX.Element | null, 
}
class FrontDesk extends React.Component<{}, FrontDeskState> {
    constructor(props: any){
        super(props)
        this.state = {
            searchBlock: null, // SearchBlock(),
            availablePractitioners: this.AvailablePractioners(),
            promotionBlock: null,
            testimonial: null,
            locatins: null,
        }

        // SearchBlock.bind(this)
        this.AvailablePractioners = this.AvailablePractioners.bind(this)
    }
    render(){
        return(
            <div style={{
                margin: 36
            }}>
                {this.state.searchBlock}
                {this.state.availablePractitioners}
            </div>
        )
    }

    AvailablePractioners() {
        
        const practitioner = (
            <div className="practitionerCard">
                   
            <div id="cardDetails" className="cardDetails">
                 <img  id="practitionerPhoto" src={logo} alt="profile_photo"></img>
                 <div className="practitionerSummary">
                    <h5 id="practitionerName" style={{margin: 0}}>Dr. Shashi Bhushan Rai</h5>
                    <span id="practitionerSpec">Opthalmologist</span>
                    <div className="consulMode">
                        {/* <button>Book now</button> */}
                        <em>Video call</em>
                        {" | "}
                        <em>Presential</em>
                        {" | "}
                        <em style={{backgroundColor: "lightskyblue"}}>Free</em>
                    </div>
                 </div>

            </div>
            </div>
        )
        // this.setState({availablePractitioners: [practitioner, practitioner, practitioner]})
        // console.log(this.state.availablePractitioners)
        window.addEventListener("load", () => {
            let list = []
            for(let i=0; i < 9; i++){
                list.push(practitioner)
            }
            render(
                list,
                document.getElementById("practititonersList")
            )
        })
        return(
            <div className="availabilityGrid"
                style={{
                    color: "lightslategray",
                    justifyContent: "center",
                    margin: "36px 8px 36px",
                }}>
                <span style={{borderBottom: "1px solid lightblue", fontWeight: 900, fontFamily: "Ubuntu", fontSize: 36}}>We care for you...</span>
            <div id="practititonersList"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: 16,
                    justifyContent: "center",
                }}>
                   {/* {practitioner} {practitioner} {practitioner} {practitioner} */}
            </div>
            </div>
        )
    }
}

export function CallForAction() {
    let styles = createStyles({
        callActions: {
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 4,
            top: "50%",
            color: 'skyblue',
            fontWeight: 900,
            backgroundColor: "transparent",
        }
    })
    // eslint-disable-next-line
    let action = {
        writingMode: 'vertical-lr',
        textOrientation: 'upright',
        border: '1px solid lightslategray',
        borderRadius: '4px',
        width: "36px",
        padding: "4px"
    }
    const callActions = (
        <div style={styles.callActions as React.CSSProperties}>
            {/* <i id="subscribe" style={action} onClick={(e)=> onClick(e)} >SUBSCRIBE</i>
            <hr/>
            <i id="donate" style={action} onClick={(e)=> onClick(e)}>DONATE</i> */}
        </div>
    )
    // eslint-disable-next-line
    const onClick = (e: any) =>{
        if (e.target.id === "subscribe") window.location.href="/subscribe"
        if (e.target.id === "donate") window.location.href="/donate"
    }

    return(callActions)
}

export default FrontDesk