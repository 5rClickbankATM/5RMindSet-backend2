const schedule = require('node-schedule');

function task() {
  console.log('🤖 Rebel bot: checking product performance...');
}

function scheduleTask() {
  schedule.scheduleJob('*/30 * * * *', task); // every 30 minutes
}

module.exports = { schedule: scheduleTask };
