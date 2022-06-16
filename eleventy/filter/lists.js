module.exports = [
  ["ordered", (list) => [...(list ?? [])].sort((a, b) => a.data?.order - b.data?.order)],
];
