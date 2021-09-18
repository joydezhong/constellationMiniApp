import Manifest from '@/constants/manifest'
// @todo 实现toast组件在组件库
// import { Toast } from 'god-taro-library';
import { requestFetch, RequestFetchOptions } from './requestFetch'
import { RequestFactoryModel, IRequestSuccess, requestHeaders } from '@/types/request'
import { GlobalConfig } from '../../constants/global'
import { mergeConfig } from './utils'
import { getAsyncStorage } from '@/utils/storage'
import { SHOP_AND_SITE, TOKEN } from '@/constants'
import Store from '../../store'
import Router from '../router'

/**
 * 使用dotenv动态引入
 * extra可在dev和prod都生效
 * 如需修改 可查看文件目录下的.projectEnv文件夹
 */
const requestBaseUrl = Manifest.BACK_GATEWAY || 'http://10.0.0.17:8100';
const defaultHeaders: requestHeaders = {
  'Content-Type': 'application/json',
  source: 2,
  environment: 4,
  site: GlobalConfig.global.siteInfo.id,
};

/**
 * 创建一个请求实例
 */
class RequestFactory implements RequestFactoryModel {
  static async request<T>(
    url: string,
    paramsConfig: RequestFetchOptions,
  ): Promise<IRequestSuccess<T>> {
    const headers = { ...defaultHeaders };

    const Token = await getAsyncStorage(TOKEN);
    if (Token) {
      headers.token = Token;
    }
    const shopId = Store.userStore.shopAndSite?.shopId
    if (shopId) {
      headers.shopId = shopId
    }
    const config: RequestFetchOptions = paramsConfig;

    config.headers = config.headers ? mergeConfig(headers, config.headers) : headers;
    /**
     * @todo 此处可添加中间件
     */
    return new Promise((resolve, reject) => {
      requestFetch<IRequestSuccess<T>>(requestBaseUrl + url, config)
        .then((res: IRequestSuccess<T>) => {
          // 未登录
          if (res.code === 1101) {
            // console.log(url, res);
            Store.userStore.removeUserInfo();
            Router.redirectTo({
              url: 'pages/login/index'
            })
            reject(res);
            return;
          }
          // 错误提示，忽略掉 post 请求，因为很多页面都处理了
          if (
            (config.method as unknown) !== 'POST'
            && res.code !== 1000
            && res.message
          ) {
            if (config.showError !== false) {
              // Toast.show(res.message);
              console.error(url, config, res);
            }
          }
          resolve(res);
        })
        .catch((err) => {
          if (config.showError !== false) {
            // Toast.show(err.code);
          }
          console.error(url, config, err);
          reject(err);
        });
    });
  }
}

const { request } = RequestFactory;

export default request;
