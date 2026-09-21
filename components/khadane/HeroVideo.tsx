'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

interface HeroVideoProps {
  /** MP4 source. A sibling .webm with the same basename is offered first. */
  src: string
  poster?: string
  objectPosition?: string
}

type NetworkInformationLike = {
  saveData?: boolean
  effectiveType?: string
}

// The video is decoration over a poster that is already the LCP image. It is
// only mounted after hydration, and only when the visitor has not asked for
// reduced motion or reduced data, so the page never pays for it up front.
function videoAllowed(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const nav = navigator as Navigator & { connection?: NetworkInformationLike }
  const conn = nav.connection
  if (conn?.saveData) return false
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return false
  return true
}

export default function HeroVideo({
  src,
  poster,
  objectPosition = '50% 50%',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hasAudio, setHasAudio] = useState(false)

  useEffect(() => {
    setEnabled(videoAllowed())
  }, [])

  // Safari ignores the autoPlay attribute under Low Power Mode but still
  // honours an explicit muted play() call.
  useEffect(() => {
    if (!enabled) return
    const video = videoRef.current
    if (video?.paused) video.play().catch(() => {})
  }, [enabled])

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
    if (video) setMuted(video.muted)
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
          mediaWithAudio.webkitAudioDecodedByteCount,
      ),
    )
  }

  if (!enabled) return null

  const webm = src.replace(/\.mp4$/, '.webm')

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
        preload="metadata"
        poster={poster}
        aria-hidden="true"
        onLoadedMetadata={syncMediaState}
        onCanPlay={syncMediaState}
        onVolumeChange={syncMutedState}
      >
        {webm !== src && <source src={webm} type="video/webm" />}
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
            {muted ? <Volume2 size={18} strokeWidth={1.6} /> : <VolumeX size={18} strokeWidth={1.6} />}
          </button>
        </div>
      )}
    </>
  )
}
