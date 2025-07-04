const schedule = require('node-schedule');

function task() {
  console.log('📦 Atlas bot: tracking fulfillment and logistics...');
}

function scheduleTask() {
  schedule.scheduleJob('*/30 * * * *', task);
}

module.exports = { schedule: scheduleTask };
