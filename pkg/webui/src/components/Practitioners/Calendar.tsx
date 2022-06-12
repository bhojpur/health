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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

import "./Calendar.css"

interface CalendarState {
    identifier: JSX.Element | string,
    schedules: {} | string | any,
}
interface CalendarProps {
    slots: any,
    identifier: string
}
class Calendar extends React.Component<{}, CalendarState> {

    constructor(props: CalendarProps){
        super(props)
        this.state = {
            identifier: props.identifier,
            schedules: props.slots,
        }
        this.updateCalendar = this.updateCalendar.bind(this)
    }

    render(){
        console.log( this.state.schedules)
         
        return (
            <div>
                <div className="calendar">
                    <span className="cheader">
                        <i> <FontAwesomeIcon icon={faArrowLeft} /></i>
                        <h4 style={{marginTop:4}}> SETEMBER 12 - 18, 2021 </h4>
                        <i><FontAwesomeIcon icon={faArrowRight} /></i>
                    </span>
                    <span className="weekDays">
                        <span onClick={(e) => this.updateCalendar(e)} id="mon">MON</span>
                        <span onClick={(e) => this.updateCalendar(e)} id="tue">TUE</span>
                        <span onClick={(e) => this.updateCalendar(e)} id="wed">WED</span>
                        <span onClick={(e) => this.updateCalendar(e)} id="thu">THU</span>
                        <span onClick={(e) => this.updateCalendar(e)} id="fri">FRI</span>
                        <span onClick={(e) => this.updateCalendar(e)} id="sat">SAT</span>
                        <span onClick={(e) => this.updateCalendar(e)} id="sun">SUN</span>
                    </span>
                    <div  className="cmatrix" id="calenderMatrix">
            
                    </div>
                    
                </div>
            </div>
        )
    }

    /**
     * 
     * @param param
     * Algorith:
     * When a date item is clicked display all available slots
     */
    updateCalendar(e: any){
        const dateFocus = document.createElement("i")
        dateFocus.id = "focus" 
        dateFocus.style.cssText = "".concat(
            "height: 10px;",
            "background-color: lightskyblue;",
            "width: 100%;"
        )
        // Query parent node for actual focus day, to change to current if different.
        let parentNode = e.currentTarget.parentNode
        let id =  parentNode.focusDay
        switch(id){
            case undefined: {
                // console.log(1)
                parentNode.focusDay = e.currentTarget.id;
                e.currentTarget.append(dateFocus);
                break;
            }
            case e.currentTarget.id: {
                // console.log(2)
                break
            }
            default: {
                // console.log(3)
                let id = parentNode.focusDay
                parentNode.querySelector(`#${id}`).lastChild.remove()
                parentNode.focusDay = e.currentTarget.id;
                e.currentTarget.append(dateFocus);
                parentNode?.nextSibling?.querySelectorAll("#focus").forEach(
                    (v: Element) => v.remove()
                )
                break;
            }
        }
        
        let slots = this.state.schedules[e.target.id]
        let dailySchedule = Array<JSX.Element>()
        // let date = ""
        const matrix = () => {
            for (var i=0; i<= slots.length; i++ ){
                // i < 9? date = `0${i+1}` : date = `${i+1}`
                // let key=`data-${i}`
                let slot = slots[i]
                let key = e.target.innerText + " / " + i
                dailySchedule.push(
                    <span style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <i  data-key={key}
                            key={key} 
                            onClick={
                                (e) => {
                                    let ancestor = e.currentTarget.parentNode?.parentNode
                                    ancestor?.querySelectorAll("#focus").forEach(
                                        v => v.remove()
                                    )
                                    // console.log(e.currentTarget.dataset['key'])
                                    e.currentTarget.parentNode?.appendChild(dateFocus.cloneNode())
                                }
                            }
                        >{slot}</i>
                    </span>
                )
            }
            render(dailySchedule, document.getElementById('calenderMatrix'))
            
        }
        matrix()
        // dailySchedule = []
    }
    
}

export default Calendar