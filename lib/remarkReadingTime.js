import readingTime from 'reading-time'

export default function () {
  return (_, file) => {
    file.readingTime = readingTime(file.contents)
  }
}
