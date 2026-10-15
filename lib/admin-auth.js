function getBearerTokenFromRequest(request) {
  const headers = request && request.headers ? request.headers : {};
  const authHeader = typeof headers.get === 'function' ? headers.get('authorization') : headers.authorization || headers.Authorization;

  if (!authHeader) return null;

  const match = /^Bearer\s+(.+)$/i.exec(String(authHeader).trim());
  return match ? match[1] : null;
}

function requireAuth(request) {
  const token = getBearerTokenFromRequest(request);

  if (!token) {
    return { ok: false, error: 'Não autorizado' };
  }

  return { ok: true, payload: { token } };
}

module.exports = {
  getBearerTokenFromRequest,
  requireAuth,
};
