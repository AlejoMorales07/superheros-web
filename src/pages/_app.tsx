import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import 'src/styles/index.scss'

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/mutants')
    }
  }, [router])
  return <Component {...pageProps} />
}

export default MyApp
