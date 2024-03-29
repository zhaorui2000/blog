export default function (value: number) {
    var hour = Math.floor(value / 3600);
    var minute = Math.floor((value % 3600) / 60);
    var second = value % 60;
    return {
        hour,
        minute,
        second
    };
}