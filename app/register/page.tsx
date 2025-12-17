import Link from 'next/link'
import { register } from '../actions/auth'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <form
        action={register}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold text-center">
          Registrasi Akun
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded border px-3 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded border px-3 py-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Daftar
        </button>

        <p className="text-center text-sm text-gray-600">
          Sudah memiliki akun?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Silakan login menggunakan akun Anda
          </Link>
        </p>
      </form>
    </div>
  )
}
