import { Observerable, IObseverable } from "../Patterns/Observerable";
export declare abstract class Cookie {
    static Set(c_name: any, value: any, expiredays: any): void;
    static Get(c_name: any): string;
}
export declare let GetValue: (obj: Object, path: string) => Object;
export interface IConfigManager {
    /**field: name? {string} 支持路径形式：obj.Name 不是拷贝内容 小心修改*/
    GetConfig(name?: string): any;
    /**
     * SetPath
     */
    SetPath(path: string): any;
}
/**
 * ConfigManager 请使用 单例模式 GetConfigManager  {IConfigManager}
 */
export declare class ConfigManager implements IConfigManager {
    private path;
    private config;
    private Deserialize();
    GetConfig(name?: string): Object;
    SetPath(path: string): void;
}
export interface IUserSetings extends IObseverable {
}
/**
 * UserSettings 请使用 单例模式 {IUserSetings}
 */
export declare class UserSettings extends Observerable implements IUserSetings {
}
export declare let GetConfigManager: () => IConfigManager;
export declare let GetUserSettings: () => IUserSetings;
