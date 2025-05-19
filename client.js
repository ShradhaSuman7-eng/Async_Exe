
function waitOneSecond() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function fetchTodosInChunks() {
  // Get all users
  const response = await fetch("http://localhost:3000/users");
  const result = await response.json();
  const users = result.users;

  const userIds = users.map((user) => user.id);

  const allFetchedTodos = []; 
  for (let i = 0; i < userIds.length; i += 5) {
    const chunk = userIds.slice(i, i + 5);

    // Fetch todos for each user in the chunk
    const todosResponses = await Promise.all(
      chunk.map((id) =>
        fetch(`http://localhost:3000/todos?user_id=${id}`).then((res) =>
          res.json()
        )
      )
    );

    const chunkTodos = todosResponses.map((res) => res.todos).flat();
    allFetchedTodos.push(...chunkTodos); // Collect all todos

    console.log("Users:", chunk);
    console.log("Todos:", chunkTodos);

    if (i + 5 < userIds.length) {
      await waitOneSecond();
    }
  }
console.log(allFetchedTodos);
  
  // Final answer
  const finalAnswer = users.map((user) => {
    const completedCount = allFetchedTodos.filter((todo) =>  todo.isCompleted).length;
    return {
      id: user.id,
      name: user.name,
      numTodosCompleted: completedCount,
    };
  });

  console.log("Users :", finalAnswer);
}

fetchTodosInChunks();
