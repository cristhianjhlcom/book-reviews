import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { books } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <header>
                <div className="max-w-5xl mx-auto py-4">
                    <Link href={route('dashboard')}>Dashboard</Link>
                </div>
            </header>
            <div className="max-w-5xl mx-auto py-6">
                {books.map((book) => (
                    <div key={book.isbn}>
                        <h1>{book.title}</h1>
                        <p>{book.description ?? 'No description'}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
