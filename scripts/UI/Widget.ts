///<reference path="../Utilities/Extend.ts"/>
///<reference path="../Patterns/Composit.ts"/>
namespace UI{
   export class Widget extends Patterns.Composit {
        protected DefaultOptions
        public Wrapper:HTMLElement
        constructor(public Element:HTMLElement,public Options={}) {
            super();
            this.Wrapper=this.Element;
            Utilities.Extend(this.Options,this.DefaultOptions)
        }
        /**
         * need to satisfiy rebuiding of widget.
         */
        protected Initialization(){
            
        }
    }
}