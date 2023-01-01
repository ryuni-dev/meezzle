export interface Events {
    title: string,
    selectableDays: string[],
    // selectableTimes: string,
    startTime: string,
    endTime: string,
    color: string,
    description: string,
    dday: string,
}

export interface EventTimeInfo {
    startTime: Date,
    endTime: Date,
    dueTime: Date,
}