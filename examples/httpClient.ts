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