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

const SearchBlock = () => {
    
    // eslint-disable-next-line
    const specialities = () => {

    }
    return(
        <div style={{
            width: "100% !import",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "lightslategray",
            color: "whitesmoke",
        }}

        className="searchBlock">
            <h3> Find and book your physician, anytime. </h3>
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center"
            }}>
                <form className="searchForm" action="/practitioners">
                <input 
                    style={{margin: 10,}}
                    type="text" name="speciality" placeholder="Speciality" list="specialities"/>
                <datalist id="specialities">
                    <option value="Allergy"></option>
                    <option value="Anesthesiology"></option>
                    <option value="Dermatology"></option>
                    <option value="Diagnostic Radiology"></option>
                    <option value="Family Medicine"></option>
                    <option value="Gynecology"></option>
                    <option value="Immunology"></option>
                    <option value="Internal Medicine"></option>
                    <option value="Medical Genetics"></option>
                    <option value="Neurology"></option>
                    <option value="Nuclear Medicine"></option>
                    <option value="Nutrician"></option>
                    <option value="Obstetrics"></option>
                    <option value="Oncologist"></option>
                    <option value="Opthalmology"></option>
                    <option value="Pathology"></option>
                    <option value="Pediatrics"></option>
                    <option value="Physical Medicine"></option>
                    <option value="Preventive Medicine"></option>
                    <option value="Psychiatry"></option>
                    <option value="Radiation Oncology"></option>
                    <option value="Surgery"></option>
                    <option value="Urology"></option>
                </datalist>
                
                <input  style={{margin: 10, }} type="text" name="location" placeholder="Location" list="cities"/>
                <datalist id="cities">
                    <option value="Agra"></option>
                    <option value="Ahmedabad"></option>
                    <option value="Amritsar"></option>
                    <option value="Arrah"></option>
                    <option value="Bengaluru"></option>
                    <option value="Bhopal"></option>
                    <option value="Buxar"></option>
                    <option value="Chennai"></option>
                    <option value="Delhi"></option>
                    <option value="Dhanbad"></option>
                    <option value="Hyderabad"></option>
                    <option value="Indore"></option>
                    <option value="Jaipur"></option>
                    <option value="Kanpur"></option>
                    <option value="Kolkata"></option>
                    <option value="Lucknow"></option>
                    <option value="Mumbai"></option>
                    <option value="Nagpur"></option>
                    <option value="Nashik"></option>
                    <option value="Patna"></option>
                    <option value="Pune"></option>
                    <option value="Rajkot"></option>
                    <option value="Ranchi"></option>
                    <option value="Surat"></option>
                    <option value="Vadodara"></option>
                    <option value="Varanasi"></option>
                </datalist>

                <input type="submit" 
                    className="searchBtn" 
                    style={{
                        backgroundColor: "lightslategray", 
                        margin: 10, height: 52, width: "fit-content", 
                        padding: 6, color: "whitesmoke"
                    }} onClick={(e) => {}}
                
                value="SEARCH" />

            </form>
            </div>
        </div>
    )
}

export default SearchBlock