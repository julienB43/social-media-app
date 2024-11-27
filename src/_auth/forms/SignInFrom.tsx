import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useToast } from "../../hooks/use-toast"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { SignInValidation } from "../../lib/validation"
import Loader from "../../components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useSignInAccount } from "../../lib/react-query/queryAndMutation"
import { useUserContext } from "../../context/AuthContext"

function SignInForm() {

  const { toast } = useToast()
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  const handleSignIn = async (user: z.infer<typeof SignInValidation>) => {

    const session = await signInAccount(user)

    if (!session) {
      return toast({ title: "Login failed. Please try again." })
    }

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {
      form.reset();

      navigate('/')
    } else {
      return toast({ title: "Login failed. Please try again." })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regulare mt-2">
          Welcome back, please enter your account details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isUserLoading || isPending ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Login"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account ?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignInForm