import TaskCard from '@/components/TaskCard'
import { getUserFromCookie } from '@/lib/auth'
import { DB } from '@/lib/db'
import { cookies } from 'next/headers'

const getData = async (id) => {
  const user = await getUserFromCookie(cookies())

  const project = await DB.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  })

  return project
}

export default async function Project({ params }) {
  const project = await getData(params.id)

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      {/* @ts-expect-error Async Server Component */}
      <TaskCard tasks={project?.tasks} title={project?.name} />
    </div>
  )
}
