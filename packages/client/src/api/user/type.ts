export type Register = Record<'name' | 'mobile' | 'password', string>

export type Login = Omit<Register, 'name'>

export type LoginResult = Record<'id' | 'createTime' | 'updateTime' | 'userName' | 'email' | 'mobile' | 'avatar', 'string'>
