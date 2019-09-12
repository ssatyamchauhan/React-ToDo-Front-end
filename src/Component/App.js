import React, {Component} from 'react';
import '../App.css'
import Stats from './Pages/Stats';
import Todo from './Pages/Todo';
import Lists from './Pages/List';
import _ from 'underscore';
import axios from 'axios';


export default class App extends Component{

    constructor(){
        super()
        this.state = {
            item:'',
            itemList:[],
            count:0,
            defaultList:'',
            checked:null,
            editId:null,
            editText:null,
            token:null

        }
    }
    

    UNSAFE_componentWillMount(){
        this.setState({
            token:this.props.tokenState
        })
        // console.log(this.props.tokenState)
        axios.get('http://localhost:2000/get',{params:{token:this.props.tokenState}})
        .then((data) =>{
            var doneCount = data.data.filter((i)=>{
                return i.done===true || i.done === 1; 
            })
            this.setState({itemList:data.data,count:doneCount.length})
            console.log(doneCount)
        })  
        .catch((err) => {console.log(err.message)})
    }

    onChangeHandler = (e) => {
        let id = e.target.id
        console.log(id)
        if(id==='newtodo'){
            this.setState({
                item:e.target.value
            })
        }
        else{
            this.setState({
                editText:e.target.value
            })
        }
    }

    addItem = (e) => {
            // your code ...
        if(e.key === 'Enter'){
            // console.log(this.state.editText)
            
            if(this.state.item.length> 0 || this.state.editText !== null){
                if(this.state.editId !== null && this.state.item.length===0 && this.state.editText.length>0){
                     axios.put('http://localhost:2000/edit/'+this.state.editId,
                                {text:this.state.editText,
                                token:this.props.tokenState})
                    .then((data)=>{this.setState({item:'',itemList:data.data,editText:null,editId:null})})
                    .catch((err) => console.log(err));
                }
                else if(this.state.item.length>0){
                    // console.log(this.state.item)
                    axios.post('http://localhost:2000/newData',{
                        text: this.state.item,
                        done: false,
                        token:this.props.tokenState
                    })
                    .then((data)=>{this.setState({itemList:data.data,item:''})})
                    .catch(err=>console.log(err))
                }
            }
        }
    }

    delete = (e) =>{
        console.log('deleting',e)
        axios.delete('http://localhost:2000/delete/'+e,{data: {token:this.state.token}})
        .then(data => {
                var count = _.where(data.data,{done:1,userId:this.state.itemList[0].userId})
                // console.log(count)
                this.setState({itemList:data.data,count:count.length})
        })
        .catch(err => console.log(err.message))
    }
    
    checkbox = (e) => {
        var itemList = this.state.itemList;
        var id = parseInt(e.target.id);
        console.log(id)
        // console.log('ckeckbox  is clicked also')
        // var index = e.target.getAttribute('aria-label')
        if(e.target.checked===true || e.target.checked===false){
        // console.log('ckeckbox  is clicked also')

            
            axios.put('http://localhost:2000/done/'+id,{done:e.target.checked,token:this.props.tokenState})
            .then((data) => {
                console.log(data.data)
                var count = _.where(data.data,{done:1,userId:itemList[0].userId})
                this.setState({itemList:data.data,count:count.length},()=>console.log('data backed'))
            })
            .catch((err)=>{console.log(err.messsage)})
        }

    }

    listShouldbe = (e) => { 
        if(e.target.dataset.id==='pending'){
        this.setState({ defaultList:e.target.dataset.id })
        }
        else if(e.target.dataset.id==='done'){
            this.setState({ defaultList:e.target.dataset.id })
        }
        else{
            this.setState({ defaultList:e.target.dataset.id })
        }
    }

    DoubleClick = (e) => {
        var {itemList} = this.state;
        console.log('You clicked Double', typeof(e))
        var dict = _.findWhere(itemList,{id:e})
        console.log(dict)
        this.setState({
            editId: dict.id,
            editText:dict.text
        })
    }

    render(){
        return (
            <div>

                <Stats checkbox={this.checkbox} listShouldbe={this.listShouldbe} itemList={this.state.itemList} count={this.state.count}/>
                <Todo  todo={this.state.item} onChangeHandler={this.onChangeHandler} addItem={this.addItem}/>
                <Lists  addItem={this.addItem} onChangeHandler={this.onChangeHandler} itemList={this.state.itemList} defaultList={this.state.defaultList} checkbox={this.checkbox} DoubleClick={this.DoubleClick} editText={this.state.editText} editId={this.state.editId} delete={this.delete}/>
            </div>
        )
    }
}