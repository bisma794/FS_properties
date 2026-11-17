<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OffPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OffPlanController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => OffPlan::orderBy('updated_at', 'desc')->get()
        ]);
    }

    public function show($id)
    {
        $item = is_numeric($id)
            ? OffPlan::find($id)
            : OffPlan::where('slug', $id)->first();

        if (!$item) {
            $item = OffPlan::where('slug', $id)->first();
        }

        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Off-plan project not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'developer' => 'required|string',
            'starting_price' => 'required|string',
            'location' => 'required|string',
            'completion_date' => 'required|string',
            'payment_plan' => 'nullable|string',
            'status' => 'nullable|in:selling,coming_soon,sold_out',
            'image_url' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // If slug already exists, make it unique
        $baseSlug = $validated['slug'];
        $count = 1;
        while (OffPlan::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = "{$baseSlug}-{$count}";
            $count++;
        }

        $item = OffPlan::create($validated);

        return response()->json(['success' => true, 'data' => $item], 201);
    }

    public function update(Request $request, $id)
    {
        $item = OffPlan::find($id);
        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        $item->update($request->all());
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function destroy($id)
    {
        $item = OffPlan::find($id);
        if ($item) {
            $item->delete();
        }
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}
