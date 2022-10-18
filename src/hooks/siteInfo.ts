import { useCallback, useEffect, useState } from 'react'
import { getSiteConfig } from '../api'

export const useSiteInfo = () => {
  const [config, setConfig] = useState<any>({})
  const [loading, setLoading] = useState(true)

  const init = useCallback(async () => {
    const res = await getSiteConfig()
    setLoading(false)
    setConfig(res)
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return { config, loading }
}
