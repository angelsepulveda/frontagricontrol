import axios from 'axios';

const url = '/calendarios';

const getAll = async () => {
    const { data } = await axios.get(url);
    return data;
}

const getOne = async (codCalendario) => {
    const { data } = await axios.get(`${url}/${codCalendario}`);
    return data;
}


const insert = async (calendarios) => {
    const { data } = await axios.post(`${url}`, calendarios);
    return data;
}

const update = async (codCalendario,calendarios) => {
    const { data } = await axios.put(`${url}/${codCalendario}`,calendarios);
    return data;
}

const del = async (codCalendario) => {
    const data = await axios.delete(`${url}/${codCalendario}`);
    return data;
}

export default { getAll, getOne, insert, update, del };