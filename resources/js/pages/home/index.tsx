import { AspectRatio } from '@/components/ui/aspect-ratio';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { books, booksCount } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <header>
                <div className="mx-auto max-w-5xl py-4">
                    <Link href={route('home.index')}>Books</Link>
                </div>
            </header>
            <div className="mx-auto max-w-5xl space-y-5">
                <h4 className="text-3xl font-semibold text-white">📚 Lista de Libros ({booksCount})</h4>
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {books.map((book) => (
                        <Link href={route('home.show', { id: book.isbn })} key={book.isbn} className="group">
                            <article className="space-y-2">
                                <AspectRatio ratio={2 / 3}>
                                    <img src={book.images.small} alt={book.title} className="rounded-sm object-cover" />
                                </AspectRatio>
                                <h1 className="text-md font-semibold">{book.title}</h1>
                                <div>
                                    <span>️⭐ ({book.rating.average}/5)</span>
                                    <span className="text-gray-300"> ({book.rating.count} reviews)</span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </section>
            </div>
        </>
    );
}
