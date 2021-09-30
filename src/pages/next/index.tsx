import Taro from '@tarojs/taro'
import { View, Image, Canvas } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import './index.scss'
import { useState, useRef } from 'react'

import next from '../../asserts/next.png'
import img1 from '../../asserts/1.png'
import img2 from '../../asserts/2.png'
import img3 from '../../asserts/3.png'
import img4 from '../../asserts/4.png'
import img5 from '../../asserts/5.png'
import img6 from '../../asserts/6.png'
import img7 from '../../asserts/7.png'

const Next = () => {

  const exportImg = useRef()

  const onChange = (e) => {
    console.log(e)
  }

  return (
    <View style={{color: '000'}}>

      <View className='container'>
        <View className="prev">
          <Image src={next} className="prevImg" />
        </View>
        <View className="main">
          <View id="content">
            <Canvas id='canvas'></Canvas>
          </View>
        </View>
        <View className="next">
          <Image src={next} className="nextImg" />
        </View>
      </View>

      <View className="exportImg">
        <Image ref={exportImg} src="" />
      </View>

      <View className="uploadView">
        <AtImagePicker
          files={[]}
          onChange={onChange}
        />
      </View>

      <View className="maskContainer">
        <Image src='' id='img' />
        <Image className='hide' id='hat1' src={img1} />
        <Image className='hide' id='hat2' src={img2} />
        <Image className='hide' id='hat3' src={img3} />
        <Image className='hide' id='hat4' src={img4} />
        <Image className='hide' id='hat5' src={img5} />
        <Image className='hide' id='hat6' src={img6} />
        <Image className='hide' id='hat7' src={img7} />
      </View>

    </View>
  )
}

export default Next
