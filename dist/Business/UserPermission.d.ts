export declare class Permission {
    private static _permissions;
    static getPermissions: (mCode?: string) => Array<any>;
    static matchCode: (item, code) => boolean;
    static validatePermission(pCod: string, moduleCode?: string): boolean;
}
