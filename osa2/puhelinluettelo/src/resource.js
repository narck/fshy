import axios from 'axios'

export const add = (person) => axios.post("http://localhost:3001/persons", person)
export const remove = (person) => axios.delete("http://localhost:3001/persons/" + person.id)
export const update = (person) => axios.put("http://localhost:3001/persons/" + person.id, person)
export const all = () => axios.get("http://localhost:3001/persons").then((r) => r.data)