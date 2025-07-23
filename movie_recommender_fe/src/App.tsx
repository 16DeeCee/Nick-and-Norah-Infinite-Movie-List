import { lazy, Suspense } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<Suspense fallback={<>...</>}> <HomePage /> </Suspense>} />
          <Route path='/movie/:movieId' element={<Suspense fallback={<>...</>}> <MoviePage /> </Suspense>} />
          <Route path='/search' element={<Suspense fallback={<>...</>}> <SearchPage /> </Suspense>} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
