import qs from 'qs';
import { methodTypes, requestHeaders } from '@/types/request';
import { mergeConfig } from './utils';

export interface RequestFetchOptions {
  headers?: requestHeaders;
  method?: methodTypes;
  params?: any;
  data?: any;
  body?: any;
  isUpload?: boolean;
  showError?: boolean;
}

const defaultFetchOptions: RequestFetchOptions = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
  isUpload: false,
};

export const requestFetch = <T>(url: string, options: RequestFetchOptions): Promise<T> => {
  let fetchUrl = url || '';

  const fetchOptions: RequestFetchOptions = mergeConfig(defaultFetchOptions, options)
  if (!fetchUrl) {
    throw new Error('not url for fetch');
  }
  if (fetchOptions.method) {
    fetchOptions.method = fetchOptions.method.toLocaleLowerCase() as methodTypes;
  } else {
    fetchOptions.method = 'get';
  }

  // 处理get请求
  if (fetchOptions.params) {
    fetchUrl = `${fetchUrl}?${qs.stringify(fetchOptions.params)}`;
  }

  /**
   * 处理post请求
   */
  if (fetchOptions.data) {
    fetchOptions.body = fetchOptions.isUpload ? fetchOptions.data : JSON.stringify(fetchOptions.data)
  }

  return new Promise((resolve, reject) => {
    fetch(fetchUrl, fetchOptions as any).then((responseStream) => {
      /**
       * 非200状态的http请求将会抛出警告
       */
      if (responseStream.status === 200) {
        responseStream.json().then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
      } else if (responseStream.status === 500) {
        responseStream.json().then((err) => reject(err))
      } else {
        reject(new Error(`error status is ${responseStream.status}`))
      }
    })
  })
};
