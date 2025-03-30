import { Book, Gender, SharedData } from '@/types';
import { ExtFile } from '@files-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, usePage } from '@inertiajs/react';
import { createContext, ReactNode, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type BookContext = {
    books: Book[];
    files: ExtFile[];
    genders: Gender[];
    form: UseFormReturn<z.infer<typeof formSchema>>;
    createDialog: boolean;
    toggleCreateDialog: () => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    onUpdateFiles: (files: ExtFile[]) => void;
};

type Props = {
    children: ReactNode;
};

export const BookPageContext = createContext<BookContext>({
    books: [],
    files: [],
    genders: [],
    form: null as unknown as UseFormReturn<z.infer<typeof formSchema>>,
    createDialog: false,
    toggleCreateDialog: () => {},
    onSubmit: () => {},
    onUpdateFiles: () => {},
});

const formSchema = z.object({
    isbn: z
        .string()
        .min(2, {
            message: 'ISBN must be at least 2 characters.',
        })
        .max(20, {
            message: 'Max number of character is 20.',
        }),
    title: z
        .string()
        .min(2, {
            message: 'Title must be at least 2 characters.',
        })
        .max(60, {
            message: 'Max number of character is 60.',
        }),
    gender_id: z.string(),
    description: z.string().max(300, {
        message: 'The description field must not be greater than 300 characters.',
    }),
});

export default function BookContextProvider({ children }: Props) {
    const { books, genders } = usePage<SharedData>().props;
    const [createDialog, setCreateDialog] = useState<boolean>(false);
    const [files, setFiles] = useState<ExtFile[]>([]);
    /*
    const gender = genders.find((gender) => gender.id) ?? ({} as Gender);
    const { data, setData, post, processing, errors, reset } = useForm<Required<BookForm>>({
        isbn: '',
        title: '',
        slug: '',
        gender: String(gender.id),
        description: '',
    });
    */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isbn: '',
            title: '',
            gender_id: '1',
            description: '',
        },
    });

    function onUpdateFiles(files: ExtFile[]) {
        setFiles(files);
    }

    function toggleCreateDialog() {
        setCreateDialog(!createDialog);
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const image = files.length > 0 ? files[0].file : null;
        console.log({
            values,
            image,
            files,
        });
        router.post(
            route('books.create'),
            {
                ...values,
                image,
            },
            {
                onSuccess: () => {
                    toast('Book created successfully.');
                    toggleCreateDialog();
                },
            },
        );
    }

    return (
        <BookPageContext.Provider
            value={{
                books,
                files,
                genders,
                form,
                createDialog,
                toggleCreateDialog,
                onSubmit,
                onUpdateFiles,
            }}
        >
            {children}
        </BookPageContext.Provider>
    );
}
