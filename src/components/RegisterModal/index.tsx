import { useState } from 'react'
import { Modal, Form, Input, Button, Radio, Select } from 'antd'
import { USER_INFO_STORAGE_KEY } from '../../constants'
import { registerCourse } from '../../api'
import { useAppState } from '../../hooks'
import { IMyRegister } from '../../types'

interface IProps {
  courseInfo: any
  applyStudents?: any[]
  defaultVisible?: boolean
  onRegisterCourse?: (newCourse: IMyRegister) => void
}

interface IFromProps {
  status: string | number
  name: string
  gender: string
  age: string
  tag: string
}
const grade = [
  '大一',
  '大二',
  '大三',
  '大四',
  '硕士研究生',
  '博士研究生',
  '大学老师',
  '公司技术工程师',
  '其他'
]

const tags = [
  {
    value: '未订阅通知',
    label: '不订阅通知'
  },
  {
    value: '已订阅短信通知',
    label: '订阅短信通知'
  },
  {
    value: '已订阅电话通知',
    label: '订阅电话通知'
  },
  {
    value: '已订阅全部通知',
    label: '订阅全部通知'
  }
]

const RegisterForm = (props: {
  courseInfo: any
  onSubmit: (values: IMyRegister) => void | Promise<boolean>
}) => {
  const [form] = Form.useForm<IFromProps>()

  const onFinish = async (values: IFromProps) => {
    let data: any = { ...values }

    if (data.status == 2 && !data.name.endsWith('老师')) {
      data.name = data.name + '老师'
    }
    data.status = data.status || 1
    data.phone = localStorage.getItem(USER_INFO_STORAGE_KEY)
    data.clientId = props.courseInfo.clientId
    data.courseId = props.courseInfo.courseId
    data.uniCourseId = props.courseInfo.id
    data.verify = '1'
    data.classId = 1

    const newCourse = await registerCourse(data)
    props.onSubmit(newCourse)
  }

  return (
    <Form
      form={form}
      className="normal-form"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ gender: '男', tag: tags[1].value }}
    >
      <h3>报名</h3>
      <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item label="性别" name="gender">
        <Radio.Group>
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="年级" name="age">
        <Select>
          {grade.map((v) => (
            <Select.Option key={v} value={v}>
              {v}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="备注" name="tag">
        <Select>
          {tags.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          确认
        </Button>
      </Form.Item>
    </Form>
  )
}

const RegisterModal = (props: IProps) => {
  const [visible, setVisible] = useState(props.defaultVisible)
  const {
    state: { myRegisters },
    dispatch
  } = useAppState()

  const handleSubmit = (newCourse: IMyRegister) => {
    dispatch({
      type: 'UPDATE_MY_COURSES',
      payload: (myRegisters || []).concat(newCourse)
    })
    props.onRegisterCourse?.(newCourse)
    setVisible(false)
  }
  return (
    <>
      <button className="btn" onClick={() => setVisible(true)}>
        立即报名
      </button>
      <Modal
        width={350}
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        maskClosable={false}
      >
        <RegisterForm onSubmit={handleSubmit} courseInfo={props.courseInfo} />
      </Modal>
    </>
  )
}

export default RegisterModal
