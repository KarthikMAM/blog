import request from 'superagent';

function getAbout() {
  return new Promise((resolve, reject) => {
    request
      .get('http://localhost:3000/about.json')
      .end((err, res) => {
        if (err || !res.ok) { reject(err); return; }

        res = JSON.parse(res.text);

        res.success ? resolve(res) : reject(err);
      });
  });
}

function getPayload(target, query = {}) {
  return new Promise((resolve, reject) => {
    request 
      .get(target)
      .query(query)
      .end((err, res) => {
        if (err || !res.ok) { reject(err); return; }

        res = JSON.parse(res.text);

        res.success ? resolve(res) : reject(err);
      });
  });
}

export const Api = {
  getAbout,
  getPayload
};