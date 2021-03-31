const sleep = (time) => (new Promise((resolve) => setTimeout(resolve, time)));
// create new transaction by schedule
async function ScheduleManager(db) {

    this.running = true;

    // schedule access query 
    // SCHEDULE(isNotDeleted,  ) ---> transaction_id ---> TRANSACTION


    const schedules = await db.transactionSchedule.findAll();

    for(const schedule of schedules) {
        console.log(schedule);

        break;
    }

    console.log(schedules.length);
    
    while(this.running) {
        console.log("Schedule manager running...");
        // get schedules today will repeat
        // create new transactions
        await sleep(5000)
    }
}

module.exports = {
    ScheduleManager
};