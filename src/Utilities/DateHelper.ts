import * as moment from 'moment';
import { LogHelper } from './LogHelper';

export interface IDateStandard {
    weekOfYear(date: Date): number
    /** 获取该周的日期  day为第几天 默认第一天=0*/
    dateOfWeek(year: number, weekOfYear: number, day?: number): Date
    /**只包含 yyyy WW 默认 yyyy-WW => 1990-W53 (W01) 不可以和时间 一起显示  */
    weekFormat(date: Date, format?: string): string

    fullYear(date: Date): number
}
class DateStandardBase {
    /**
     * 
     * @param dateStr 
     * @param format 
     */
    GetDate(dateStr?: string, format?: string): Date {
        const m = moment(dateStr, format);
        if (m.isValid()) {
            return m.toDate();
        } else {
            LogHelper.Error('not a real date')
        }
    }

}
class ISODateStandard extends DateStandardBase implements IDateStandard {
    weekOfYear(date: Date): number {
        let target = new Date(date.valueOf()), dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        let thisThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        return 1 + Math.ceil((thisThursday - target.valueOf()) / 604800000);
    }
    dateOfWeek(year: number, weekOfYear: number, day: number = 0): Date {
        let target = new Date(year, 0, 4 + (weekOfYear - 1) * 7)
        target.setDate(target.getDate() - (target.getDay() + 6) % 7 + day)
        return target;
    }
    weekFormat(date: Date, format?: string): string {
        return (format || "yyyy-WW").replace(/yyyy/g, this.fullYear(date).toString()).replace(/WW/g, "W" + this.weekOfYear(date).toString())
    }
    fullYear(date: Date): number {
        let target = new Date(date.valueOf());
        target.setDate(target.getDate() - ((date.getDay() + 6) % 7) + 3);
        return target.getFullYear();
    }
}
class LocalDateStandard implements IDateStandard {
    weekOfYear(date: Date): number {
        throw new Error("Method not implemented.");
    }
    dateOfWeek(year: number, weekOfYear: number, day?: number): Date {
        throw new Error("Method not implemented.");
    }
    weekFormat(date: Date, format?: string): string {
        throw new Error("Method not implemented.");
    }
    fullYear(date: Date): number {
        throw new Error("Method not implemented.");
    }
}
export enum DateStandardTypes { 'iso', 'locale' };

/**
 * DateStandard
 * 该类获取的IDateStandard 对象 非单例对象 无需一直存在
 */
export abstract class DateStandards {
    public static get ISO(): IDateStandard {
        return this.Get(DateStandardTypes.iso);
    }
    public static get Locale(): IDateStandard {
        return this.Get(DateStandardTypes.locale);
    }
    public static Get(type: DateStandardTypes): IDateStandard {
        switch (type) {
            case DateStandardTypes.iso:
                return new ISODateStandard();
            case DateStandardTypes.locale:
            default:
                return new LocalDateStandard();
        }
    }
}



/**
 * 
 */
export class DateTime {
    private moment: moment.Moment;
    constructor(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean) {
        this.moment = moment(inp, format, language, strict);
        if (!this.moment.isValid()) {
            LogHelper.Error('not a real date')
        }
    }
    public static SetLocale(language, config?: object) {
        moment.locale(language, config);
    }
    /**
     * Format
     * @param str YYYY/YY:year  MM/M:month DD:day of month DDD:day of year
     * H/HH:hours(0-23) h/hh:(1-12) a:am A:pm m/mm:minutes s/ss:seconds
     * W/WW:Iso week of year GGGG/GG:Iso week year  w/ww:locale week of year gg/gggg:locale week year
     */
    public Format(str: string) {
        return this.moment.format(str)
    }

    public Clone() {
        return this.moment.clone();
    }

    /**
     * 设置为utc时间格式
     * 2013-02-04T10:35:24-08:00  => 2013-02-04T18:35:24+00:00
     */
    public Utc() {
        return this.moment.utc();
    }

    /**
     * millisecond
     */
    public Millisecond(number?: number) {
        return this.moment.millisecond(number);
    }

    /**
     * Second
     */
    public Second(number?: number) {
        return this.moment.second(number);
    }

    /**
     * Minute
     */
    public Minute(number?: number) {
        return this.moment.minute(number);
    }

    /**
     * Hour 设置小时
     */
    public Hour(number?: number) {
        return this.moment.hour(number);
    }

    /**
     * DateOfMonth 设置日期为月中第几天
     */
    public DateOfMonth(number?: number) {
        return this.moment.date(number);
    }

    /**
     * 设置日期为星期的第几天
     * @param number Sunday as 0 and Saturday as 6
     */
    public DayOfWeek(number?: number) {
        return this.moment.day(number);
    }

    /**
     * 设置日期为星期的第几天 (depende on local culture)
     * @param number  
     */
    public LacalDayOfWeek(number?: number) {
        return this.moment.weekday(number);
    }

    /**
     * Gets or sets the day of the year
     * @param number from 1 to 366
     */
    public DayOfYear(number?: number) {
        return this.moment.dayOfYear(number);
    }

    public WeekOfYear(number?: number) {
        return this.moment.week(number);
    }

    public IsoWeekOfYear(number?: number) {
        return this.moment.isoWeek(number);
    }

    public Month(number?: number) {
        return this.moment.month(number);
    }
    public Quarter(number?: number) {
        return this.moment.quarter(number);
    }
    public Year(number?: number) {
        return this.moment.year(number);
    }
    public LocalYear(number?: number) {
        return this.moment.weekYear(number);
    }
    /**
     * IsoYear
     */
    public IsoYear(number?: number) {
        return this.moment.isoWeekYear(number);
    }
}
