import NoteCard from '@/components/NoteCard'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AuthContext } from '@/context/auth.context'
import { Note } from '@/lib/interfaces'
import noteService from '@/services/note.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusSquare } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long.',
    })
    .max(20, {
      message: 'Title must not be longer than 20 characters.',
    }),
  content: z
    .string()
    .max(300, { message: 'Note must not be longer than 300 characters.' })
    .optional(),
  author: z.string().optional(),
})

export const Notes = () => {
  const { user } = useContext(AuthContext)
  const [notes, setNotes] = useState<Note[]>([])
  const [buttonClicked, setButtonClicked] = useState(false)
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const refreshOnButtonClick = () => {
    setButtonClicked(!buttonClicked)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isEditing) {
      try {
        await noteService.createNote(
          values.title,
          values.content,
          (values.author = user?._id),
        )
        form.reset()
        refreshOnButtonClick()
        setOpen(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await noteService.updateNote(
          editingNoteId,
          values.title,
          values.content || '',
        )
        refreshOnButtonClick()
        setOpen(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (isEditing) {
      form.setValue('title', title)
      form.setValue('content', content)
    }
  }, [title, content, isEditing, form])

  useEffect(() => {
    if (!open) {
      setTitle('')
      setContent('')
    }
  }, [open])

  useEffect(() => {
    async function getUserAndNotes() {
      if (!user) return
      const result = await noteService.getUserWithNotes(user._id)
      setNotes(result?.data.notesId)
    }

    getUserAndNotes()
  }, [user, buttonClicked])

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setIsEditing(false)
              form.reset()
            }}
            className='border-2 border-slate-600 bg-white text-slate-600 hover:bg-slate-600 hover:text-white'
          >
            <PlusSquare />
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Write a Note' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='submit'>Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div>
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            title={note.title}
            content={note.content}
            noteId={note._id}
            onDelete={refreshOnButtonClick}
            onEdit={() => {
              setIsEditing(true)
              setOpen(true)
              setTitle(note.title)
              setContent(note.content)
              setEditingNoteId(note._id)
            }}
          />
        ))}
      </div>
    </div>
  )
}
