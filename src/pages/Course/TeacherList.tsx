import { useCallback, useEffect, useState } from 'react'
import * as api from '../../api'

import './TeacharList.scss'

export interface ITeachar {
  name: string
  avatarUrl: string
  coursesCount: number
  studentsCount: number
  info: string
}

export const recommandTeachars: ITeachar[] = [
  {
    name: '陈渝',
    avatarUrl: 'https://ssl.cdn.maodouketang.com/Fr9F1UyACJkeHBHzDG668H5sZm9B',
    coursesCount: 11,
    studentsCount: 275,
    info: '博士，清华大学计算机系副教授、中国计算机学会普适计算专委会副主任，系统软件专委委员，清华大学信息技术研究院操作系统研究中心负责人。主要科研方向：操作系统、系统安全，嵌入式系统，普适计算、高性能计算等。'
  },
  {
    name: '向勇',
    avatarUrl: 'https://ssl.cdn.maodouketang.com/Fg6ktGGhsirExxmSKDsirP3MADSc',
    coursesCount: 9,
    studentsCount: 180,
    info: '博士，清华大学计算机系副教授，自2000年开始从事操作系统课的教学工作，科研方向包括无线自组网、计算机支持的协同工作和操作系统，曾主持或参与国家自然科学基金项目《支持多信道的自组网及其与Internet 互连的研究'
  }
]

const TeacharList = ({ showAll }: { showAll: boolean }) => {
  const [allTeachars, setAllTeachars] = useState<ITeachar[]>([])

  const loadData = useCallback(async () => {
    if (showAll && allTeachars.length === 0) {
      const res = await api.getTeachars()
      const { teacherList } = res
      setAllTeachars(teacherList)
    }
  }, [showAll, allTeachars.length])

  useEffect(() => {
    loadData()
  }, [loadData])

  const data = showAll ? allTeachars : recommandTeachars

  return (
    <div className="teachar-recommand">
      {data.map((teachar) => (
        <div key={teachar.name} className="teachar-intro">
          <img src={teachar.avatarUrl} alt="avatar" className="avatar" />
          <div className="info">
            <div className="teachar-title">
              <div className="teachar-name">{teachar.name}老师</div>
              <span className="teachar-tag">
                课程<span>{teachar.coursesCount}</span>
                学生<span>{teachar.studentsCount}</span>
              </span>
            </div>
            <div className="teach-intro">{teachar.info}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default TeacharList
