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

// function change(){
//     var col='#';
//     var letters=['000000','00FF00','C0C0C0','00FFFF'];
//     col+=letters[Math.floor(Math.random()*letters).length];
//     document.getElementById("change").style.background=col;
//     alert("Page is loaded");
// }

//generate randomcolor for list
function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
    
    //random color will be freshly served
}
//generate invert color for list items
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
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
    
    listArr.forEach((element,index) => {
        let m= generateRandomColor();
        newLiTag += `<li style="background-color:${generateRandomColor()} ; color: ${invertColor(m)} ;">${element}<span onclick= "deleteTask(${index})"; ><i class="fas fa-check-circle"></i></span></li>`;
        
        
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