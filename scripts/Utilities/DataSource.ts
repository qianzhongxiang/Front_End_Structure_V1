export class DataSource {
    public success: (e: { sender: DataSource, data: Array<any> }) => void
    constructor(public options: { data?: Array<any>, read?: (p: { success: (data) => void }) => void }) {
        let that = this, op = that.options;
        if (op.data && !op.read){that._data=op.data; op.read = (p) => { p.success(op.data) };}
    }
    private _data: Array<any>
    public Read() {
        let that = this, options = that.options;
        options.read({ success: (data) => { that._data = data; that.success({ sender: that, data: that.Data() }); } })
    }
    public Data(): Array<any> {
        return this._data || []
    }
}