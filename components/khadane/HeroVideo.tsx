'use client'

import { useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'

interface HeroVideoProps {
  src: string
  poster?: string
  objectPosition?: string
}

export default function HeroVideo({
  src,
  poster,
  objectPosition = '50% 50%',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  const playVideo = async () => {
    const video = videoRef.current
    if (!video) return false

    try {
      await video.play()
      return true
    } catch {
      setPlaying(false)
      return false
    }
  }

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      await playVideo()
      return
    }

    video.pause()
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setMuted(video.muted)
  }

  const restart = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    if (video.paused) {
      void playVideo()
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="pointer-events-auto absolute left-6 bottom-6 z-50 flex items-center gap-2 rounded-full border border-warm-white/20 bg-obsidian/45 p-2 backdrop-blur-md lg:left-8 lg:bottom-8">
        <button
          type="button"
          aria-label={playing ? 'Pause background video' : 'Play background video'}
          title={playing ? 'Pause background video' : 'Play background video'}
          onClick={togglePlayback}
          className="grid h-10 w-10 place-items-center rounded-full text-warm-white transition-colors duration-300 hover:bg-warm-white hover:text-obsidian"
        >
          {playing ? <Pause size={18} strokeWidth={1.6} /> : <Play size={18} strokeWidth={1.6} />}
        </button>
        <button
          type="button"
          aria-label={muted ? 'Unmute background video' : 'Mute background video'}
          title={muted ? 'Unmute background video' : 'Mute background video'}
          onClick={toggleMute}
          className="grid h-10 w-10 place-items-center rounded-full text-warm-white transition-colors duration-300 hover:bg-warm-white hover:text-obsidian"
        >
          {muted ? <VolumeX size={18} strokeWidth={1.6} /> : <Volume2 size={18} strokeWidth={1.6} />}
        </button>
        <button
          type="button"
          aria-label="Restart background video"
          title="Restart background video"
          onClick={restart}
          className="grid h-10 w-10 place-items-center rounded-full text-warm-white transition-colors duration-300 hover:bg-warm-white hover:text-obsidian"
        >
          <RotateCcw size={17} strokeWidth={1.6} />
        </button>
      </div>
    </>
  )
}
