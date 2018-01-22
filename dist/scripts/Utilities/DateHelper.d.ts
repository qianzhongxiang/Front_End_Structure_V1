export interface IDateStandar {
    weekOfYear(date: Date): number;
    /** 获取该周的日期  day为第几天 默认第一天=0*/
    dateOfWeek(year: number, weekOfYear: number, day?: number): Date;
    /**只包含 yyyy WW 默认 yyyy-WW => 1990-W53 (W01) 不可以和时间 一起显示  */
    weekFormat(date: Date, format?: string): string;
    fullYear(date: Date): number;
}
