import Bull from "bull";

const AlertAlarmDeletedQueue = new Bull("AlertAlarmDeletedQueue")

AlertAlarmDeletedQueue.process(({ data: { alarm } }) => {
    const { name } = alarm
    console.log(name)
})

export { AlertAlarmDeletedQueue }