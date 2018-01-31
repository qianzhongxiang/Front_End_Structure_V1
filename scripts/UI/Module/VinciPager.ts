import { Extend } from './../../Utilities/Extend';
import { IVinciPagerOptions } from './VinciPager';
import { VinciWidget } from './../VinciWidget';
export interface IVinciPagerOptions{
    
}

export class VinciPager extends VinciWidget<IVinciPagerOptions>{
    public Events={Change:'Change'} //Extend(super.Events,)
    constructor(element:HTMLDivElement,options?:IVinciPagerOptions){
        super(element,options);
    }
    protected Initialization(){

    }
}