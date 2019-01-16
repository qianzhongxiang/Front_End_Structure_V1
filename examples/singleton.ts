import { SingletonFactory } from './../src/Patterns/Singleton';

/**
 * the class used with singleton contain value field 需要单例使用的类
 */
class TestClass {
    constructor(public value: number) {
        console.log('start');
    }
}

//set TestClass as singleton
SingletonFactory.SetSingletonConstructor('TestClass', TestClass, 9);

console.log('complete setting');

//观察 实体值
console.log(SingletonFactory.GetSingleton<TestClass>('TestClass').value);

//modify the value of singleton
SingletonFactory.GetSingleton<TestClass>('TestClass').value++;

//show the value of singleton again to test that it is single
console.log(SingletonFactory.GetSingleton<TestClass>('TestClass').value);


