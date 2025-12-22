import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostListPage from './pages/PostListPage'
import PostDetailPage from './pages/PostDetailPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


