import { useEffect, useState } from 'react'

function getRemainingTime(targetDate) {
  const targetTime = new Date(targetDate).getTime()
  const difference = Math.max(targetTime - Date.now(), 0)

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return {
    days,
    hours,
    minutes,
    seconds,
    hasEnded: difference === 0,
  }
}

export function useCountdown(targetDate) {
  const [remainingTime, setRemainingTime] = useState(() =>
    getRemainingTime(targetDate),
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRemainingTime(getRemainingTime(targetDate))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [targetDate])

  return remainingTime
}
