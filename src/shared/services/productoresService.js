import axios from 'axios';

const url = '/productores';

const getAll = async () => {
    const { data } = await axios.get(url);
    return data;
}

const getOne = async (id) => {
    const { data } = await axios.get(`${url}/${id}`);
    return data;
}

export default { getAll, getOne };