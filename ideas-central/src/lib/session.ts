export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
}

export function createSession(user: SessionUser): string {
  // In a production app, you'd use proper JWT or session tokens
  // For this demo, we'll use a simple base64 encoded JSON
  return Buffer.from(JSON.stringify(user)).toString('base64');
}

export function verifySession(token: string): SessionUser | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return JSON.parse(decoded) as SessionUser;
  } catch {
    return null;
  }
}

export function getSessionFromRequest(request: Request): SessionUser | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  return verifySession(token);
}