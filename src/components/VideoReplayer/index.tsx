import { useState, useEffect, useCallback, useRef } from 'react'
import dayjs from 'dayjs'
import { map, isEmpty } from 'lodash'
import { Empty, Spin } from 'antd'
// import videojs from 'video.js'
import { getReplayerChatHistory } from '@/api'

// import 'video.js/dist/video-js.min.css'
import './index.scss'

window.HELP_IMPROVE_VIDEOJS = false
interface IReplay {
  id: string
  title: string
  roomId: string
  choseUrl: string
  startTime: string
  endTime: string
}
interface IProps {
  replay?: IReplay
  chat?: { totalNum: number; roomActionList: any[] }
}

const PlayBackRages = [0.7, 1.0, 1.5, 2.0]
const chatHistoryMap: Record<string, any> = {}

const VideoReplayerModal = (props: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)
  const [chatLoading, setChatLoading] = useState(false)

  const getChatHistory = useCallback(async () => {
    if (props.replay && !chatHistoryMap[props.replay.id]) {
      setChatLoading(true)
      const { id, roomId, startTime, endTime } = props.replay
      const res = await getReplayerChatHistory({ roomId, startTime, endTime })
      chatHistoryMap[id] = res
      setChatLoading(false)
    }
  }, [props.replay?.id])

  useEffect(() => {
    getChatHistory()
  }, [getChatHistory])

  const initializeVideo = useCallback(() => {
    if (!props.replay?.choseUrl) return
    if (playerRef.current) {
      playerRef.current.src(props.replay?.choseUrl)
      playerRef.current.playbackRates(PlayBackRages)
    } else {
      if (videoRef.current) {
        const options = {
          playbackRates: PlayBackRages
        }
        const player = (window as any).videojs(videoRef.current, options, function ready() {})
        playerRef.current = player
      }
    }
  }, [props.replay?.choseUrl, videoRef.current])

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

  const setVideoCurrentTime = (time: string) => {
    if (props.replay?.startTime && playerRef.current) {
      const currentTime = dayjs(time).diff(dayjs(props.replay?.startTime), 'second')
      playerRef.current.currentTime(currentTime)
    }
  }

  const chat = chatHistoryMap[props.replay?.id || '']

  return (
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
            <source src={props.replay?.choseUrl} type="video/mp4" />
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
          <h3>聊天记录 </h3>
          {chat?.totalNum && (
            <span className="chat-total">
              共<span>{chat?.totalNum}</span>条
            </span>
          )}
        </header>
        <main className={`${chatLoading ? 'chat-loading' : ''}`}>
          {chatLoading ? (
            <Spin spinning={chatLoading} />
          ) : isEmpty(chat?.roomActionList) ? (
            <Empty description="暂无数据" />
          ) : (
            map(chat?.roomActionList, (item) => (
              <div key={item.id} className="chat-item">
                <span className="chator">
                  {item.userName}
                  <span className="chat-time">{dayjs(item.actionTime).format('HH:mm:ss')}</span>
                </span>
                <pre onClick={() => setVideoCurrentTime(item.actionTime)}>
                  {item.description.replace('TEXT:', '')}
                </pre>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  )
}

export default VideoReplayerModal
