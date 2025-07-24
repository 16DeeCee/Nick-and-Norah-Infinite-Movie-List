import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Globe } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type { TArtist, TPerson } from '@/types/movie.types';
import { AvatarFallback } from '@radix-ui/react-avatar';

type TDialogBoxProps = {
  crew: TPerson
  children: ReactNode
}

function ArtistDialogBox({crew, children} : TDialogBoxProps) {
  const [ artistInfo, setArtistInfo ] = useState<TArtist | null>(null)
  
  useEffect(() => {
    //endpoint for searching artist
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='max-w-4xl max-h-[90vh]'>
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='md:col-span-2'>
            <DialogHeader>
              <DialogTitle>
                <div>
                  <h3 className='text-2xl font-semibold'>{crew.name}</h3>
                  {crew.character && <p className='text-lg text-muted-foreground'>as {crew.character}</p>}
                  {artistInfo && (
                    <div className='flex flex-col space-y-2 mt-3 text-sm text-muted-foreground'>
                      <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4' />
                        <span>{artistInfo.birthdate}{artistInfo.deathday && ` - ${artistInfo.deathday}`}</span>
                      </div>
                      <div>
                        <Globe className='h-4 w-4' />
                        <span>{artistInfo.place_of_birth}</span>
                      </div>
                    </div>
                  )}
                </div>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className='mt-6 max-h-96'>
              <div className='pr-4'>
                <h4 className='font-semibold mb-3'>Biography</h4>
                <p className='text-sm text-muted-foreground leading-relaxed'>{artistInfo?.biography}</p>
              </div>
            </ScrollArea>
          </div>
          <div className='flex justify-center md:justify-end'>
            <Avatar>
              <AvatarImage src={crew.profile_path || '/placeholder.svg'} alt={crew.name} />
              <AvatarFallback>{crew.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ArtistDialogBox