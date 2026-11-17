<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class UploadController extends Controller
{
    /**
     * Upload an icon or image asset to public storage
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:png,jpg,jpeg,svg,webp|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());

            // Save to public directory of backend
            $destinationPath = public_path('/');
            $file->move($destinationPath, $filename);

            // Copy to main website public directory if available
            $websitePublic = base_path('../public/' . $filename);
            if (File::exists(base_path('../public'))) {
                File::copy(public_path($filename), $websitePublic);
            }

            // Copy to CMS public directory if available
            $cmsPublic = base_path('../cms/public/' . $filename);
            if (File::exists(base_path('../cms/public'))) {
                File::copy(public_path($filename), $cmsPublic);
            }

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'url' => '/' . $filename,
                'filename' => $filename,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No file uploaded',
        ], 400);
    }
}
