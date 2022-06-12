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

import { TextField, TextareaAutosize, Typography, FormControl} from '@material-ui/core'
import React, { useState } from 'react'

export function Speciality() : JSX.Element {

    return (
        <FormControl
            style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 24,
                width: 650,
                borderTop: "1px solid lightskyblue",
                marginBottom: 32,
                paddingTop: 32
            }}>
            <TextField 
                type="text"
                label="Title"
                variant="outlined"
                required
                />  
            <TextareaAutosize
                maxLength={250}
                rowsMin={10}
                style={{
                    padding: 16
                }}
                placeholder="Description"
                required
                />
        </FormControl>
    )
}

export default function Specilities(props: any) : JSX.Element {
    const {initialIndex} = props
    const addSpecialityBlock = (e: any) => {
          
    }
    const [specialities, setSpecialities] = useState(
                new Map<string, JSX.Element>().set(props.initialIndex, 
                        <Speciality key={initialIndex} />) )
    let specialityNodes = Array<JSX.Element>()

    specialities.forEach((speciality, key) => specialityNodes.push(speciality) )


    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // padding: 32
                marginBottom: 24
            }}>
             <Typography 
                style={{
                    textAlign: "start",
                    width: 800,
                    padding: 16,
                    borderTop: "1px solid lightslategrey",
                    fontWeight: 700,
                        fontSize: 24,
                        color: "lightslategray"
                }}>Specialities</Typography>
            {
                specialityNodes.map(speciality => (speciality))
            }
        </div>
    )
}
