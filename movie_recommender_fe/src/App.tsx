import { lazy, Suspense, useRef } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import MovieSkeleton from './components/skeletons/MovieSkeleton';
import SearchSkeleton from './components/skeletons/SearchSkeleton';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

const ModSearchSkeleton = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        <SearchSkeleton />
      </div>
    </div>
    
  )
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <>
      <Header inputRef={inputRef} />
        <Routes>
          <Route path='/' element={<Suspense fallback={<>...</>}> <HomePage handleInputFocus={handleInputFocus} /> </Suspense>} />
          <Route path='/movie/:movieId' element={<Suspense fallback={<MovieSkeleton />}> <MoviePage /> </Suspense>} />
          <Route path='/search' element={<Suspense fallback={<ModSearchSkeleton />}> <SearchPage /> </Suspense>} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
