/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
const sleep = (time) => (new Promise((resolve) => setTimeout(resolve, time)));
const { Op } = require("sequelize");

const addTimeToDateByRepetitionTypeAndTimes = require('../modules/addTimeToDateByRepetitionTypeAndTimes');

// create new transaction by schedule automatically
async function ScheduleManager(db) {
    while (ScheduleManager.isRunning) {
        console.log("Schedule manager running...");
        // TODO Sleep alg.
        // 1) Sort desc schedule entry times by datetime now and sleep for that datetime
        // 2) If any new schedule comes from user, compare new entry time to current datetime 
        //    set new sleep dest...

        const today = new Date()
        const schedules = await db.transactionSchedule.findAll({
            where: {
                transaction_entry_time: {
                    [Op.lte]: today
                }
            }
        });

        // keeps deleted schedules
        const schedulesWillDelete = []
        // keeps updated schedules
        const schedulesWillUpdate = []
        // keeps will create transactions
        const newTransactions = []

        // genesis block
        const genesisTransactionIds = schedules.map(s => (s.dataValues.transactionId))
        console.log("ids :", genesisTransactionIds)
        const genesisTransactions = await db.transaction.findAll({
            where: {
                id: genesisTransactionIds,
                is_genesis: true
            }
        })

        // Create new transaction by its schedule
        for (const schedule of schedules) {

            const { times, repetitionType, endTime, lastCreationTime, nextCreationTime, transactionId } = schedule.dataValues
            // get clone of current schedule' transaction
            const newTransaction = { ...genesisTransactions.find(t => t.id === transactionId).dataValues };
            const scheduleWillUpdate = { ...schedule.dataValues }

            // create new transaction
            delete newTransaction.id
            delete newTransaction.createdAt
            delete newTransaction.updatedAt

            // current date of transaction
            newTransaction.startDate = nextCreationTime
            newTransaction.isGenesis = false

            newTransactions.push(newTransaction)

            console.log("endTime", endTime)
            // check and delete schedule is expires
            if (endTime != null && endTime <= today) {
                schedulesWillDelete.push(schedule)
                continue;
            }
            // update schedule
            // calculate new times
            scheduleWillUpdate.updatedAt = new Date()
            scheduleWillUpdate.lastCreationTime = nextCreationTime
            scheduleWillUpdate.nextCreationTime = addTimeToDateByRepetitionTypeAndTimes(repetitionType, times, nextCreationTime);

            // Define new entry time 1 repetitionType negative way in time 
            scheduleWillUpdate.transactionEntryTime = addTimeToDateByRepetitionTypeAndTimes(repetitionType, 1, nextCreationTime, true)
            schedulesWillUpdate.push(scheduleWillUpdate)
            console.log(scheduleWillUpdate)
        }
        // Update schedules together
        // if (schedulesWillUpdate.length > 0)
        //     db.transactionSchedule.bulkCreate(schedulesWillUpdate, { updateOnDuplicate: ["id"] }).then(r => console.log(r))
        schedulesWillUpdate.forEach(su => db.transactionSchedule.update(su, {
            where: {
                id: su.id
            }
        }))
        // Soft delete expires schedules
        if (schedulesWillDelete.length > 0)
            await db.transactionSchedule.destroy({ where: { id: schedulesWillDelete.map(s => s.dataValues.id) } })

        console.log(newTransactions)
        // Create new transactions togethe
        if (newTransactions.length > 0)
            await db.transaction.bulkCreate(newTransactions)


        console.log("Schedule manager results, newTransaction:", newTransactions.length, " schedulesWillUpdate:", schedulesWillUpdate.length, " scheduledWillDelete:", schedulesWillDelete.length)
        await sleep(10000)
    }
}

ScheduleManager.isRunning = true;

module.exports = {
    ScheduleManager
};