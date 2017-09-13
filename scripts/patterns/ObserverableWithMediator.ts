import { Mediator } from "./Mediator";
import { Observerable } from "./Observerable";

class ObserMediator extends Mediator {
    Register(subject: ObserverableWMediator, fn: Function, type?: any) {
        super.Register(subject, fn, type)
    }
    Change(subject: ObserverableWMediator, type?: any) {
        super.Register(subject, type)
    }
    Unregister(subject: ObserverableWMediator, fn: Function, type?: any) {
        super.Register(subject, fn, type)
    }
}
//TODO need using singelton to use this ObserMediator

export class ObserverableWMediator extends Observerable {

}
