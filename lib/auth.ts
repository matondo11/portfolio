import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(payload: object): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não configurado');
  }

  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  } catch (e) {
    console.error('Failed to generate token', e);
    throw e;
  }
}

export function verifyToken(token: string): any {
  if (!JWT_SECRET) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getBearerTokenFromRequest(request: Request | { headers?: Headers | Record<string, string> }): string | null {
  const headers = request.headers;
  const authHeader =
    headers && typeof (headers as Headers).get === 'function'
      ? (headers as Headers).get('authorization')
      : (headers as Record<string, string> | undefined)?.authorization ??
        (headers as Record<string, string> | undefined)?.Authorization ??
        null;

  if (!authHeader) return null;

  const match = /^Bearer\s+(.+)$/i.exec(String(authHeader).trim());
  return match ? match[1] : null;
}

export function requireAuth(request: Request): { ok: boolean; payload?: any; error?: string } {
  const token = getBearerTokenFromRequest(request);

  if (!token) {
    return { ok: false, error: 'Não autorizado' };
  }

  const payload = verifyToken(token);

  if (!payload) {
    return { ok: false, error: 'Não autorizado' };
  }

  return { ok: true, payload };
}