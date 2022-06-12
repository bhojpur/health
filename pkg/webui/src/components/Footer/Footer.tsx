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
import {render} from "react-dom"
import "./Footer.css"

interface FootState {
    MessageChannel: JSX.Element | null,
    PostInfo: JSX.Element | null
}

class Footer extends React.Component<{}, FootState> {
    constructor(props: any){
        super(props)

        this.state = {
            MessageChannel: this.Messaging() ,
            PostInfo: this.Posting()
        }

        this.Messaging = this.Messaging.bind(this)
        this.Posting = this.Posting.bind(this)
    }

    render(){
        return[
            <div key="channels" style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                flexBasis: "50%",
                width: "100%"
            }}>
                {this.state.MessageChannel}
                {this.state.PostInfo}
            </div>,
            <span key="copyright"><i className="fa fa-copyright" aria-hidden="true">Bhojpur Consulting. 2018</i>{" | "} All rights reserved.</span>
        ]
    }

    Messaging() {

        return(
            <section className="messagingChannel">
                <span>MESSAGE US</span>
                <form style={{display: "flex", flexDirection: "column", flexBasis: 36}}>
                
                    <input type="text" placeholder="Your first and last name here" required={true} />
                    <input type="email" placeholder="Your email here" required={true}/>
                    <input type="text" placeholder="Subject here" required={true} />
                    <textarea placeholder="Your message here"  required={true} style={{height: "minmax(128px, 1fr)"}}/>
                    <input type="submit" value="SEND" />
                </form>
            </section>
            
        )
    
    }
    
    Posting(){
        return(
            <section className="postingChannel" style={{
                display:  "flex",
                flexDirection: "column"
            }}>
                <span>CALL US</span>
                <span>Bhojpur Consulting Private Limited</span>
                <span>Plot 2, Survey 17, Tushar Park</span>
                <span>Dhanori, Pune - 411015</span>
                <span>Maharashtra, India</span>
                <span>Tel: +1 (628) 200-4199</span>
                <span>Email: care@bhojpur.net</span>
            </section>
        )
    }
}

export default Footer