import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type BookForm = {
    isbn: string;
    title: string;
    slug: string;
    gender: string;
    description: string;
};

export default function Dashboard() {
    const { books, genders } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<BookForm>>({
        isbn: '',
        title: '',
        slug: '',
        gender: genders.find((gender) => gender.id),
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('data :: ', data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <header className="flex justify-end px-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add book</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="isbn" className="text-right">
                                    ISBN
                                </Label>
                                <Input id="isbn" className="col-span-3" value={data.isbn} onChange={(e) => setData('isbn', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Title
                                </Label>
                                <Input id="title" value={data.title} className="col-span-3" onChange={(e) => setData('title', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Slug
                                </Label>
                                <Input id="slug" value={data.slug} className="col-span-3" onChange={(e) => setData('slug', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    className="w-100"
                                    placeholder="Book description ..."
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                            </div>
                            {/* <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Gender
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectLabel>Genders</SelectLabel>
                                        {genders.map((gender) => (
                                            <SelectItem value={String(gender.id)} key={gender.id}>
                                                {gender.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div> */}
                        </div>
                        <DialogFooter>
                            <Button type="button" onClick={submit}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableCaption>A list of your recent books.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead className="text-right">Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.isbn}>
                                <TableCell className="font-medium">{book.title}</TableCell>
                                <TableCell>{book.gender.name}</TableCell>
                                <TableCell className="text-right">{book.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">{books.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    );
}
