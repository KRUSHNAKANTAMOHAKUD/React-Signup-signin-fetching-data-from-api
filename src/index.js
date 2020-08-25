import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import App from './App';

import * as serviceWorker from './serviceWorker';





class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: null,
      messageLog: '',
      messageReg: '',
      email:'',
      phoneno:'',
      prof:'',
      isLogin:false,
      data:''
    };
  }
  componentDidMount(){
  	
    console.log(sessionStorage.getItem("user"));
    this.setState({isLogin:false});
    if(sessionStorage.getItem("user")==="null" || sessionStorage.getItem("user")===null){
      this.setState({isLogin:false});
    }
  	else
  	{
      this.setState({isLogin:true});
  		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: "movies",language:"kannada",genre:"all",sort:"voting" })
    };
    // fetch('https://hoblist.com/movieList', requestOptions)
    //     .then(response => response.json())
    //     .then(data => this.setState({ data}));
    fetch('https://hoblist.com/trailerRecommened')
        .then(response => response.json())
        .then(data => this.setState({ data}));
        
    }

  }









  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    
    this.setState({[nam]: val});
  }
  checkPassword=()=>{
    let password=this.state.password;
    let username=this.state.username;
    let msg="";
    let data=[];
    data[0]=username;
    data[1]=password;
    let dbUsername="";
    let dbPassword="";

    if(localStorage.getItem(username)===null)
    {
      msg="Invalid username or password";
    }
    else{
      dbUsername=JSON.parse(localStorage.getItem(username))[0];
      dbPassword=JSON.parse(localStorage.getItem(username))[1];
    }
    
    
    if(dbUsername===username && dbPassword===password){
      msg="login successful";
      
      	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: "movies",language:"kannada",genre:"all",sort:"voting" })
    };
    fetch('https://hoblist.com/movieList', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ data}));

console.log(this.state.data.result);	
this.setState({isLogin:true});
      sessionStorage.setItem("user", username);
      
 
    }
    else if(dbUsername!==username){
      msg="Invalid username or password";
    }
    else if(dbUsername===username && dbPassword!==password){
      msg="Incorrect password";
    }
    else{
      msg="login failed";
    }
    this.setState({messageLog:msg});
  }
  logoutUser=()=>{
  	//alert("call");
  	sessionStorage.setItem("user", null);
  	this.setState({isLogin:false});
  }
  registerUser=()=>{
    let password=this.state.password;
    let username=this.state.username;
    let data=[];
    let msg="";
    data[0]=username;
    data[1]=password;
    data[2]=this.state.email;
    data[3]=this.state.phoneno;
    data[4]=this.state.prof;
    if(data[0]===undefined || data[1]===null || data[2]===undefined || data[3]=== undefined || data[4]===undefined  )
    {
      msg="kindly fill all";
    }
    else if(localStorage.getItem(username)!==null)
    {
      msg="Username already exist";
    }
    
    localStorage.setItem(username, JSON.stringify(data));
    this.setState({messageReg:msg});
  }

  


  render() {
    
    
    if(this.state.isLogin===false)
    {
    return (
      
      <form>
       
        <div id="flex">
            <div>
                <h4 style={{color: "blue"}}>SIGN IN</h4>
                <p>Enter your username:
                <input
                  type='text'
                  name='username'
                  onChange={this.myChangeHandler}
                /></p>
                <p>Enter your password:
                <input
                  type='password'
                  name='password'
                  onChange={this.myChangeHandler}
                /></p>
                <br/><br/>
                <button className="button"
                    type="button"
                    onClick={this.checkPassword}
                  >Login</button>
                <br/>
                {this.state.messageLog}
        </div>
      <hr/>
          <div>
                <h4 style={{color: "blue"}}>SIGN UP</h4>
                <p>Enter your username:
                <input
                  type='text'
                  name='username'
                  onChange={this.myChangeHandler}
                /></p>
                <p>Enter your password:
                <input
                  type='password'
                  name='password'
                  onChange={this.myChangeHandler}
                /></p>
                <p>Enter your Email:
                <input
                  type='text'
                  name='email'
                  onChange={this.myChangeHandler}
                /></p>
                <p>Enter your Phone no:
                <input
                  type='tel'
                  name='phoneno'
                  onChange={this.myChangeHandler}
                /></p>
                
                <br/><br/>
                <button className="button"
                    type="button"
                    onClick={this.registerUser}
                  >Register</button>
                <br/>
                {this.state.messageReg}
          </div>
      </div>
      </form>
    );
    }
    else if(this.state.data.result!==undefined){
      return(<div>
      <button className="button"
                    type="button"
                    onClick={this.logoutUser}
                  >Logout</button>
                  
      {this.state.data.result.map(function(i){return(
        <div class="box"> 
        <span class="display icon_font" >&#9650;</span>
        <span class="display vote" >0</span>
        <span class="display icon_font"  >&#9660;</span>
        <span class="display vote" >Votes</span>
              <img class="image display " src={i.poster}></img>
                <h1 class="title">{i.title}</h1>
                
                <h4 class="sub-title">
                  Genre: {i.genre} </h4>
                 
                <h4 class="sub-title">
                Director: {i.director} </h4> 
      <h4 class="sub-title">Starring: {i.stars}</h4>
        
                <h4 class="sub-title"> 
                Mins | Malayalam | 19 Jul
                </h4>
                <h4 class="sub-title blue" >
                  {i.pageViews} | Voted by 0 People
                </h4>
        
          
              <button  type="button"  class="sub-title buttonUrl"> <a target="blank" href={i.trailerUrl}>Watch Trailer</a> </button>
              
              <br/>
            </div>
            )})}

            </div>
      );
    }
    else{
    	return(<p></p>);
    }
  }
}

ReactDOM.render(<Login />, document.getElementById('root'));

