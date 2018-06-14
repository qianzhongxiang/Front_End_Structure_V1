// import { CreateElement } from './../Utilities/DocHelper';
// import { VinciWidget } from './../UI/VinciWidget';
// export class PageTabs extends VinciWidget<any>{
//     private tpItems: Array<{ title: string, url: string, id: string }> = []
//     private tabsDiv: HTMLUListElement
//     private iframeContainer: HTMLDivElement
//     protected Initialization() {
//         if (!this.tabsDiv) {
//             this.tabsDiv = document.createElement("ul");
//             this.tabsDiv.classList.add("nav", "nav-tabs", "nav-justified");
//             this.Element.appendChild(this.tabsDiv);
//         }
//         if (!this.iframeContainer) {
//             this.iframeContainer = document.createElement("div");
//             this.Element.appendChild(this.iframeContainer);
//         }
//     }
//     private BuildNavItem(item: { title: string, url: string, id: string }): HTMLLIElement {
//         let li = CreateElement("li", "nav-item"), a: HTMLAnchorElement;
//         li.appendChild(a = CreateElement("a", "nav-link"))
//             .appendChild(CreateElement("button", "close")).innerHTML = "<span>&times;</span>";
//         a.innerText = item.title;
//         li.dataset.id = item.id;
//         a.addEventListener("click", this.A_Click.bind(this))
//         return li;
//     }
//     private A_Click(e: MouseEvent) {
//         e.preventDefault();
//         let target = e.target as HTMLElement, li = target.closest("li");
//         let remove = target instanceof HTMLButtonElement;
//         let iframs = this.iframeContainer.getElementsByTagName("iframe"), lis = this.tabsDiv.querySelectorAll('li')
//         , index = lis.ind, id = li.dataset.id
//         if (!remove) {
//             for (let i = 0; i < iframs.length; i++) {
//                 let iframe = iframs[i];

//                 iframe.classList.add("d-none");
//                 lis[i].classList.remove("active");
//             }
//         }
//         if (remove) {
//             iframs[index]
//                     iframe.parentElement.removeChild(iframe);
//                     li.parentElement.removeChild(li);
//         }
//         else {
//             iframe.classList.remove("d-none");
//         }
//     }
//     private Close(li: HTMLLIElement) {
//         li.parentElement.removeChild(li)
//     }
//     public AddPage(item: { title: string, url: string, id: string }) {
//         let i;
//         if (!(i = this.tpItems.filter(i => i.id === item.id)[0])) {
//             this.tpItems.push(i = item)
//             this.tabsDiv.appendChild(this.BuildNavItem(item))
//         } else {

//             if (!included) {
//                 that.iframeContainer.appendChild(that.iframe);
//                 that.iframe.classList.add(SELECTED);
//             }
//             this.tabPage.selectedMothed({ sender: that });
//         }
//     }
// }

// export class TabPageItem {
//     public tabElement: HTMLDivElement
//     public iframe: HTMLIFrameElement
//     public tabPage: TabPage
//     constructor(private title: string, private url: string, public id: string, private iframeContainer: HTMLDivElement) {
//     }
//     build(): HTMLDivElement {
//         let that = this;
//         if (!that.tabElement) {
//             let spen = document.createElement("span");
//             spen.textContent = that.title;
//             that.tabElement = document.createElement("div");
//             that.tabElement.classList.add("v_tabPage_Tab");
//             that.tabElement.appendChild(spen);
//             spen = document.createElement("span");
//             spen.classList.add("v_tabPage_Tab_rm");
//             // spen.textContent = "X";
//             spen.onclick = (e) => { e.stopPropagation(); that.distory(); };
//             that.tabElement.appendChild(spen);
//             that.tabElement.onclick = (e) => { that._click(e) }
//         }
//         if (!that.iframe) {
//             that.iframe = document.createElement("iframe");
//             that.iframe.classList.add("v_tabPage_Iframe");
//             that.iframe.id = that.id;
//             that.iframe.src = that.url;
//         }
//         return that.tabElement;
//     }
//     private _click(e?: MouseEvent) {
//         let that = this, iframs = that.iframeContainer.getElementsByTagName("iframe"), included = false;
//         for (let i = 0; i < iframs.length; i++) {
//             let iframe = iframs[i];
//             if (iframe.id !== that.id)
//                 iframe.classList.remove(SELECTED);
//             else {
//                 included = true;
//                 iframe.classList.add(SELECTED);
//             }
//         }
//         if (!included) {
//             that.iframeContainer.appendChild(that.iframe);
//             that.iframe.classList.add(SELECTED);
//         }
//         this.tabPage.selectedMothed({ sender: that });
//     }
//     public click() {
//         this._click()
//     }
//     distory() {
//         if (this.iframe) {

//             this.iframe.parentElement.removeChild(this.iframe)

//             delete this.iframe;
//         }
//         if (this.tabElement) {
//             if (this.tabElement.classList.contains("selected") && this.tabElement.previousSibling) {
//                 (this.tabElement.previousElementSibling as HTMLDivElement).click()
//             }
//             this.tabElement.parentElement.removeChild(this.tabElement);
//             delete this.tabElement;
//         }
//         if (this.tabPage) {
//             let t = this.tabPage;
//             delete this.tabPage;
//             t.remove(this.id);
//         }
//     }
// }
// export class TabPage {
//     private tpItems: Array<TabPageItem> = []
//     private tabsDiv: HTMLDivElement
//     private iframeContainer: HTMLDivElement
//     private tcLBtn: HTMLDivElement
//     private tcrBtn: HTMLDivElement
//     constructor(private element: HTMLDivElement) {
//         this.element.classList.add("v_tabPage");
//         this.build()
//     }
//     private build() {
//         let that = this;
//         if (!that.tabsDiv) {
//             that.tabsDiv = document.createElement("div");
//             that.tabsDiv.classList.add("v_tabPage_TabContainer");
//             that.element.appendChild(that.tabsDiv);
//         }
//         if (!that.tcLBtn) {
//             that.tcLBtn = document.createElement("div");
//             that.tcLBtn.classList.add("v_tabPage_tcLBtn");
//             that.element.appendChild(that.tcLBtn);
//             that.tabsDiv.onclick = () => that.tcLBtn_clik();
//         }
//         if (!that.tcrBtn) {
//             that.tcrBtn = document.createElement("div");
//             that.tcrBtn.classList.add("v_tabPage_tcrBtn");
//             that.element.appendChild(that.tcrBtn);
//         }
//         if (!that.iframeContainer) {
//             that.iframeContainer = document.createElement("div");
//             that.iframeContainer.classList.add("v_tabPage_IframeContainer");
//             that.element.appendChild(that.iframeContainer);
//         }

//         that.decorate()
//     }
//     /**
//      * 主要实现leftMove rightMove
//      */
//     private decorate() {

//     }
//     public add(item: { title: string, url: string, id: string }): TabPageItem {
//         let i: TabPageItem;
//         if (!(i = this.tpItems.filter(i => i.id === item.id)[0])) {
//             i = new TabPageItem(item.title, item.url, item.id, this.iframeContainer);
//             i.tabPage = this;
//             this.tpItems.push(i)
//             this.tabsDiv.appendChild(i.build())
//         } else {
//             i.click();
//         }
//         return i;
//     }
//     public selectedMothed(e: { sender: TabPageItem }) {
//         let that = this, tpItems = that.tpItems, sender = e.sender;
//         if (!sender.tabElement.classList.contains(SELECTED)) {
//             tpItems.forEach(i => i.tabElement.classList.remove(SELECTED));
//             sender.tabElement.classList.add(SELECTED);
//         }
//     }
//     public remove(id: string) {
//         let i = this.tpItems.indexOf(this.tpItems.filter(item => item.id === id)[0]);
//         if (i !== -1)
//             this.tpItems.splice(i, 1)[0].distory();
//     }
//     public tcLBtn_clik() {

//     }
//     public tcrBtn_clik() {

//     }
//     public TabCount(): number {
//         return this.tpItems.length;
//     }
// }
