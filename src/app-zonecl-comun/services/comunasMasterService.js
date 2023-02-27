import axios from 'axios';

const url = '/comunas-master';

const searchRegion = async (codRegion) => {
    const { data } = await axios.get(`${url}/search/${codRegion}`);
    return data;
}

const getOne = async (codComuna) => {
    const { data } = await axios.get(`${url}/${codComuna}`);
    return data;
}

export default { searchRegion, getOne };