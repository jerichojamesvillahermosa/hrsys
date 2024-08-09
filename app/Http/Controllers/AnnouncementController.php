<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    
    public function create(): Response
    {
        return Inertia::render('Announcement/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'title.required' => 'Please input a title',
            'content.required' => 'Please input content',
            'image.max' => "Please change the file uploaded to a file that doesn't exceed 5 MB",
        ]);

        $imagePath = null;
        if($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('announcements', 'public');
        }

        Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'image_path' => $imagePath,
        ]);

        return response()->json(['message' => 'Announcement created successfully'], 200);
    }
    public function index(): Response
    {
        $announcementList = Announcement::all();

        // dd($announcementList);
        // return Inertia::render('Announcement/List');
        return Inertia::render('Announcement/List', [
            'announcements' => $announcementList,
        ]);
    }
    
}
