export abstract class ScriptsHelper {
    static Load(url: string, onload?: (this: HTMLElement, event: Event) => any) {
        let script = document.createElement("script");
        script.async = false;
        script.type = "text/javascript";
        script.setAttribute('src', url + '?' + 'time=' + Date.parse(new Date().toString()));
        script.onload = onload as any;
        var div = document.createElement("div");
        div.appendChild(script);
        document.head.appendChild(div);
    }
}

export abstract class CssHelper {
    static Load(url: string, onload?: (this: HTMLElement, event: Event) => any) {
        let link = document.createElement('link');
        // link.id   = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.onload = onload as any;
        link.media = 'all';
        document.head.appendChild(link);
    }
}

export abstract class LogHelper {
    /**
     * Error
     */
    public static Error(msg: string) {
        console.error(msg);
    }

    /**
     * Log
     */
    public static Log(msg: string) {
        console.log(msg);
    }
}

export let CreateElement = <K extends keyof HTMLElementTagNameMap>(tagName: K, ...classes: string[]): HTMLElement => {
    let e = document.createElement(tagName as string);
    e.classList.add(...classes)
    return e;
}

export let SetAttributes = <k extends HTMLElement>(element: k, attributes: object): k => {
    for (let n in attributes) {
        element.setAttribute(n, attributes[n]);
    }
    return element;
}

export let SetStyles = <k extends HTMLElement>(element: k, styles: CSSStyleDeclaration): k => {
    for (let n in styles) {
        element.style[n] = styles[n];
    }
    return element;
}

// export let Matchs=(element: HTMLElement,selector:string):boolean=>{
//     return (element.matches || element.
//     element.msMatchesSelector || 
//     element.webkitMatchesSelector ||
//     function(s) {
//         var matches = (this.document || this.ownerDocument).querySelectorAll(s),
//             i = matches.length;
//         while (--i >= 0 && matches.item(i) !== this) {}
//         return i > -1;            
//     })(selector)
// }

// export let Closest=<k extends HTMLElement>(Element:k,selector:string):HTMLElement=>{

// }