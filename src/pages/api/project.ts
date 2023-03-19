import {validateJWT} from "@/lib/auth";
import {DB} from "@/lib/db";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME])

  await DB.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id
    }
  })

  res.json({data: { message: 'hi' }})
}
