const quotes = require('../data/quotes.json');

function pickRandom() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const q = pickRandom();

  if (req.query && req.query.format === 'text') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(200).send(q.hitokoto);
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({ id: q.id, hitokoto: q.hitokoto, from: q.from });
};
