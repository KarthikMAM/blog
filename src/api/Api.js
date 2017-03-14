import request from "superagent";

const HOST = "http://localhost:3000";

function getAbout() {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/about`)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err || !res.ok) reject(err);

        res = JSON.parse(res.text);

        res.success ? resolve(res) : reject(err);
      });
  });
}

function getPayload(target, query = {}) {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/${target}`)
      .set("Accept", "application/json")
      .query(query)
      .end((err, res) => {
        if (err || !res.ok) reject(err);

        res = JSON.parse(res.text);

        res.success ? resolve(res) : reject(err);
      });
  });
}

export const Api = {
  getAbout,
  getPayload
};