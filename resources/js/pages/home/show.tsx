import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show() {
    const { book } = usePage<SharedData>().props;

    return (
        <>
            <Head title={book.title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <header>
                <div className="mx-auto max-w-5xl py-4">
                    <Link href={route('home.index')}>Books</Link>
                </div>
            </header>
            <div className="mx-auto max-w-5xl space-y-5">
                <section className="w-full">
                    <article className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <img src={book.images.medium} alt={book.title} className="w-full rounded-xl" />
                        <div className="space-y-2">
                            <h1 className="text-4xl font-semibold">{book.title}</h1>
                            <div>
                                <span>️⭐ ({book.rating.average}/5)</span>
                                <span className="text-gray-300"> ({book.rating.count} reviews)</span>
                            </div>
                            <p className="leading-relaxed text-gray-300">{book.description}</p>
                        </div>
                    </article>
                </section>
            </div>
        </>
    );
}
