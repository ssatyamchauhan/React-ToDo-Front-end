import React, {Component} from 'react';
import '../App.css'
import Stats from './Pages/Stats';
import Todo from './Pages/Todo';
import Lists from './Pages/List';
import _ from 'underscore';
import axios from 'axios';
import ls from 'local-storage';
import { Redirect } from 'react-router-dom'


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
            isLoggedIn:false
        }
    }


    UNSAFE_componentWillMount(){
       if(ls.get('credentials')){
            this.setState({isLoggedIn:true})
       }
       else{
            this.setState({
                isLoggedIn:false
            })
       }
        // console.log(this.props.tokenState)
        console.log(ls.get('credentials'))
        axios.get('http://localhost:2000/get',{params:{token:ls.get('credentials')}})
        .then((data) =>{
            console.log(data)
            if(data.data === 'invalid'){
                this.setState({itemList:data.data,count:doneCount.length})
            }
            var doneCount = data.data.filter((i)=>{
                return i.done===true || i.done === 1; 
            })
            this.setState({itemList:data.data,count:doneCount.length})
            console.log(doneCount)
        })  
        .catch((err) => {console.log(err.message)})
    }

    componentWillUpdate(){
        setTimeout(
            function(){
                ls.clear()
                this.setState({isLoggedIn:false})}
                .bind(this), 60*4000);
      }

    onChangeHandler = (e) => {
        let id = e.target.id
        // console.log(id)
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
            
            if(this.state.item.length> 0 || this.state.editText !== null){

                if(this.state.editId !== null && this.state.item.length===0 && this.state.editText.length>0){

                    axios.put('http://localhost:2000/edit/'+this.state.editId,{
                                text:this.state.editText,
                                token:ls.get('credentials')
                    })
                    .then((data)=>{this.setState({item:'',itemList:data.data,editText:null,editId:null})})
                    .catch((err) => console.log(err));
                }

                else if(this.state.item.length>0){

                    axios.post('http://localhost:2000/newData',{
                        text: this.state.item,
                        done: false,
                        token:ls.get('credentials')
                    })
                    .then((data)=>{this.setState({itemList:data.data,item:''})})
                    .catch(err=>console.log(err))
                }
            }
        }
    }

    delete = (e) =>{
        console.log('deleting',e)
        axios.delete('http://localhost:2000/delete/'+e,{data: {token:ls.get('credentials')}})
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

        if(e.target.checked===true || e.target.checked===false){
            
            axios.put('http://localhost:2000/done/'+id,{done:e.target.checked,token:ls.get('credentials')})
            .then((data) => {

                var count = _.where(data.data,{done:1,userId:itemList[0].userId})
                this.setState({itemList:data.data,count:count.length})
            })
            .catch((err)=>{console.log(err.messsage)})
        }

    }

    listShouldbe = (e) => { 
        console.log(e.target)
        var a = e.target.getAttribute('aria-label')
        console.log(a)
        if(e.target.id==='pending'){
            this.setState({ defaultList:e.target.dataset.id })
        }
        else if(e.target.id==='done'){
            this.setState({ defaultList:e.target.dataset.id })
        }
        else{
            this.setState({ defaultList:e.target.dataset.id })
        }
    }

    DoubleClick = (e) => {
        var {itemList} = this.state;

        var dict = _.findWhere(itemList,{id:e})

        this.setState({
            editId: dict.id,
            editText:dict.text
        })
    }

    logOut = (e) => {
        ls.clear()
        this.setState({
            isLoggedIn:false
        })
        
    }
       render(){
            if(!this.state.isLoggedIn){
               return <Redirect to='/login' />
            }
            return (
                <div>
                    <Stats checkbox={this.checkbox} listShouldbe={this.listShouldbe} itemList={this.state.itemList} count={this.state.count} logOut={this.logOut} />
                    <Todo  todo={this.state.item} onChangeHandler={this.onChangeHandler} addItem={this.addItem}/>
                    <Lists  addItem={this.addItem} onChangeHandler={this.onChangeHandler} itemList=       {this.state.itemList} defaultList={this.state.defaultList} checkbox={this.checkbox} DoubleClick={this.DoubleClick} editText={this.state.editText} editId={this.state.editId} delete={this.delete}/>
                </div>
        )
    }
}