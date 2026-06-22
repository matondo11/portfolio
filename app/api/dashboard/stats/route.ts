import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { getAllFeedback, getAllViews } from '@/lib/db';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      // Fallback for development without database
      return NextResponse.json({
        total: 0,
        production: 0,
        inProgress: 0,
        idea: 0,
        viewsThisMonth: 0,
        feedbackCount: 0,
      });
    }

    await dbConnect();

    // Get all projects
    const projects = await Project.find();
    const total = projects.length;

    // Count production projects
    const production = projects.filter(p => p.status === 'production').length;

    // Count in-progress projects
    const inProgress = projects.filter(p => p.status === 'in-progress').length;

    // Count idea projects
    const idea = projects.filter(p => p.status === 'idea').length;

    // Get views for current month
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const projectsThisMonth = projects.filter(p => {
      const projectDate = new Date(p.createdAt);
      return projectDate >= currentMonth && projectDate < nextMonth;
    });

    // Get all views and sum them for projects created this month
    const allViews = await getAllViews();
    const viewsThisMonth = projectsThisMonth.reduce((sum, project) => {
      const projectView = allViews.find(v => v.projectId === project._id.toString());
      return sum + (projectView?.count || 0);
    }, 0);

    // Get feedback count
    const feedback = await getAllFeedback();
    const feedbackCount = feedback.length;

    return NextResponse.json({
      total,
      production,
      inProgress,
      idea,
      viewsThisMonth,
      feedbackCount,
    });
  } catch (error) {
    console.error('GET /api/dashboard/stats error:', error);
    return NextResponse.json(
      { error: (error as any)?.message || 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}
