async function printData(){
  const response=await fetch("http://localhost:3000/users");
  const data=await response.json();
  console.log(data);
}
// printData();



//Fetch the todos for first 5 users concurrently.
function delayforOne(){
  return new Promise(resolve=>{
    setTimeout(resolve,1000);
  })
}

async function fetchFive() {
  const response = await fetch("http://localhost:3000/todos");
  const data = await response.json();

  const todos = data.todos;
  // console.log(todos)
  const length = todos.length;

  for (let i = 0; i < length; i += 5) {
    const chunk = todos.slice(i, i + 5);
    console.log('Todos chunk:', chunk);

    if(i+5<length){
      await delayforOne();
    }
  }

}

// fetchFive();


//Once todos for all users are fetched, calculate how many todos are completed for each user and print the result in the following format:

async function countTodosByUser() {
  const response = await fetch("http://localhost:3000/todos");
  const data = await response.json();

  const todos = data.todos;

  const finalAns = {}; 

  for (const todo of todos) {
    // const userId = Number(todo.id)%10;
    // console.log(userId)

    if (!finalAns[userId]) {
      finalAns[userId] = 0;
    }

    if (todo.isCompleted) {
      finalAns[userId]++;
    }
  }


}

countTodosByUser();

