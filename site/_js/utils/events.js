const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

const isPastEvent = event => {
  return new Date(event.date).getTime() < startOfDay.getTime();
};

const sortDescByTime = (a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const sortAscByTime = (a, b) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();

module.exports = {isPastEvent, sortDescByTime, sortAscByTime};
