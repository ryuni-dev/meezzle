export interface Events {
    title: string,
    selectableParticipleTimes: {
        selectedDayOfWeeks: string[],
        beginTime: string,
        endTime: string,
    }
    color: string,
    description: string,
    dday: string | null,
}

export interface EventTimeInfo {
    startTime: Date,
    endTime: Date,
    dueTime: Date | null,
}