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

import { AppBar, Button, 
    Card, CardActions, 
    CardContent, 
    createStyles, Dialog, 
    IconButton, makeStyles, 
    Slide, TextField, 
    Theme, Toolbar, 
    Typography } from "@material-ui/core"
import { TransitionProps } from "@material-ui/core/transitions"
import CloseIcon from "@material-ui/icons/Close"
import React from "react"

const useStyles = makeStyles((theme: Theme) => createStyles({
    appBar: {
            position: 'relative',
            backgroundColor: "lightslategray", 
    },
    title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    },
    textFields:{
        width: "100%",
        marginTop: 20,
    },
    dateTime :{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 16,
        marginTop: 20,
    }
    ,
    content: {
        padding: 36
    }
}),
);

const Transition = React.forwardRef(
function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
return <Slide direction="up" ref={ref} {...props} />;
});
const Donote = (props: any) => {
    // render(){
        const classes = useStyles()
        const [open, setOpen] = React.useState(props.open)
        // const data = props.data
        const handleClose = () => {
            setOpen(false)
          };
        return (
            <Dialog open={open} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.title}>
                        <Typography variant="h6" className={classes.title} >Consultant Form</Typography>
                        <IconButton edge="end" color="inherit" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Card>
                    <CardContent className={classes.content}>
                    <form action="/members/doctors/donate" method="POST">
                        <TextField label="Dr. Full name" variant="outlined"  className={classes.textFields} />
                        <TextField label="Identity Number" variant="outlined" className={classes.textFields} />
                        <TextField label="Speciality" variant="outlined" className={classes.textFields} />
                        <TextField label="Address" variant="outlined" className={classes.textFields} />
                        <TextField label="Date" variant="outlined" type="date" className={classes.textFields} />
                        <TextField label="Time" variant="outlined" type="time" className={classes.textFields} />
                    </form>
                    <CardActions>
                        <Button>DONATE</Button>
                    </CardActions>
                    </CardContent>
                </Card>
            </Dialog>
        )
    // }
}

export default Donote