import { comparePasswords, createJWT } from '@/lib/auth'
import { DB } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const user = await DB.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      res.status(401)
      res.json({ error: 'Invalid login' })
      return
    }

    const isUser = await comparePasswords(req.body.password, user.password)

    if (isUser) {
      const jwt = await createJWT(user)
      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        }),
      )

      res.status(201)
      res.json({})
    } else {
      res.status(401)
      res.json({ error: 'Invalid login' })
      return
    }
  } else {
    res.status(401)
    res.json({})
  }
}
