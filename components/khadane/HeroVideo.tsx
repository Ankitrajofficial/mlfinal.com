'use client'

import { useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

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
  const [muted, setMuted] = useState(true)
  const [hasAudio, setHasAudio] = useState(true)

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    video.defaultMuted = nextMuted
    setMuted(nextMuted)
  }

  const syncMutedState = () => {
    const video = videoRef.current
    if (!video) return

    setMuted(video.muted)
  }

  const syncMediaState = () => {
    const video = videoRef.current
    if (!video) return

    const mediaWithAudio = video as HTMLVideoElement & {
      webkitAudioDecodedByteCount?: number
      mozHasAudio?: boolean
      audioTracks?: { length: number }
    }

    setMuted(video.muted)
    setHasAudio(
      Boolean(
        mediaWithAudio.audioTracks?.length ||
          mediaWithAudio.mozHasAudio ||
          mediaWithAudio.webkitAudioDecodedByteCount
      )
    )
  }

  return (
    <>
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-hidden="true"
        onLoadedMetadata={syncMediaState}
        onCanPlay={syncMediaState}
        onVolumeChange={syncMutedState}
      >
        <source src={src} type="video/mp4" />
      </video>

      {hasAudio && (
      <div className="pointer-events-auto absolute left-6 bottom-6 z-50 rounded-full border border-warm-white/20 bg-obsidian/45 p-2 backdrop-blur-md lg:left-8 lg:bottom-8">
        <button
          type="button"
          aria-label={muted ? 'Unmute background video' : 'Mute background video'}
          title={muted ? 'Unmute background video' : 'Mute background video'}
          aria-pressed={!muted}
          onClick={toggleMute}
          className="grid h-10 w-10 place-items-center rounded-full text-warm-white transition-colors duration-300 hover:bg-warm-white hover:text-obsidian"
        >
          {muted ? <VolumeX size={18} strokeWidth={1.6} /> : <Volume2 size={18} strokeWidth={1.6} />}
        </button>
      </div>
      )}
    </>
  )
}
