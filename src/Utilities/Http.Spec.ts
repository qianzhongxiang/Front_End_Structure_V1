import { UrlHelper } from "./Http";

// how to test , 可以启动一个node js service 作为模拟器 进行调试

describe('These test for urlhelper', () => {
    it('should get url of current window', () => {
        const url = UrlHelper.Current;
        expect(url).toBeTruthy();
        expect(url.GetHost()).toEqual('localhost:9876');
        url.SetParam('name', '12');
        url.SetParam('code', 'code12');
        expect(url.toString()).toEqual('http://localhost:9876/context.html?name=12&code=code12');
        expect(url.GetParam('name')).toEqual('12');
    });
    it(' should be able to create a new Url', () => {
        const url = UrlHelper.CreateOne('http://localhost:9876/context.html');
        expect(url).toBeTruthy();
        expect(url.GetHost()).toEqual('localhost:9876');

        url.SetParams({
            'name': '12',
            'code': 'code12'
        });
        expect(url.toString()).toEqual('http://localhost:9876/context.html?name=12&code=code12');
    })
})