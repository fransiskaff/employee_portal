import Link from 'next/link'
import { login } from '../actions/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <form
        action={login}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold text-center">
          Login
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
          Masuk
        </button>

        <p className="text-center text-sm text-gray-600">
          Belum memiliki akun?{' '}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Silakan register terlebih dahulu
          </Link>
        </p>
      </form>
    </div>
  )
}
