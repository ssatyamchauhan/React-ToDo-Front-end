import React from 'react';
import {Grid, TextField,Paper} from "@material-ui/core";

function Todo(props){
    
    return(
        <Paper style={{ margin: 16, padding: 14 }}>
            <Grid container>
                <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                    <TextField
                        placeholder="Add Todo here"
                        id="newtodo"
                        onChange={props.onChangeHandler}
                        value={props.todo}
                        onKeyPress={props.addItem}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Paper>
        
    )
}
export default Todo
