export declare class DataSource {
    options: {
        Data?: Array<any>;
        Read?: (p: {
            Success: (data) => void;
        }) => void;
    };
    Success: (e: {
        Sender: DataSource;
        Data: Array<any>;
    }) => void;
    constructor(options: {
        Data?: Array<any>;
        Read?: (p: {
            Success: (data) => void;
        }) => void;
    });
    private _data;
    Read(): void;
    Data(): Array<any>;
}
