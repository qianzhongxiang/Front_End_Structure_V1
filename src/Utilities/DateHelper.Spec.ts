import { DateTime } from "./DateHelper";

describe('tests for dateHelper', () => {
    const moment = new DateTime('2019/1/12')
    it('the moment should be initial created', () => {
        expect(moment).toBeTruthy();
    });
    it('getted format string of the moment should be "12-1 2019"', () => {
        expect(moment.Format('DD-M YYYY')).toEqual('12-1 2019');
    })
})