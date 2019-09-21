import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    margin: {
        margin: theme.spacing(1),
    }
  }));

export default function Lists(props) {
    const classes = useStyles();
    const listState = props.defaultList;
    // console.log(props)
    const todos = props.itemList.filter((it) => {
        if ( listState === 'pending' ) {
            it.done === 1 ? it.done = true : it.done = false;
            return !it.done;
        } else if ( listState === 'done') {
          it.done === 1 ? it.done = true : it.done = false;            
          return it.done;
        } else {
            it.done ? it.done = true : it.done = false;
            return true;
        }
    });
    
    return (
        <List className={classes.root}>
          {todos.map((i,index) => {
              if(props.editId === i.id){
                  return (
                    <ListItem 
                    key={index} 
                    onDoubleClick={() => props.DoubleClick(i.id)}
                    >
                    <Checkbox
                        id={String(i.id)} 
                        aria-label={index} 
                        key={index} 
                        onChange={props.checkbox} 
                        checked={i.done} 
                    />
                    <Input
                            type="text" 
                            value={props.editText} 
                            onKeyPress={props.addItem} 
                            onChange={props.onChangeHandler} 
                            autoFocus
                            fullWidth
                     />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => props.delete(i.id)}
                        >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                      
                  )
              }

        else {return (
            <ListItem 
                key={index} 
                onDoubleClick={() => props.DoubleClick(i.id)}>
                <Checkbox
                    id={String(i.id)} 
                    aria-label={index} 
                    key={index} 
                    onChange={props.checkbox} 
                    checked={i.done} 
                />
                <ListItemText primary={i.text} defaultValue="No Todo"/>
                  <IconButton 
                        edge="end" 
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => props.delete(i.id)}
                    >
                    <DeleteIcon />
                  </IconButton>
            </ListItem>
        );
    }
        })}
    </List>
      );
}
