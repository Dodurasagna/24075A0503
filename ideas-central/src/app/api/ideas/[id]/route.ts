import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Idea from '@/models/Idea';
import { getSessionFromRequest } from '@/lib/session';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const user = getSessionFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { facultyComments, status } = await request.json();
    
    const idea = await Idea.findById(params.id);
    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }
    
    // Students can only update their own ideas (limited fields)
    if (user.role === 'student' && idea.studentId.toString() !== user.id) {
      return NextResponse.json(
        { error: 'You can only update your own ideas' },
        { status: 403 }
      );
    }
    
    // Faculty can update any idea with comments and status
    if (user.role === 'faculty') {
      if (facultyComments !== undefined) {
        idea.facultyComments = facultyComments;
      }
      if (status !== undefined) {
        idea.status = status;
        idea.mentorId = user.id;
      }
    }
    
    await idea.save();
    
    return NextResponse.json(
      { 
        message: 'Idea updated successfully',
        idea
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Update idea error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const user = getSessionFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const idea = await Idea.findById(params.id);
    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }
    
    // Only students can delete their own ideas, and only if not reviewed yet
    if (user.role !== 'student' || idea.studentId.toString() !== user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own ideas' },
        { status: 403 }
      );
    }
    
    if (idea.status !== 'submitted') {
      return NextResponse.json(
        { error: 'Cannot delete ideas that have been reviewed' },
        { status: 400 }
      );
    }
    
    await Idea.findByIdAndDelete(params.id);
    
    return NextResponse.json(
      { message: 'Idea deleted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Delete idea error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}