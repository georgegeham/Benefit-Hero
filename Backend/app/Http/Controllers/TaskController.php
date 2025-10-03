<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(){
        return Task::all();
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => "required|string|max:255",
            'description' => "nullable|string",
            'status' => 'required|in:todo,in-progress,done',
        ]);
        $task = Task::create($validated);

        return response()->json($task, 201);
    }
    public function update(Request $request, $id){
         $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in-progress,done',
        ]);
        $task = Task::findOrFail($id);
        $task->update($validated);
        return response()->json($task, 200);
    }

    public function destroy($id){
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }

}
