# Patterns

## singleton
为开发者提供单例解决方案

### why singleton:

### usage:
``` ts
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
SingletonFactory.SetSingletonConstructor('TestClass', TestClass, 9)

console.log('complete setting');

//观察 实体值
console.log(SingletonFactory.GetSingleton<TestClass>('TestClass').value)

//modify the value of singleton
SingletonFactory.GetSingleton<TestClass>('TestClass').value++;

//show the value of singleton again to test that it is single
console.log(SingletonFactory.GetSingleton<TestClass>('TestClass').value)

```


# Utilities

## HttpClient
### why is HttpClient

### usage
``` ts
import { HttpRequestConfigBuilder, HttpClient } from "../src/Utilities/Http";

// create init parameters
new HttpRequestConfigBuilder().WithCors('no-cors').WithCredentials('omit')
    .WithFormData(new FormData()).Post();
// or using DefaultBuilder with post;'same-origin credentials';'cors'
const data = new HttpRequestConfigBuilder().DefaultBuilder().WithJson({});

// launch request :发起一个请求
new HttpClient().Request('url string', data.Build())
    .then(d => {
        d.data.info = 'I\'m json object from response data if resonse content type is "application/json" '
        return d.data;
    })
    .then(d => {
        console.log(JSON.stringify(d));
    }).catch(e => {
        console.log('show the error');
    })

//an anther method using Request object directly
new HttpClient().Request(new Request('', {}))
```


## Guid
### usage:
``` ts
import { Guid } from "../src/Utilities/Guid";

// string
Guid.Empty();

// create a new guid
Guid.NewId();

// test a string is a guid
Guid.Validate('')  //false
Guid.Validate(Guid.NewId())  //true
```

## Type
### usage:
``` ts
import { Type } from "../src/Utilities/Type";

Type('')  //string
Type({})  //object
Type(function () { }) //function
Type(new Date()) //date
Type(22)  //number
Type(/sss/)  //regexp
Type([])  //array
```