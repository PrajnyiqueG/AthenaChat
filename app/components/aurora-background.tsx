"use client"

import { useEffect, useRef } from "react"

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let frame = 0
    let animationFrameId: number

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#E5DED6") // Marble accent
    gradient.addColorStop(0.5, "#FAF8F4") // Marble white
    gradient.addColorStop(1, "#EDE8E1") // Light marble beige

    const draw = () => {
      frame++
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create subtle marble-like patterns
      for (let i = 0; i < 3; i++) {
        const x = Math.sin(frame * 0.02 + i * 2) * canvas.width * 0.3 + canvas.width * 0.5
        const y = Math.cos(frame * 0.015 + i * 2) * canvas.height * 0.3 + canvas.height * 0.5
        const radius = Math.sin(frame * 0.01 + i) * 50 + 100

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + Math.sin(frame * 0.01 + i) * 0.02})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-50 pointer-events-none"
      style={{ mixBlendMode: "soft-light" }}
    />
  )
}

