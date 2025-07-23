import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';

function Header() {
  const [ searchInput, setSearchInput ] = useState<string>('')
  const navigate = useNavigate()

  function handleSearchEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && searchInput.trim().length > 3) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
      setSearchInput('')
    }
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value)
    console.log(searchInput)
  }

  return (
    <>
      <header className='border-b'>
        <div className='container px-4 py-4 mx-auto'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-1'>
              <h1 className='text-2xl font-bold'>NaN's Infinite Movie List</h1>
                <Link to='/' className={buttonVariants({variant: 'ghost'})}>Home</Link>
            </div>
            <div className='relative'>
              <Search className='
                absolute left-3 top-1/2 transform -translate-y-1/2 
                text-muted-foreground h-4 w-4' 
              />
              <Input 
                placeholder='Search a movie' className='pl-10 w-full' 
                value={searchInput}
                onChange={e => handleInput(e)}
                onKeyDown={e => handleSearchEnter(e)} 
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;