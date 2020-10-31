import jwt from 'jsonwebtoken';
import {NextApiResponse, NextApiRequest} from 'next'

function authorize (req : NextApiRequest, res : NextApiResponse) {
  if(req.body.email === "manolo@mail.com" && req.body.password === "rastaman") {
    const payload = {
     email: req.body.email
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
     expiresIn: 1440
    });
    res.json({
     msg: 'OK',
     token: token
    });
  } else {
      res.status(401).send({ error: 'Not authorized'});
  }
}

export default function (req : NextApiRequest, res : NextApiResponse) {
  if (req.method === 'POST') {
    authorize(req, res);
  } else {
    // Handle any other HTTP method
    res.status(400).send({error: 'not valid HTTP method'});
  }
}
