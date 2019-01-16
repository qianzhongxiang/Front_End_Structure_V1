import { LogHelper } from "../Utilities/Index";

/**
 * 
 */
export abstract class SingletonFactory {
    private static constructors: { [k: string]: new (...parameters: any[]) => any } = {};
    private static parameters: { [k: string]: any[] } = {};
    private static instances: { [k: string]: any } = {};
    static SetSingletonConstructor(name: string, _class: new (...parameters: any[]) => any, ...parameters: any[]) {
        if (!name || !_class) {
            LogHelper.Error('parameters is null or undefined');
        }
        if (this.constructors[name]) {
            LogHelper.Error(`${name} is existed in SingletonFactory.constructors`);
        }
        this.constructors[name] = _class;
        if (parameters) {
            this.parameters[name] = parameters;
        }
    }
    static GetSingleton<T>(name: string): T {
        return this.instances[name] ||
            (this.instances[name] = new this.constructors[name](this.parameters[name]));
    }
}