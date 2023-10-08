import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/auth.context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import * as z from 'zod'
import authService from '../services/auth.service'

const formSchema = z.object({
  email: z.string().email({
    message: 'Must be a valid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})

export function Login() {
  const { storeToken, authenticateUser } = useContext(AuthContext)
  const navigate: NavigateFunction = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    authService
      .login(values.email, values.password)
      .then((response) => {
        // Save the token in the localStorage.
        storeToken(JSON.stringify(response.data.authToken))

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser()
        navigate('/notes')
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='absolute left-1/2 top-1/2 w-4/5 max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-black p-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' type='password' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
