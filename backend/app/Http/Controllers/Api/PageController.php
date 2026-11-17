<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * Get all pages
     */
    public function index()
    {
        $pages = Page::orderBy('updated_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $pages
        ]);
    }

    /**
     * Get a single page by ID or Slug
     */
    public function show($identifier)
    {
        $page = Page::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->first();

        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $page
        ]);
    }

    /**
     * Create or update a dynamic page (Upsert)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'content' => 'nullable|array',
            'status' => 'nullable|in:draft,published',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        } else {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        // Upsert by slug: if page with this slug already exists, update it instead of crashing with SQLSTATE[23000] UNIQUE constraint
        $page = Page::updateOrCreate(
            ['slug' => $validated['slug']],
            [
                'title' => $validated['title'],
                'meta_title' => $validated['meta_title'] ?? $validated['title'],
                'meta_description' => $validated['meta_description'] ?? '',
                'content' => $validated['content'] ?? [],
                'status' => $validated['status'] ?? 'draft',
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Page saved successfully',
            'data' => $page
        ], 200);
    }

    /**
     * Update an existing page
     */
    public function update(Request $request, $id)
    {
        $page = Page::find($id);

        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:pages,slug,' . $id,
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'content' => 'nullable|array',
            'status' => 'nullable|in:draft,published',
        ]);

        if (isset($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        $page->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Page updated successfully',
            'data' => $page
        ]);
    }

    /**
     * Delete a page
     */
    public function destroy($id)
    {
        $page = Page::find($id);

        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found'
            ], 404);
        }

        $page->delete();

        return response()->json([
            'success' => true,
            'message' => 'Page deleted successfully'
        ]);
    }
}
