import request from 'superagent';

function getName() {
  return new Promise((resolve, reject) => {
    request
      .get('http://localhost:3000/about.json')
      .end((err, res) => {
        if (err || !res.ok) { reject(err); return; }

        res = JSON.parse(res.text);

        res.success ? resolve(res.payload) : reject(err);
      });
  });
}

export const Api = {
  getName
};