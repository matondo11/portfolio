const VALID_PROJECT_STATUSES = new Set(['production', 'in-progress', 'idea']);

function sanitizeArray(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function sanitizeUrl(value) {
  const normalized = typeof value === 'string' ? value.trim() : '';
  return normalized || undefined;
}

function normalizeProjectInput(input = {}) {
  const liveUrl = sanitizeUrl(input.liveUrl ?? input.demo ?? input.url);
  const githubUrl = sanitizeUrl(input.githubUrl ?? input.github);
  const technologies = sanitizeArray(input.technologies);
  const status = VALID_PROJECT_STATUSES.has(input.status) ? input.status : 'idea';

  return {
    title: String(input.title ?? '').trim(),
    description: String(input.description ?? '').trim(),
    image: sanitizeUrl(input.image) || '',
    video: sanitizeUrl(input.video) || '',
    technologies,
    github: githubUrl,
    githubUrl,
    demo: liveUrl,
    liveUrl,
    figma: sanitizeUrl(input.figma),
    platform: Array.isArray(input.platform) ? input.platform.filter((item) => ['web', 'ios', 'android'].includes(String(item))) : [],
    status,
    featured: Boolean(input.featured),
    published: input.published !== undefined ? Boolean(input.published) : true,
    longDescription: sanitizeUrl(input.longDescription),
    problem: sanitizeUrl(input.problem),
    solution: sanitizeUrl(input.solution),
    results: Array.isArray(input.results) ? input.results.map((item) => String(item).trim()).filter(Boolean) : [],
    filterTags: sanitizeArray(input.filterTags),
    views: typeof input.views === 'number' ? input.views : 0,
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
}

function resolveProjectList(projects = [], includeDrafts = false) {
  return (projects || []).filter((project) => includeDrafts || project.published !== false);
}

module.exports = {
  normalizeProjectInput,
  resolveProjectList,
};
