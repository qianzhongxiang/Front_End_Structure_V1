import { Ajax } from './../scripts/Utilities/Ajax';
import { DataSource } from './../scripts/Utilities/DataSource';
import { Nav, IMenuData } from './../scripts/Plugins/Nav';
let MenuAdapter: (data: any) => Array<IMenuData> = (data: any) => {
    let result: Array<any> = [], id = 0;//id 本应使用d.IdPrivilege;
    (data as Array<any>).forEach(d => {
        let obj: IMenuData = {};
        if (d.menus) obj.children = MenuAdapter(d.menus);
        obj.id = (++id).toString();//d.IdPrivilege;
        obj.title = d.menuname;
        obj.url = d.url;
        result.push(obj);
    })
    return result;
}
let ds = new DataSource({
    Read: p =>
        new Ajax({ url: "/Home/GerArchMenus_new", method: "POST" }).done(d => p.Success(MenuAdapter(d)))
});
let ifram=document.createElement("iframe");
ifram.style.border="0";
new Nav(document.body, { dataSource: ds, brand: "" ,brandUrl:"url",target:ifram})
document.body.appendChild(ifram)
