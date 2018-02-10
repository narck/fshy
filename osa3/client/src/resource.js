import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' :'http://huono.website/moro/api/


export const add = (person) => axios.post(baseUrl + '/persons', person)
export const remove = (person) => axios.delete(baseUrl + '/persons/' + person.id)
export const update = (person) => axios.put(baseUrl + '/persons/' + person.id, person)
export const all = () => axios.get(baseUrl + '/persons').then((r) => r.data)