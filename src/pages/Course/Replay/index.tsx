import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { find } from 'lodash'
import { message, Tooltip } from 'antd'
import { getReplayOfCourse } from '@/api'
import VideoReplayer from '@/components/VideoReplayer'
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './index.scss'
import Icon from '@/components/Icon'

const CourseReplay = () => {
  const { id: courseId, replayId } = useParams()
  const [replay, setReplay] = useState<any>()
  const navigate = useNavigate()

  const initData = useCallback(async () => {
    const replayList = await getReplayOfCourse(courseId!)
    const replay = find(replayList, ({ id }) => `${id}` === replayId)
    setReplay(replay)
  }, [courseId])

  useEffect(() => {
    initData()
  }, [initData])

  return (
    <div className="video-replay-modal">
      <header>
        <div className="title">{replay?.className}</div>
        <div className="actions">
          <Tooltip title="复制链接">
            <CopyToClipboard
              text={window.location.href}
              onCopy={() => {
                message.success('复制成功!')
              }}
            >
              <Icon symbol="icon-share" />
            </CopyToClipboard>
          </Tooltip>
          <Tooltip title="返回课程">
            <Icon symbol="icon-fanhui" onClick={() => navigate(`/${courseId}`)} />
          </Tooltip>
        </div>
      </header>
      <div className="video-replay-content">
        <VideoReplayer replay={replay} />
      </div>
    </div>
  )
}

export default CourseReplay
