import { api } from '@/lib/axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Globe } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';

import type { ReactNode } from 'react';
import type { TArtist, TPerson } from '@/types/movie.types';

type TDialogBoxProps = {
  crew: TPerson
  children: ReactNode
}

function ArtistDialogBox({ crew, children } : TDialogBoxProps) {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ artistInfo, setArtistInfo ] = useState<TArtist | null>(null)
  
  useEffect(() => {
    //endpoint for searching artist
    if (!crew || !isOpen) return;

    api.get(`/search/artist/${crew.id}`)
      .then(res => {
        if (res.data) setArtistInfo({...crew, ...res.data})
        console.log({...crew, ...res.data})
      })
      .catch(err => console.log(err));

  }, [crew, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='min-h-auto max-w-4xl max-h-[80vh]'>
        <div className='grid md:grid-cols-2 gap-3'>
          <div>
            <DialogHeader>
              <DialogTitle>
                  <span className='text-2xl font-semibold'>{crew.name}</span>
                  {crew.character && <p className='text-lg text-muted-foreground'>as {crew.character}</p>}
                  {artistInfo && (
                    <div className='flex flex-col space-y-2 mt-3 text-sm text-muted-foreground'>
                      <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4' />
                        <span>{artistInfo.birthdate}{artistInfo.deathday && ` — ${artistInfo.deathday}`}</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Globe className='h-4 w-4' />
                        <span>{artistInfo.place_of_birth}</span>
                      </div>
                    </div>
                  )}
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>
          </div>
          <div className='flex align-center justify-center'>
            <Avatar className='h-30 w-30'>
              <AvatarImage src={crew.profile_path || '/placeholder.svg'} alt={crew.name} />
              <AvatarFallback>{crew.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <ScrollArea className='h-[30vh] md:h-[50vh] pr-4'>
          <h4 className='font-semibold mb-3'>Biography</h4>
          {artistInfo && <p className='text-sm text-muted-foreground leading-relaxed'>{artistInfo.biography}</p>}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ArtistDialogBox;