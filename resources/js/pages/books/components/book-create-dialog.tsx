import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { useContext } from 'react';
import { BookPageContext } from '../context/book-context';

export default function BookCreateDialog() {
    const { form, genders, files, createDialog, toggleCreateDialog, onSubmit, onUpdateFiles } = useContext(BookPageContext);

    return (
        <Dialog open={createDialog} onOpenChange={toggleCreateDialog}>
            <DialogTrigger onClick={() => toggleCreateDialog()} asChild>
                <Button variant="default">Add book</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add a new book</DialogTitle>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="isbn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ISBN" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Harry Potter" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a fruit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Gender</SelectLabel>
                                                    {genders.map((gender) => (
                                                        <SelectItem key={gender.id} value={String(gender.id)}>
                                                            {gender.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="The choose one..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Dropzone onChange={onUpdateFiles} value={files}>
                            {files.map((file, idx) => (
                                <FileMosaic key={idx} {...file} preview />
                            ))}
                        </Dropzone>
                        <Button type="submit">Save book</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
