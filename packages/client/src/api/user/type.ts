export type Register = Record<'name' | 'mobile' | 'password', string>

export type Login = Omit<Register, 'name'>
