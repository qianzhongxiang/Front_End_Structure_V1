import { SingletonFactory } from "./Singleton";

class TestClass {

    constructor(public value: number) {
        console.log('start');
    }
}
describe('tests for singleton', () => {
    let instance
    beforeAll(() => {
        SingletonFactory.SetSingletonConstructor('TestClass', TestClass, 9)
        instance = SingletonFactory.GetSingleton<TestClass>('TestClass');
    });

    beforeEach(() => {
        instance.value = 9;
    })
    it('TestClass should be initialized and the value of the instance should be 9', () => {
        const instance = SingletonFactory.GetSingleton<TestClass>('TestClass');
        expect(instance).toBeTruthy();
        expect(instance.value).toEqual(9);
    });

    it('the value of the instance should be 10 after plused 1', () => {

        const instance = SingletonFactory.GetSingleton<TestClass>('TestClass');
        instance.value++;

        const instanceAgain = SingletonFactory.GetSingleton<TestClass>('TestClass')
        expect(instanceAgain.value).toEqual(10);
    });

})