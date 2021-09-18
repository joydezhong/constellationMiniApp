import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

const Index = () => {
  const [toggle, setToggle] = useState(false)

  const handleExpand = () => {
    setToggle(!toggle)
  }

  return (
    <View className='index' style={{color: '000'}}>
      <AtButton type='primary' size='normal'>按钮文案</AtButton>
      <View className='at-article__h2'>这是二级标题</View>
      <View className='at-article__h3'>这是三级标题</View>
      <View className='at-article__p'>
        <View className={toggle ? 'textBoxShow' : 'textBoxHide'}>
          <Text>
            这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。
            这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。
            这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。
          </Text>
          <View onClick={handleExpand} className={toggle ? "moreBoxHide" : "moreBoxShow"}>
            <View className="description">
              <Text>查看更多说明</Text>
              <View className='at-icon at-icon-chevron-down'></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
