import test from 'node:test';
import assert from 'node:assert/strict';

import { getBearerTokenFromRequest } from '../lib/admin-auth.js';

test('extracts bearer token from authenticated requests', () => {
  const request = new Request('https://example.com/api/projects', {
    headers: {
      Authorization: 'Bearer test-token-123',
    },
  });

  assert.equal(getBearerTokenFromRequest(request), 'test-token-123');
});

test('rejects non bearer authorization headers', () => {
  const request = new Request('https://example.com/api/projects', {
    headers: {
      Authorization: 'Token test-token-123',
    },
  });

  assert.equal(getBearerTokenFromRequest(request), null);
});
