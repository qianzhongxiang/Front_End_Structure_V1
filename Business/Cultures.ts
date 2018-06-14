import { Post } from "./Request";
import { Cookie } from "../src/Utilities/DataSet";
export class CultureInfo {
    private static LanageStorage: Object
    private static GetLanages() {
        let kind = Cookie.Get("EAMLANGUAGE") || "ENG";
        let ver = Cookie.Get('EAMVER') || "";
        Post({ url: '/Resource/Localization/' + kind + ".json?v=" + ver, async: false, method: "GET", onSuccess: d => { this.LanageStorage = typeof d === "string" ? JSON.parse(d) : d; } });
    }
    public static TranslateText(text: string): string {
        if (!this.LanageStorage) this.GetLanages();
        return this.LanageStorage[text.toLowerCase()] || text;
    }
}
