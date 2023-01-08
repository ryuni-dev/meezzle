export const settingISOLocalTimeZone  = (time: Date) => {
    const offset = time.getTimezoneOffset() * 60000
    const dateOffset = new Date(time.getTime() - offset);

    return dateOffset.toISOString()
}