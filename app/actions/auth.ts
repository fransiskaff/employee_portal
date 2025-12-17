'use server'

import { supabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await supabaseServer()

  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  redirect('/dashboard')
}

export async function register(formData: FormData) {
  const supabase = await supabaseServer()

  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  redirect('/login')
}

export async function logout() {
  const supabase = await supabaseServer()

  await supabase.auth.signOut()

  redirect('/login')
}
