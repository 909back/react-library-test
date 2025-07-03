import React, { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import styles from "./Swiper.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

namespace Swiper {
  export interface Data {
    id: number
    image: string
    link?: string
    order: number
  }
}

interface SwiperProps<T extends Swiper.Data> {
  width: number
  height: number
  data: T[]
  auto?: boolean
  duration?: number
}

const Swiper = <T extends Swiper.Data>({
  width,
  height,
  data,
  auto = true,
  duration = 3000
}: SwiperProps<T>) => {
  const [render, setRender] = useState<{
    prev?: T
    current: T
    next?: T
  }>({
    current: data[0]
  })

  const [isAuto, setIsAuto] = useState(auto)
  const [style, setStyle] = useState<CSSProperties>({}) 
  const timerRef = useRef<number>(null)
  const rafRef = useRef<number>(0)
  const dir = 1

  const slide = () => {
    let start: number | null = null

    const initialize = () => {
      const lastIdx = data.length - 1
      let nextIdx = data.findIndex(item => item.id === render.current.id) + dir
      nextIdx = nextIdx > lastIdx ? 0 : nextIdx < 0 ? lastIdx : nextIdx

      setIsAuto(true)
      setRender({
        current: render.current,
        next: data[nextIdx]
      })
      setStyle({
        transform: `translate3d(0, 0, 0)`
      })
    }


    const end = () => {
      cancelAnimationFrame(rafRef.current)

      setIsAuto(false)
      setRender(prev => ({current: prev.next!}))
      setStyle({
        transform: `translate3d(0, 0, 0)`,
      })
      timerRef.current = null
    }

    const step = (timestamp: number) => {
      if(!start) start = timestamp
      const diff = timestamp - start
      const progress = Math.min(diff / duration, 1)

      if(diff < duration) {
        setStyle({transform: `translate3d(${width * progress * -1}px, 0, 0)`})
        rafRef.current = requestAnimationFrame(step)
      }
      else end()
    }

    initialize()
    rafRef.current = requestAnimationFrame(step)
  }
  
    
  useEffect(() => {
    if(!isAuto) return
    timerRef.current = setTimeout(slide, 5000)
    return () => {
      if(rafRef.current) cancelAnimationFrame(rafRef.current)
      if(timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isAuto, data, timerRef, rafRef])

  
  const sizeStyles = { width, height }
  return <div style={sizeStyles} className={cx('swiper-wrapper')}>
    <div className={cx('swiper-inner')}>
      <ul style={style} className={cx('swiper-list')}>
        <li style={sizeStyles} className={cx('swiper-item')}>
          <img src={render.current.image}/>
        </li>
        {
          !!render.next &&    <li style={sizeStyles} className={cx('swiper-item')}>
          <img src={render.next.image}/>
        </li>
        }
      </ul>
    </div>
  </div>
}

export default Swiper