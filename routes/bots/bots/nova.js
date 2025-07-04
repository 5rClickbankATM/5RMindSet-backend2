const schedule = require('node-schedule');

function task() {
  console.log('💬 Nova bot: engaging with customers...');
}

function scheduleTask() {
  schedule.scheduleJob('*/30 * * * *', task);
}

module.exports = { schedule: scheduleTask };
