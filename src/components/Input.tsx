import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={clsx(
        'border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full',
        className,
      )}
      {...props}
    />
  )
}

export default Input
