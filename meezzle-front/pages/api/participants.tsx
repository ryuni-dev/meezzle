import { NextApiRequest, NextApiResponse } from "next";

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