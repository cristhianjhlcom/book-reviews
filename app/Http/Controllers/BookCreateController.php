<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
// use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Drivers\Imagick\Driver;
// use Intervention\Image\Drivers\Gd\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;

final class BookCreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'isbn' => ['required', 'max:20', 'unique:books,isbn'],
            'title' => ['required'],
            'description' => ['required', 'max:300'],
            'gender_id' => ['required', 'exists:genders,id'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);
        $imagePath = $this->uploadImage($request);
        Log::info("Image Path: {$imagePath}");
        Book::create([
            'isbn' => $request->isbn,
            'title' => $request->title,
            'description' => $request->description,
            'gender_id' => $request->gender_id,
            'image' => $imagePath,
        ]);

        return to_route('books.index');
    }

    private function uploadImage(Request $request): string
    {
        $image = $request->file('image');
        $manager = new ImageManager(new Driver());
        $filename = time().'.'.$image->getClientOriginalExtension();
        Log::info("Filename: {$filename}");
        $sizes = [
            'original' => file_get_contents($image->getRealPath()),
            'large' => $manager->read($image)->scale(width: 1200, height: 1800)->toWebp(60),
            'medium' => $manager->read($image)->scale(width: 600, height: 900)->toWebp(60),
            'small' => $manager->read($image)->scale(width: 300, height: 450)->toWebp(60),
            'thumbnail' => $manager->read($image)->cover(width: 150, height: 150)->toWebp(60),
        ];
        foreach ($sizes as $size => $img) {
            $folder = config('filesystems.disks.spaces.folder');
            $path = "{$folder}/uploads/{$size}/{$filename}";
            Log::info("Path: {$path}");
            Log::info("Folder: {$folder}");
            Storage::disk('spaces')->put($path, $img);
        }

        return $filename;
    }
}
