import { useState } from 'react'
import { Button, Input, Form } from '@heroui/react'
import { useTranslation } from 'react-i18next'

const AuthForm: React.FC = () => {
  const [action, setAction] = useState('')

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      onReset={() => setAction('reset')}
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))

        setAction(`submit ${JSON.stringify(data)}`)
      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          {useTranslation().t('login')}
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  )
}

export default AuthForm
