const schedule = require('node-schedule');

function task() {
  console.log('📈 Echo bot: analyzing marketing and SEO...');
}

function scheduleTask() {
  schedule.scheduleJob('*/30 * * * *', task);
}

module.exports = { schedule: scheduleTask };
