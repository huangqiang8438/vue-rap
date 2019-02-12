import request from './fetch'

// 资源库列表
export const repositorList = params => {
  return request({
    url: '/admin/repository/list',
    method: 'get',
    params
  })
}

// 资源库详细信息
export const repositorGet = params => {
  return request({
    url: '/admin/repository/get',
    method: 'get',
    params
  })
}

// 资源库添加
export const repositorySave = params => {
  return request({
    url: '/admin/repository/save',
    method: 'post',
    data: params
  })
}

// 资源库添加
export const repositoryUpdate = params => {
  return request({
    url: '/admin/repository/update',
    method: 'post',
    data: params
  })
}
// 资源库添加
export const repositoryDelete = params => {
  return request({
    url: '/admin/repository/delete',
    method: 'post',
    data: params
  })
}
// 错误代码列表
export const errorCodeList = params => {
  return request({
    url: '/admin/error/list',
    method: 'get',
    params
  })
}

// 资源库错误代码添加

export const errorCodeSave = params => {
  return request({
    url: '/admin/error/save',
    method: 'post',
    data: params
  })
}

// 资源库错误代码修改
export const errorCodeUpdate = params => {
  return request({
    url: '/admin/error/update',
    method: 'post',
    data: params
  })
}

// 资源库错误代码修改
export const errorCodeDelete = params => {
  return request({
    url: '/admin/error/delete',
    method: 'post',
    data: params
  })
}

// 资源库树形分类
export const repositoryModuleTree = params => {
  return request({
    url: '/admin/module/tree',
    method: 'get',
    params
  })
}

// 资源库树形分类添加
export const repositoryModuleSave = params => {
  return request({
    url: '/admin/module/save',
    method: 'post',
    data: params
  })
}

// 资源库树形分类修改
export const repositoryModuleUpdate = params => {
  return request({
    url: '/admin/module/update',
    method: 'post',
    data: params
  })
}

// 资源库树形分类删除
export const repositoryModuleDelete = params => {
  return request({
    url: '/admin/module/delete',
    method: 'post',
    data: params
  })
}

// 模块下的api列表查询
export const apiList = params => { // moduleId
  return request({
    url: '/admin/api/list',
    method: 'get',
    params
  })
}
// 模块下的api删除
export const apiDelete = params => { // moduleId
  return request({
    url: '/admin/api/delete',
    method: 'post',
    data: params
  })
}

// 模块下的api新增
export const apiSave = params => { // moduleId
  return request({
    url: '/admin/api/save',
    method: 'post',
    data: params
  })
}

// 模块下的api更新
export const apiUpdate = params => { // moduleId
  return request({
    url: '/admin/api/update',
    method: 'post',
    data: params
  })
}

// 模块下的api更新
export const apiGet = params => { // id
  return request({
    url: '/admin/api/get',
    method: 'get',
    params
  })
}

