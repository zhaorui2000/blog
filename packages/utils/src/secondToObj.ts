import * as mathjs from "mathjs"
export default function (value: number) {
    let hour = mathjs.chain(value).divide(3600).floor().done()
    let minute = mathjs.chain(value).mod(3600).divide(60).floor().done()
    let second = mathjs.chain(value).mod(60).floor().done();
    return {
        hour,
        minute,
        second
    };
}