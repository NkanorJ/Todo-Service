
const list = document.querySelector('ul');
const form = document.querySelector('form');

const addTodo = (todo, id) => {
  let time = todo.created_at.toDate();
  let html = `
    <li data-id="${id}">
      <div>${todo.title}</div>
      <div><small>${time}</small></div>
      <button class="btn btn-danger btn-sm my-2">delete</button>
    </li>
  `;

  list.innerHTML += html;
};

const deleteTodo = (id) => {
  const todos = document.querySelectorAll('li');
  todos.forEach(todo => {
    if(todo.getAttribute('data-id') === id){
      todo.remove();
    }
  });
};

// real-time listener
db.collection('todos').onSnapshot(snapshot => {
  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => {
    const doc = change.doc;
    if(change.type === 'added'){
      // console.log(doc);
      addTodo(doc.data(), doc.id)
    } else if (change.type === 'removed'){
      deleteTodo(doc.id);
    }
  });
});

// save documents
form.addEventListener('submit', e => {
  e.preventDefault();

  const now = new Date();
  const todo = {
    title: form.todo.value.trim(),
    created_at: firebase.firestore.Timestamp.fromDate(now)

  };

  db.collection('todos').add(todo).then(() => {
    //console.log('todo added');
    form.reset();
  }).catch(err => {
    console.log(err);
  });
});

// deleting data
list.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('todos').doc(id).delete().then(() => {

    });
  }
});
