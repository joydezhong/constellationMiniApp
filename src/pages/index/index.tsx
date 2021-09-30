import { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtDivider } from 'taro-ui'
import './index.scss'

const data = [
  {
    id: 1,
    title: '这是一段标题',
    text: '这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。',
    display: false,
  },
  {
    id: 2,
    title: '这是二段标题',
    text: '这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。',
    display: false,
  },
  {
    id: 3,
    title: '这是三段标题',
    text: '这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。',
    display: false,
  }
]

const Index = () => {
  const [source, setSource] = useState(data)

  const handleExpand = (id) => {
    const _data = [...source]
    setSource(() => _data.map(item => {
      if(item.id === id) {
        return {
          ...item,
          display: true,
        }
      }
      return item
    }))

  }

  const handleControl = () => {
    setSource(() => source.map(item => ({ ...item, display: false })))
  }

  return (
    <View className='index' style={{color: '000'}}>
      <AtButton type='primary' size='normal' onClick={() => Taro.navigateTo({ url: '/pages/next/index' })}>跳转</AtButton>
      <AtButton type='primary' size='normal' onClick={handleControl}>按钮文案</AtButton>
      {
        source.map(item => (<View>
          <View className='at-article__h3'>{item.title}</View>
            <View className='at-article__p'>
              <View className={item.display ? 'textBoxShow' : 'textBoxHide'}>
                <Text>{item.text}</Text>
                <View onClick={() => handleExpand(item.id)} className={item.display ? "moreBoxHide" : "moreBoxShow"}>
                  <View className="description">
                    <Text>查看更多说明</Text>
                    <View className='at-icon at-icon-chevron-down'></View>
                  </View>
                </View>
              </View>
            </View>
          <AtDivider content='分割线' />
        </View>))
      }
    </View>
  )
}

export default Index
