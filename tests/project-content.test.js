const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeProjectInput, resolveProjectList } = require('../lib/project-content.js');

test('normalizes project payload into the published portfolio schema', () => {
  const normalized = normalizeProjectInput({
    title: 'Case Demo',
    description: 'Example description',
    technologies: ['React', 'Next.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
    published: true,
  });

  assert.equal(normalized.title, 'Case Demo');
  assert.equal(normalized.liveUrl, 'https://example.com');
  assert.equal(normalized.githubUrl, 'https://github.com/example');
  assert.equal(normalized.demo, 'https://example.com');
  assert.equal(normalized.github, 'https://github.com/example');
  assert.equal(normalized.featured, true);
  assert.equal(normalized.published, true);
});

test('filters out drafts from public listings by default', () => {
  const publicProjects = resolveProjectList([
    { title: 'Visible', published: true },
    { title: 'Hidden', published: false },
  ]);

  assert.deepEqual(publicProjects.map((project) => project.title), ['Visible']);
});
