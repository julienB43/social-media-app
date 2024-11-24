import { Routes, Route } from 'react-router-dom'

import './globals.css'
import { Home } from './_root/pages'
import SignUpForm from './_auth/forms/SignUpForm'
import SignInFrom from './_auth/forms/SignInFrom'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
                <Route path='/sign-in' element={<SignInFrom />} />
                <Route path='/sign-up' element={<SignUpForm />} />
            </Route>

            {/* private routes */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>

        <Toaster />
    </main>
  )
}

export default App