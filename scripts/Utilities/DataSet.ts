import { Ajax } from "./Ajax";
import { Observerable, IObseverable } from "../Patterns/Observerable";
import { Singleton } from "../Patterns/Singleton";
export abstract class Cookie {
    static Set(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + encodeURIComponent(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString())
    }
    static Get(c_name) {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                let c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return decodeURIComponent(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }
}

export let GetValue = (obj: Object, path: string) => {
    if (!obj) return null;
    let array = path.trim().split('.'), value: Object = obj
    for (var i = 0; i < array.length; i++) {
        if (!value) return null;
        value = value[array[i]];
    }
    return value;
    
};

export interface IConfigManager {
    /**field: name? {string} 支持路径形式：obj.Name 不是拷贝内容 小心修改*/
    GetConfig(name?: string)
    /**
     * SetPath
     */
    SetPath(path: string)
}
/**
 * ConfigManager 请使用 单例模式 GetConfigManager  {IConfigManager}
 */
export class ConfigManager implements IConfigManager {
    private path = "/config.json"
    private config: Object
    private Deserialize(): void {
        new Ajax({ url: this.path, async: false, method: "GET" }).done((d) => {
            if(!d)console.log("empty config");
            this.config = typeof d ==="string"?JSON.parse(d):d;
        });
    }
    public GetConfig(name?: string): Object {
        if (!this.config) this.Deserialize();
        return name ? GetValue(this.config, name) : this.config;
    }
    public SetPath(path: string) {
        if (path)this.path = path;
    }
}

export interface IUserSetings extends IObseverable {


}

/**
 * UserSettings 请使用 单例模式 {IUserSetings}
 */
export class UserSettings extends Observerable implements IUserSetings {

}

export let GetConfigManager: () => IConfigManager = Singleton(ConfigManager, true)
export let GetUserSettings: () => IUserSetings = Singleton(UserSettings, true)
