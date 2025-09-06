import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { fetchUserPosts } from "../store/postSlice"
import type { UserType } from "../type/User"

type Props = { user: UserType; onClose: () => void }

export default function UserModal({ user, onClose }: Props) {
  const { posts, loading } = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserPosts(user.id))
  }, [dispatch, user.id])

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="absolute left-1/2 top-1/2 w-[min(960px,92vw)] max-h-[80vh]
                   -translate-x-1/2 -translate-y-1/2 overflow-hidden
                   bg-white rounded-xl border border-gray-200 shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-800">{user.name}</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center border border-gray-300 rounded-full hover:bg-red-500 hover:text-white text-gray-600 cursor-pointer"
            aria-label="Kapat"
          >
            ×
          </button>
        </div>

        <div className="flex">
          <div className="w-1/3 min-w-[220px] p-4 bg-gray-50 border-r border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Bilgiler</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <div className="text-gray-500">Email</div>
                <div>{user.email}</div>
              </div>
              <div>
                <div className="text-gray-500">Telefon</div>
                <div>{user.phone}</div>
              </div>
              <div>
                <div className="text-gray-500">Website</div>
                <div className="truncate">{user.website}</div>
              </div>
              <div>
                <div className="text-gray-500">Şirket</div>
                <div>{user.company?.name}</div>
              </div>
              <div>
                <div className="text-gray-500">Adres</div>
                <div className="truncate">
                  {user.address?.street}, {user.address?.city}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 max-h-[80vh] overflow-y-auto pb-20">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Postlar <span className="text-gray-500">({posts.length})</span>
            </h3>

            {loading ? (
              <div className="py-8 text-center text-gray-500">Yükleniyor…</div>
            ) : posts.length === 0 ? (
              <div className="py-8 text-center text-gray-500">Post yok</div>
            ) : (
              <ul className="space-y-3">
                {posts.map((post) => (
                  <li key={post.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                    <h4 className="font-medium text-sm text-gray-800 mb-1">{post.title}</h4>
                    <p className="text-sm text-gray-600">{post.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
