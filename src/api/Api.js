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
      .get(`${HOST}/${escape(target)}`)
      .set("Accept", "application/json")
      .query(query)
      .end((err, res) => {
        if (err || !res.ok) reject(err);

        res = JSON.parse(res.text);

        res.success ? resolve(res) : reject(err);
      });
  });
}

function getSearch(type, q) {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/search`)
      .set("Accept", "application/json")
      .query({ type, q })
      .end((err, res) => res.ok ? resolve(JSON.parse(res.text)) : reject(err));
  });
}

export const Api = {
  getAbout,
  getPayload,
  getSearch
};