import { useEffect, useCallback, useRef } from 'react'
import { Modal } from 'antd'
import videojs, { VideoJsPlayer } from 'video.js'

import 'video.js/dist/video-js.min.css'
import './index.scss'

interface IProps {
  url?: string
  onClose?: () => void
}

const VideoReplayerModal = (props: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)

  const initializeVideo = useCallback(() => {
    if (!props.url) return
    if (playerRef.current) {
      playerRef.current.src(props.url)
    } else {
      if (videoRef.current) {
        const options = {
          playbackRates: [0.7, 1.0, 1.5, 2.0]
        }
        const player = videojs(videoRef.current, options, function ready() {
        })
        playerRef.current = player
      }
    }
  }, [props.url, videoRef.current])

  useEffect(() => {
    initializeVideo()
  }, [initializeVideo])

  const dispose = useCallback(() => {
    const player = playerRef.current
    if (player) {
      // player.dispose()
      player.reset()
      // playerRef.current = null
      // if (videoRef.current) {
      //   videoRef.current.id = 'replay-video'
      // }
    }
  }, [playerRef.current])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      dispose()
    }
  }, [playerRef])

  return (
    <Modal
      title="视频回放"
      className="video-replay-modal"
      open={!!props.url}
      footer={null}
      onCancel={() => {
        dispose()
        props.onClose?.()
      }}
    >
      <div className="video-replay-wrap">
        <div className="replay-box">
          <div data-vjs-player style={{ width: '100%', height: '100%' }}>
            <video
              controls
              ref={videoRef}
              id="replay-video"
              className="video-js vjs-big-play-centered"
              preload="auto"
              // poster="MY_VIDEO_POSTER.jpg"
            >
              <source src={props.url} type="video/mp4" />
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser
                that
                <a href="https://videojs.com/html5-video-support/" target="_blank">
                  supports HTML5 video
                </a>
              </p>
            </video>
          </div>
        </div>
        <div className="replay-chat-history">
          <header>
            <h3>聊天记录</h3>
          </header>
          <main>content</main>
        </div>
      </div>
    </Modal>
  )
}

export default VideoReplayerModal
