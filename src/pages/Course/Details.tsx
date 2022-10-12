import React from 'react'
import Tabs from '../../components/Tabs'

import './Details.scss'

const CourseDetail = () => {
  const tabs = [
    {
      key: 'intro',
      title: '课程介绍',
      content: '课程介绍-content'
    },
    {
      key: 'student',
      title: '报名成员',
      content: '报名成员-content'
    },
    {
      key: 'replay',
      title: '课程回放',
      content: '课程回放-content'
    }
  ]
  return (
    <div className="course-detail-wrapper">
      <section className="main-content">
        <img
          src="https://ssl.cdn.maodouketang.com/FnM7WlxJBzRvwot2Uti0D-WS-4Kd"
          alt="alt"
          className="course-cover"
        />

        <div className="course-main-info">
          <div className="course-title">Rust 编程零基础班</div>

          <div className="course-info-item">任课教师: 陈渝老师</div>
          <div className="course-info-item">学生人数: 111人</div>

          <div className="course-actions">
            <div className="course-price">¥ 10</div>
            <button className="btn"> 登录</button>
          </div>
        </div>
        <div className="share-area">
          <div className="share-box">
            <img src="/share.png" alt="share" />
            <span>分享二维码,</span>
            <span>邀请好友报名</span>
          </div>
          <div className="share-box">
            <img src="/minipro.jpeg" alt="mini" />
          </div>
        </div>
      </section>

      <section className="course-intro">
        <Tabs items={tabs} />
      </section>
    </div>
  )
}

export default CourseDetail
