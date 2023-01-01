import axios from 'axios';
import { Events } from '../types/EventProps';

export const getEvents = async () => {
    try {
        // const res =  await axios.get('http://localhost:3000/api/event')
        const res =  await axios.get('/api/event')
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

export const getEvents_test = async () => {
    try {
        const res =  await axios.get('/api/event')
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

export const getEvent = async (eid: string) => {
    try {
        // const res =  await axios.get('http://localhost:3000/api/event' + eid)
        const res =  await axios.get('/api/event')
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

const test_data = {
    "title": "string",
    "selectableParticipleTimes": [
      "MONDAY[T]10:00:00-12:00:00|13:00:00-14:00:00|"
    ],
    "color": "#FFFFFF",
    "description": "string",
    "dday": "2022-05-30T12:00:00.000"
  }

export const postCreate_test = async (data: Events) => {
    try {
        const res =  await axios.post(process.env.NEXT_PUBLIC_API_EVENT_CREATE+'',
        data,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            },
        }
        )
        if(res.status === 200) {
            const data = await res.data;
            console.log(data);
            return data;
        }
        // return {};
    }
    catch(e){
        console.log(e);
        return {}
    }
}