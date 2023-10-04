import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FC } from 'react'

interface NoteCardProps {
  title: string
  content?: string
}

const NoteCard: FC<NoteCardProps> = ({ title, content }) => {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Delete</Button>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
