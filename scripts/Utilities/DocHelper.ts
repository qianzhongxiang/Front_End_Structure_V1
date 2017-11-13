export abstract class ScriptsHelper {
    static Load(url: string,onload?:(this:HTMLElement,event:Event)=>any) {
        let script = document.createElement("script");
        script.async = false;
        script.setAttribute('src', url + '?' + 'time=' + Date.parse(new Date().toString()));
        script.onload=onload;
        document.head.appendChild(script);
    }
}

export abstract class CssHelper {
    static Load(url: string,onload?:(this:HTMLElement,event:Event)=>any) {
        let link = document.createElement('link');
        // link.id   = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.onload=onload;
        link.media = 'all';
        document.head.appendChild(link);
    }
}