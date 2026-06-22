import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { getAllFeedback } from '@/lib/db';

interface ActivityItem {
  id: string;
  type: 'project-created' | 'feedback-received';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      // Fallback for development without database
      return NextResponse.json([]);
    }

    await dbConnect();

    const activities: ActivityItem[] = [];

    // Get projects and create activities
    const projects = await Project.find().sort({ createdAt: -1 }).limit(20);
    projects.forEach(project => {
      activities.push({
        id: `project-${project._id.toString()}`,
        type: 'project-created',
        title: 'Novo projeto criado',
        description: `Projeto '${project.title}' foi criado`,
        timestamp: new Date(project.createdAt).toISOString(),
        icon: 'Package',
      });
    });

    // Get feedback and create activities
    const feedback = await getAllFeedback();
    feedback.slice(0, 20).forEach(item => {
      activities.push({
        id: `feedback-${item.id}`,
        type: 'feedback-received',
        title: 'Novo feedback recebido',
        description: `Feedback de ${item.name}`,
        timestamp: new Date(item.createdAt).toISOString(),
        icon: 'MessageCircle',
      });
    });

    // Sort by timestamp descending (newest first)
    activities.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    // Return last 20 activities
    return NextResponse.json(activities.slice(0, 20));
  } catch (error) {
    console.error('GET /api/dashboard/activity error:', error);
    return NextResponse.json(
      { error: (error as any)?.message || 'Erro ao buscar atividades' },
      { status: 500 }
    );
  }
}
