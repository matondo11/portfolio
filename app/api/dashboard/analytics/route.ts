import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { getAllViews } from '@/lib/db';

// Get month abbreviations
const getMonthAbbreviation = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[date.getMonth()];
};

// Generate last 12 months array
const getLast12Months = (): { date: Date; label: string }[] => {
  const months = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      date,
      label: getMonthAbbreviation(date),
    });
  }

  return months;
};

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      // Fallback for development without database
      return NextResponse.json({
        monthlyViews: [],
        monthlyProjects: [],
        statusDistribution: [],
      });
    }

    await dbConnect();

    // Get all projects
    const projects = await Project.find().sort({ createdAt: 1 });

    // Get all views
    const allViews = await getAllViews();

    // Generate last 12 months
    const last12Months = getLast12Months();

    // Calculate monthly views
    const monthlyViews = last12Months.map(({ date, label }) => {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      const projectsInMonth = projects.filter(p => {
        const projectDate = new Date(p.createdAt);
        return projectDate >= monthStart && projectDate < monthEnd;
      });

      const value = projectsInMonth.reduce((sum, project) => {
        const projectView = allViews.find(v => v.projectId === project._id.toString());
        return sum + (projectView?.count || 0);
      }, 0);

      return { month: label, value };
    });

    // Calculate monthly projects (count of projects created each month)
    const monthlyProjects = last12Months.map(({ date, label }) => {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      const count = projects.filter(p => {
        const projectDate = new Date(p.createdAt);
        return projectDate >= monthStart && projectDate < monthEnd;
      }).length;

      return { month: label, value: count };
    });

    // Calculate status distribution
    const statusDistribution = [
      {
        name: 'Production',
        value: projects.filter(p => p.status === 'production').length,
        fill: '#10b981',
      },
      {
        name: 'In Progress',
        value: projects.filter(p => p.status === 'in-progress').length,
        fill: '#f59e0b',
      },
      {
        name: 'Idea',
        value: projects.filter(p => p.status === 'idea').length,
        fill: '#6b7280',
      },
    ];

    return NextResponse.json({
      monthlyViews,
      monthlyProjects,
      statusDistribution,
    });
  } catch (error) {
    console.error('GET /api/dashboard/analytics error:', error);
    return NextResponse.json(
      { error: (error as any)?.message || 'Erro ao buscar analytics' },
      { status: 500 }
    );
  }
}
