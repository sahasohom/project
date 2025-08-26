import { useEffect, useState } from "react"
import { deleteData, getData, postData, updateData } from "./api/PostApi"
import type { todotype } from "./Type/TodoType"
import './App.css'

const App = () => {
  const [todoData, setTodoData] = useState<todotype[]>([])
  const [data, setData] = useState<string>('');
  const [editingUser, setEditingUser] = useState<null | todotype>(null)
  useEffect(() => {
    const getTodoData = async () => {
      const res = await getData();
      console.log(res.data)
      setTodoData(res.data)
    }
    getTodoData()
  }, [])

  const onDeleteClick = async (id: string) => {
    const res = await deleteData(id)
    if (res.status === 200) {
      const updatedData = todoData.filter((todo) => {
        return todo.id !== id
      })
      setTodoData(updatedData)
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (editingUser) {
      const res = await updateData({ ...editingUser, data });
      if (res.status === 200) {
        const updatedData = todoData.map((item) =>
          item.id === editingUser.id ? res.data : item
        );
        setTodoData(updatedData);
      }
    } else {
      const res = await postData({
        id: (+todoData[todoData.length - 1].id + 1).toString(),
        data: data
      })
      if (res.status === 201) {
        const updatedData = [...todoData, res.data];
        setTodoData(updatedData);
      }
    }
    setData('');
    setEditingUser(null);
  }

  const onEditClick = async (todo: todotype) => {
    setEditingUser(todo)
    setData(todo.data);

  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="data">Todo Data</label><br />
        <input type="text" name="data" id="data" value={data} placeholder="Enter data" onChange={(e) => setData(e.target.value)} /><br />
        <button type="submit">{editingUser ? 'Edit' : 'Add'}</button>
      </form>
      <br />
      <div className="cards">
        {todoData.map((todo: todotype) => {
          console.log('todo', todo)
          return (
            <div key={todo.id} className="card">
              <p>{todo.data}</p>
              <div className="btn">
                <button className="edit-btn" onClick={() => onEditClick(todo)}>Edit</button>
                <button className="delete-btn" onClick={() => onDeleteClick(todo.id)}>Delete</button></div>
            </div>
          )
        })}
      </div></>
  )
}

export default App