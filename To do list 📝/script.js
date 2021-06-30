const inputBox=document.querySelector(".inputfield input");
const addBtn=document.querySelector(".inputfield button");
const todoList=document.querySelector(".todolist");
const deleteAllBtn=document.querySelector(".footer button");

inputBox.onkeyup=()=>{
    let userData= inputBox.value;
    if(userData.trim()!=0){
        addBtn.classList.add("active"); //adding CSS to button (class active in css file)
    }
    else{                                   //this else remove the active,coz if user has given input but he remove the input,then button should de-highlight. 
        addBtn.classList.remove("active");  
    }
}
showTasks();
addBtn.onclick=()=>{
    let userData=inputBox.value;
    let getLocalStorage =localStorage.getItem("New ToDo");
    if(getLocalStorage==null){
        listArr= [];
    }
    else{
        listArr= JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New ToDo",JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove("active");  //if empty is trying to add, then remove active
}

//dynamic color to the page
function change(){
    var c='#'+Math.floor(Math.random()*16777215).toString(16)
    document.getElementById("changecol").style.background=c;
}

// 2 sets of color applied on list
function color(n){
    const col=['#EE2F62','#2189A7'];
    if(n==1)
    {
        return col[0];
    }
    else
    {
        return col[1];
    }
}
function showTasks(){
    let getLocalStorage =localStorage.getItem("New ToDo");  //getting localstorage
    if(getLocalStorage==null){                      //if localstorage is null 
        listArr= [];                                //creating blank array
    }
    else{
        listArr= JSON.parse(getLocalStorage);   //transforming json string into a js object
    }
    const pendingNumb= document.querySelector(".pendingNumb");
    pendingNumb.textContent=listArr.length;     //passing the length value in pendingNumb
    if(listArr.length>0){
        deleteAllBtn.classList.add("active");   //if array length (no. of tasks)>0 then active class added (i.e clearAll btn highlighted)
    }
    else{
        deleteAllBtn.classList.remove("active");    //else remove active
    }
    let newLiTag= '';
    let n=1;
    listArr.forEach((element,index) => {
        var converted=element.toUpperCase();
        newLiTag += `<li style="background-color:${color(parseInt(n))} ; color: #fff;">${converted}<span onclick= "deleteTask(${index})"; ><i class="fas fa-check-circle"></i></span></li>`;
        n*=-1;
        
    });
    todoList.innerHTML= newLiTag;
    inputBox.value="";  //once task added, leave the input field blank
}

//delete task function (for deleting task)
function deleteTask(index){
    let getLocalStorage =localStorage.getItem("New ToDo");
    listArr= JSON.parse(getLocalStorage);
    listArr.splice(index,1);

    //after remove the li ,again update local storage
    localStorage.setItem("New ToDo",JSON.stringify(listArr));
    showTasks();
}

deleteAllBtn.onclick=()=>{
    listArr=[];
    
    //after remove all task ,again update local storage
    localStorage.setItem("New ToDo",JSON.stringify(listArr));   //transforming js object to json string
    showTasks();
}
