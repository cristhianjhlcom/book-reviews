import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import BookCreateDialog from '../components/book-create-dialog';
import BookTable from '../components/book-table';
import BookContextProvider from '../context/book-context';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

/*
type BookForm = {
    isbn: string;
    title: string;
    slug: string;
    gender?: string;
    description?: string;
}
*/

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <BookContextProvider>
                <header className="flex w-full justify-end px-4 pt-4">
                    <div></div>
                    <BookCreateDialog />
                </header>
                <BookTable />
            </BookContextProvider>
        </AppLayout>
    );
}
