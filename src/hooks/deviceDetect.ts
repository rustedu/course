import { useEffect, useState } from 'react'
import MobileDetect from 'mobile-detect'

export const useDeviceDetect = () => {
  const [md, setMd] = useState<MobileDetect>()

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent)
    setMd(md)
  }, [])

  return md
}
