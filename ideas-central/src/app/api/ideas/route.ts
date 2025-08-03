import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Idea from '@/models/Idea';
import { getSessionFromRequest } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const user = getSessionFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    let query = {};
    
    // Students can only see their own ideas, faculty can see all
    if (user.role === 'student') {
      query = { studentId: user.id };
    }
    
    const ideas = await Idea.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { ideas },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Get ideas error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const user = getSessionFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Only students can create ideas
    if (user.role !== 'student') {
      return NextResponse.json(
        { error: 'Only students can submit ideas' },
        { status: 403 }
      );
    }
    
    const { title, description, category, teamMembers } = await request.json();
    
    // Validation
    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }
    
    const idea = new Idea({
      title,
      description,
      category,
      teamMembers: teamMembers || [],
      studentId: user.id,
      studentName: user.name,
      studentEmail: user.email,
    });
    
    await idea.save();
    
    return NextResponse.json(
      { 
        message: 'Idea submitted successfully',
        idea
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Create idea error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}