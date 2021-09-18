import { rootRouter, RouterKeys } from '@/app.config'
import { switchTab, reLaunch, redirectTo, navigateTo, navigateBack } from '@tarojs/taro'
import qs from 'qs'

interface RouteOptions {
  params?: any,
}

type MergeOptions<T> = RouteOptions & T

function mergeParams(options: MergeOptions<navigateTo.Option>) {
  const originUrlParams = options.url.split('?')[1]
  const splitParams = originUrlParams ? qs.parse(originUrlParams) : {}
  if (options.params) {
    options.url = `${options.url}?${qs.stringify(Object.assign(splitParams, options.params))}`
  }
  return options
}

function getRouterOption(key: RouterKeys, params?: any) {
  const options = {
    url: `/${rootRouter[key]}`,
    params
  }
  return mergeParams(options)
}

const Router = {
  switchTab(urlKey: RouterKeys, params?: any) {
    return switchTab(getRouterOption(urlKey, params))
  },

  reLaunch(urlKey: RouterKeys, params?: any) {
    return reLaunch(getRouterOption(urlKey, params))
  },

  redirectTo(urlKey: RouterKeys, params?: any) {
    return redirectTo(getRouterOption(urlKey, params))
  },

  navigateTo(urlKey: RouterKeys, params?: any) {
    return navigateTo(getRouterOption(urlKey, params))
  },

  navigateBack(Options: MergeOptions<navigateBack.Option>) {
    return navigateBack(Options)
  }
}

export default Router
