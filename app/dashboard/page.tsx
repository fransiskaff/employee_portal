import { supabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { logout } from '../actions/auth' 

interface Announcement {
  id: number
  title: string
  content: string
  created_at: string
}

export default async function DashboardPage() {
  const supabase = await supabaseServer()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  const { data: announcements, error: dbError } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* user info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Employee Portal</h1>
            <p className="text-gray-600 mt-1">
              Selamat datang, <span className="font-semibold text-blue-600">{user.email}</span>
            </p>
          </div>

          <form action={logout}>
            <button 
              type="submit"
              className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-300"
            >
              Logout
            </button>
          </form>
        </div>

        {/* announcements */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">
          Pengumuman Terbaru
        </h2>

        <div className="grid gap-6">
          {/* error handling */}
          {dbError && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              Gagal memuat data pengumuman.
            </div>
          )}

          {announcements && announcements.length > 0 ? (
            announcements.map((item: Announcement) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
              Belum ada pengumuman saat ini.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}