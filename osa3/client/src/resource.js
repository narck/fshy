import axios from 'axios'

export const add = (person) => axios.post("http://huono.website/moro/api/persons", person)
export const remove = (person) => axios.delete("http://huono.website/moro/api/persons/" + person.id)
export const update = (person) => axios.put("http://huono.website/moro/api/persons/" + person.id, person)
export const all = () => axios.get("http://huono.website/moro/api/persons").then((r) => r.data)