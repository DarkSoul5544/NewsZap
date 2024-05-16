import React, { useState, useEffect } from 'react'
import myImage from "./uploads/arrow.png"

const TopPage = () => {
  const [showImage, setShowImage] = useState(false)

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowImage(true)
    } else {
      setShowImage(false)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', right: '20px', bottom: '20px', display: showImage? 'block' : 'none' }}>
      <img
        src={myImage}
        alt="Arrow"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

export default TopPage