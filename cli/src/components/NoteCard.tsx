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
  onDelete: () => void
  onEdit: () => void
}

const NoteCard: FC<NoteCardProps> = ({
  title,
  content,
  noteId,
  onDelete,
  onEdit,
}) => {
  const delNote = async (id: string) => {
    await noteService.deleteNote(id)
  }
  /*   const updateNote = async (id: string) => {
    await noteService.updateNote(id, values)
  } */
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
            onDelete()
          }}
        >
          Delete
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault()
            /* updateNote(noteId) */
            onEdit()
          }}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
