"use client"
import { useState, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { Copy, Download, Share2, Check, ChevronDown, Code, ChevronLeft, ChevronRight } from 'lucide-react'

const GradientCard = ({ gradient, gradientsList = [], onGradientChange }) => {
  const [copied, setCopied] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const menuRef = useRef(null)

  const gradientValue = gradient.css.match(/linear-gradient\([^)]*\)/)?.[0] || gradient.css
  const gradientType = gradient.type || "linear"
  const colorCount = gradient.colors.length

  // Spring animations
  const cardSpring = useSpring({
    y: 0,
    config: { tension: 300, friction: 20 },
  })

  const popupSpring = useSpring({
    opacity: isFullScreen ? 1 : 0,
    scale: isFullScreen ? 1 : 0.9,
    config: { tension: 280, friction: 20 },
  })

  const contentSpring = useSpring({
    opacity: isFullScreen ? 1 : 0,
    y: isFullScreen ? 0 : 50,
    config: { tension: 280, friction: 20 },
  })

  const copyToClipboard = (text = gradient.css) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([gradient.css], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${gradient.name.toLowerCase().replace(/\s+/g, '-')}-gradient.css`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${gradient.name} Gradient`,
        text: `Check out this beautiful ${gradient.name} gradient!`,
        url: window.location.href,
      })
    } else {
      copyToClipboard()
    }
  }

  const handleNextGradient = () => {
    if (!Array.isArray(gradientsList) || gradientsList.length === 0) return
    const currentIndex = gradientsList.findIndex(g => g.name === gradient.name)
    if (currentIndex === -1) return
    const nextIndex = (currentIndex + 1) % gradientsList.length
    onGradientChange?.(gradientsList[nextIndex])
  }

  const handlePrevGradient = () => {
    if (!Array.isArray(gradientsList) || gradientsList.length === 0) return
    const currentIndex = gradientsList.findIndex(g => g.name === gradient.name)
    if (currentIndex === -1) return
    const prevIndex = (currentIndex - 1 + gradientsList.length) % gradientsList.length
    onGradientChange?.(gradientsList[prevIndex])
  }

  const cardContent = (
    <>
      <div className="relative group">
        <animated.div 
          className="h-48 w-full cursor-pointer"
          style={{ 
            background: gradientValue, 
            transform: cardSpring.y.to(y => `translateY(${y}px)`)
          }}
          onClick={() => setIsFullScreen(true)}
          onMouseEnter={() => cardSpring.y.start(-5)}
          onMouseLeave={() => cardSpring.y.start(0)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </animated.div>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-black/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
            {gradientType}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm text-gray-700 hover:text-gray-900 transition-colors"
            onClick={copyToClipboard}
            title="Copy CSS"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
          <button
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="More options"
          >
            <ChevronDown size={16} className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="absolute top-14 right-3 bg-white rounded-lg shadow-lg z-10 overflow-hidden border border-gray-100"
          >
            <div className="py-1">
              <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-sm">
                <Download size={16} />
                <span>Download CSS</span>
              </button>
              <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-sm">
                <Share2 size={16} />
                <span>Share gradient</span>
              </button>
              <button 
                onClick={() => { copyToClipboard(); setIsMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-sm"
              >
                <Code size={16} />
                <span>Copy CSS code</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">
            {gradient.name}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {colorCount} {colorCount === 1 ? 'color' : 'colors'}
          </span>
        </div>

        <div className="flex gap-1 mb-4">
          {gradient.colors.map((color, index) => (
            <div 
              key={index} 
              className="relative group/color flex-1 h-8 rounded-md border border-gray-200 transition-all hover:scale-105"
              style={{ backgroundColor: color }}
              title={color}
            >
              <div className="absolute inset-0 opacity-0 group-hover/color:opacity-100 flex items-center justify-center bg-black/30 rounded-md transition-opacity">
                <button 
                  className="p-1 bg-white/90 rounded-full"
                  onClick={() => copyToClipboard(color)}
                >
                  <Copy size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {isDetailsOpen && (
          <div className="mb-4">
            <div className="bg-gray-50 p-3 rounded-lg text-sm font-mono text-gray-700 overflow-x-auto">
              {gradient.css}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => copyToClipboard()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex-1 transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy CSS'}</span>
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Share gradient"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Download CSS"
          >
            <Download size={18} />
          </button>
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title={isDetailsOpen ? "Hide details" : "Show details"}
          >
            <ChevronDown className={`transform transition-transform ${isDetailsOpen ? 'rotate-180' : ''}`} size={18} />
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <animated.div 
        className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100"
        style={{ transform: cardSpring.y.to(y => `translateY(${y}px)`) }}
      >
        {cardContent}
      </animated.div>

      {isFullScreen && (
        <animated.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          style={{ opacity: popupSpring.opacity }}
          onClick={() => setIsFullScreen(false)}
        >
          <animated.div
            className="relative w-full h-full"
            style={{ 
              background: gradientValue,
              transform: popupSpring.scale.to(s => `scale(${s})`),
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex items-center justify-between p-8">
              <button
                onClick={handlePrevGradient}
                className="p-3 bg-white/90 rounded-full shadow-lg hover:scale-105 transition-transform"
                disabled={!gradientsList.length}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextGradient}
                className="p-3 bg-white/90 rounded-full shadow-lg hover:scale-105 transition-transform"
                disabled={!gradientsList.length}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <animated.div 
              className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl max-w-2xl mx-auto"
              style={{ 
                opacity: contentSpring.opacity,
                transform: contentSpring.y.to(y => `translateY(${y}px)`),
              }}
            >
              {cardContent}
            </animated.div>
          </animated.div>
        </animated.div>
      )}
    </>
  )
}

export default GradientCard