import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { jwtVerify, SignJWT } from 'jose'
import { DB } from './db'

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

export const comparePasswords = (
  plaintextPassword: string,
  hashedPassword: string,
) => bcrypt.compare(plaintextPassword, hashedPassword)

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 * 7

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  )

  return payload.payload as Pick<User, 'id' | 'email'>
}

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME)
  const { id } = await validateJWT(jwt.value)

  return await DB.user.findUnique({
    where: {
      id: id,
    },
  })
}
