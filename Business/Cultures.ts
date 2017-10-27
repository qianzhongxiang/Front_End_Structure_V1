import { Ajax } from './../scripts/Utilities/Ajax';
export class CultureInfo {
    private static LanageStorage: Object
    private static GetLanages() {
        let that = this;
        if (!that.LanageStorage) new Ajax({ url: "/Home/GerCultureInfo", async: false}).done(d => that.LanageStorage = d);
    }
    public static TranslateText(text: string) {
        if (!this.LanageStorage) this.GetLanages();
        return this.LanageStorage[text] || text;
    }
}