import type { Login, Register } from './type'
import request from '@/utils/request'

export enum Api {
  register = '/user/register',
  login = '/user/login',
}

export const register = async (params: Register) => await request.post(Api.register, params)

export const login = async (params: Login) => await request.post(Api.login, params)
