<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PropertyController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Property::orderBy('updated_at', 'desc')->get()
        ]);
    }

    public function show($id)
    {
        $property = Property::find($id);
        if (!$property) {
            return response()->json(['success' => false, 'message' => 'Property not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $property]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'nullable|string',
            'price' => 'required|string',
            'location' => 'required|string',
            'bedrooms' => 'nullable|integer',
            'bathrooms' => 'nullable|integer',
            'area_sqft' => 'nullable|integer',
            'status' => 'nullable|in:available,reserved,sold',
            'image_url' => 'nullable|string',
            'slug' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        }
        $property = Property::create($validated);

        return response()->json(['success' => true, 'data' => $property], 201);
    }

    public function update(Request $request, $id)
    {
        $property = Property::find($id);
        if (!$property) {
            return response()->json(['success' => false, 'message' => 'Property not found'], 404);
        }

        $property->update($request->all());
        return response()->json(['success' => true, 'data' => $property]);
    }

    public function destroy($id)
    {
        $property = Property::find($id);
        if ($property) {
            $property->delete();
        }
        return response()->json(['success' => true, 'message' => 'Property deleted']);
    }
}
