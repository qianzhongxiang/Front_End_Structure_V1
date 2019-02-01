export abstract class LogHelper {
    /**
     * Error
     */
    public static Error(msg: string) {
        console.error(msg);
    }

    /**
     * Log
     */
    public static Log(msg: string) {
        console.log(msg);
    }
}