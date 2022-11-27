import axios from 'axios';

export const getEvent = async () => {
    try {
        const res =  await axios.get('http://localhost:3000/api/event')
        if(res.status === 200) {
            const data = await res.data;
            return data;
        }
        return {};
    }
    catch(e){
        console.log(e);
        return {}
    }
}
