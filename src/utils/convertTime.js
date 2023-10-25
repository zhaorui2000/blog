import dayjs from "dayjs"

export default function covertTime([hour = 0, minute = 0, second = 0] = []) {
  return dayjs().hour(hour).minute(minute).second(second)
}