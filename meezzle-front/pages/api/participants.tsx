import { NextApiRequest, NextApiResponse } from "next";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const participant = [
    // {
    //     pid: 1,
    //     name: 'A',
    //     password: "a"
    // },
    // {
    //     pid: 2,
    //     name: 'B',
    //     password: ""
    // },
    // {
    //     pid: 1,
    //     name: 'C',
    //     password: ""
    // }
    {
        "code": "SUCCESS",
        "message": "string",
        "data": {
          "userId": 0,
          "name": "A",
          "email": ""
        }
      }
]

export default (req:NextApiRequest, res:NextApiResponse) => {
    // const data = req.body;
    res.status(200).json(participant);
}