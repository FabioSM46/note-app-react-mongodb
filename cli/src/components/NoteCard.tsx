import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import noteService from '@/services/note.service'
import { FC } from 'react'

interface NoteCardProps {
  title: string
  content?: string
  noteId: string
  onClick: () => void
}

const NoteCard: FC<NoteCardProps> = ({ title, content, noteId, onClick }) => {
  const delNote = async (id: string) => {
    await noteService.deleteNote(id)
    console.log('Note deleted')
  }
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          variant='outline'
          onClick={(e) => {
            e.preventDefault()
            delNote(noteId)
            onClick()
          }}
        >
          Delete
        </Button>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
