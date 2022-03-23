export const msToStr = ms => {
  let milliseconds = Math.floor((ms % 1000) / 100),
    seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor((ms / (1000 * 60 * 60)));

  if (milliseconds >= 5) {
    seconds = (seconds + 1) % 60
    if (seconds === 0) {
      minutes = (minutes + 1) % 60
      if (minutes === 0)
        hours += 1
    }
  }

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}