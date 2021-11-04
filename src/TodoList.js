import React, {Component} from 'react'
import './css/todo.css'

class TodoList extends Component {
	constructor(props) {
      super(props);
      this.state = {todoNumber: 1, listTodo:[],todoInfo: null};
      this.todoArray = [];

      this.onClickHandler = this.onClickHandler.bind(this);
      this.onChangeNumber = this.onChangeNumber.bind(this);
      this.getTodoInfo = this.getTodoInfo.bind(this);
      this.makeListTodo = this.makeListTodo.bind(this);
      this.handlerKey = this.handlerKey.bind(this);

  }

  onClickHandler(event) {
    if (!(this.state.todoNumber >= 1 && this.state.todoNumber <= 200)) {
      alert ('Только от 1 до 200');
      return;
    }

    var i = this.todoArray.findIndex ( (todo)=> {return todo.id==this.state.todoNumber;});
    if (i!=-1) {
      var msg = 'Todo с номером '+this.state.todoNumber+' уже есть';

      alert (msg);
      return;
    }

    fetch('https://jsonplaceholder.typicode.com/todos/'+this.state.todoNumber)
      .then((result) => result.json())
      .then((result) => {
        this.todoArray.push(result);
        console.log (this.todoArray);

        localStorage.clear();
        localStorage.setItem('arrayTodos', JSON.stringify(this.todoArray));
        this.makeListTodo();
       
      });
  }

  handlerKey(event) {
    if (event.keyCode === 13 || event.keyCode === 14) {
      this.onClickHandler();
    }
  }

  makeListTodo () {
    var listTodo=this.todoArray.map((todo,index) => {
        var strEl = 'todos id->'+todo.id;
          return <li key={todo.id} onClick={()=>{this.getTodoInfo(index);}}>{strEl}</li>;
        });
      
    this.setState ({listTodo:listTodo});
  }

  getTodoInfo(index) {
    var todoInfo;
    var arrayProps=[];
    var todoEl = this.todoArray[index];

    for (var prop in todoEl) {
      var Info = prop+': '+todoEl[prop];
      var wrapInfo = <span>{Info}</span>;

      arrayProps.push(wrapInfo);
    }
  
    todoInfo = <div className='infoTodo'>{arrayProps}</div>;
    this.setState ({todoInfo:todoInfo});
  }

  onChangeNumber(event) {
     this.setState({todoNumber: event.target.value});
  }

  componentDidMount() {
    var todoArray = localStorage.getItem('arrayTodos');
    if (todoArray!=null) {
      this.todoArray = JSON.parse(todoArray);
      this.makeListTodo();
    }
  }

  render() {
  	 return(
  	 	<div className='container'>
  	 		<span>Введите номер todo от 1 до 200:</span>       
  	 	  <input type="number" value={this.state.todoNumber} onKeyUp={this.handlerKey} onChange={this.onChangeNumber} max="200" min="1" />
  	 	  <input type="button" value="Добавить todo" onClick={this.onClickHandler} />       
  	 		<div className='wrapTodo'>
  	 			<ul className='listTodo'>
  	 			{this.state.listTodo}
  	 			</ul>
  	 		
  	 			{this.state.todoInfo}
  	 			
  	 		</div>
  	 	</div>
  	 );
  }
}
export default TodoList