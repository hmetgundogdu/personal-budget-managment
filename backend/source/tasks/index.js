const sleep = (time) => (new Promise((resolve) => setTimeout(resolve, time)));
// create new transaction by schedule
async function ScheduleManager(db) {

    const schedules = db

    console.log(schedules)

    this.running = true;
    while(this.running) {
        // get schedules today will repeat
        // create new transactions
        console.log("Schedule manager running...");
        await sleep(5000)
    }
}

module.exports = {
    ScheduleManager
};