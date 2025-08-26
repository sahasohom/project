import axios from "axios"
import type { todotype } from "../Type/TodoType"
const baseURl = 'http://localhost:3000/'

const api = axios.create({
    baseURL: baseURl
})

export const getData = () => {
    return api.get('data')
}

export const deleteData = (id: string) => {
    return api.delete(`data/${id}`)
}

export const postData = (todo: todotype) => api.post("data", { id: todo.id, data: todo.data },
    { headers: { "Content-Type": "application/json" } });


export const updateData = (todo: todotype) =>
    api.patch(`data/${todo.id}`, todo, {
        headers: { "Content-Type": "application/json" },
    });

