<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Project::orderBy('updated_at', 'desc')->get()
        ]);
    }

    public function show($id)
    {
        $item = Project::find($id);
        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Project not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'developer' => 'required|string',
            'category' => 'nullable|string',
            'total_units' => 'nullable|integer',
            'location' => 'required|string',
            'status' => 'nullable|in:active,featured,archived',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        $item = Project::create($validated);

        return response()->json(['success' => true, 'data' => $item], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Project::find($id);
        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        $item->update($request->all());
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function destroy($id)
    {
        $item = Project::find($id);
        if ($item) {
            $item->delete();
        }
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}
