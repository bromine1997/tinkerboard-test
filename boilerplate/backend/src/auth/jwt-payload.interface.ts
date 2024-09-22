export interface JwtPayload {
    username: string; // 사용자명 또는 고유 아이디
    sub: string;      // 사용자 식별자 (일반적으로 userId 또는 MongoDB에서의 _id)
    role: string;     // 사용자의 권한 (예: 'member', 'admin')
  }
  