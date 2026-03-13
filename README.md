# 🏥 고압산소챔버 IoT 모니터링 시스템

<div align="center">
  
  ![Platform](https://img.shields.io/badge/Platform-Tinker%20Board%202S-orange)
  ![Backend](https://img.shields.io/badge/Backend-NestJS-red)
  ![Frontend](https://img.shields.io/badge/Frontend-Vue%203-green)
  ![DB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
  ![License](https://img.shields.io/badge/License-MIT-blue)

  **Tinker Board 2S 기반 고압산소챔버 실시간 모니터링 및 제어 시스템**

</div>

---

## 📋 개요

Tinker Board 2S IoT 디바이스를 활용한 고압산소챔버 원격 모니터링 및 제어 플랫폼입니다.  
WebSocket을 통해 챔버의 센서 데이터를 실시간으로 수집·시각화하며, JWT 인증 기반의 안전한 접근 제어를 제공합니다.

## ✨ 주요 기능

- 📡 **실시간 센서 데이터 모니터링** — 압력, 온도, 습도, O₂/CO₂ 농도, 유량
- 📊 **시계열 차트 시각화** — Chart.js / ECharts 기반 라이브 그래프
- 🔐 **JWT 인증** — 사용자 로그인 및 권한 관리
- 💾 **MongoDB 이력 저장** — 세션별 센서 데이터 영구 보관
- ⚙️ **압력 프로파일 관리** — 챔버 운영 프로파일 CRUD
- 🐳 **컨테이너 기반 배포** — Docker / PM2 / Kubernetes(K3s) 지원

---

## 🏗️ 시스템 아키텍처

```
┌──────────────────────────────────────────┐
│              Tinker Board 2S             │
│  ┌─────────────┐    ┌──────────────────┐ │
│  │   센서 HAL   │───▶│  Backend (NestJS)│ │
│  └─────────────┘    │  - REST API       │ │
│                     │  - WebSocket GW   │ │
│  ┌─────────────┐    │  - MQTT           │ │
│  │  Frontend   │◀───│  - JWT Auth       │ │
│  │  (Vue 3)    │    └──────────┬────────┘ │
│  └─────────────┘               │          │
│                         ┌──────▼──────┐   │
│                         │   MongoDB   │   │
│                         └─────────────┘   │
└──────────────────────────────────────────┘
```

---

## 🛠️ 기술 스택

### Backend
|
 분류 
|
 기술 
|
|
------
|
------
|
|
 Framework 
|
 NestJS 10 (Fastify adapter) 
|
|
 Database 
|
 MongoDB + Mongoose 8 
|
|
 Real-time 
|
 Socket.IO 4 (WebSocket) 
|
|
 Auth 
|
 JWT + Passport + bcrypt 
|
|
 Protocol 
|
 MQTT 5 
|
|
 Monitoring 
|
 Prometheus metrics (
`/metrics`
) 
|
|
 Logging 
|
 Winston 
|
|
 Docs 
|
 Swagger (OpenAPI) 
|

### Frontend
|
 분류 
|
 기술 
|
|
------
|
------
|
|
 Framework 
|
 Vue 3.5 + Vue Router 4 
|
|
 State 
|
 Pinia 2 
|
|
 Charts 
|
 ECharts 5 / Chart.js 3 
|
|
 Real-time 
|
 Socket.IO Client 4 
|
|
 i18n 
|
 vue-i18n 9 
|
|
 CSS 
|
 SCSS 
|

### 인프라
|
 분류 
|
 기술 
|
|
------
|
------
|
|
 Container 
|
 Docker + Nginx 
|
|
 Process 
|
 PM2 
|
|
 Orchestration 
|
 K3s (Kubernetes) + Helm 
|

---

## 📁 디렉토리 구조

```
tinkerboard-test/
├── boilerplate/
│   ├── backend/                # NestJS 백엔드 서버
│   │   └── src/
│   │       ├── auth/           # JWT 인증
│   │       ├── user/           # 사용자 관리
│   │       ├── pressure-profile/ # 압력 프로파일 CRUD
│   │       ├── ws/             # WebSocket 게이트웨이 (센서 데이터)
│   │       ├── health-check/   # 헬스 체크
│   │       └── core/           # 공통 유틸리티 (로깅, 미들웨어)
│   └── frontend/               # Vue 3 프론트엔드
│       └── src/
│           ├── components/
│           │   ├── Charts/     # 실시간 차트 컴포넌트
│           │   └── Cards/      # 통계 카드
│           └── views/
├── script/                     # 배포 자동화 스크립트
│   ├── backend.sh              # 백엔드 배포 (PM2)
│   ├── frontend.sh             # 프론트엔드 배포 (Docker)
│   └── docker.sh               # Docker 설치 (ARM)
└── document/                   # 설치 및 운영 가이드
```

---

## 🚀 시작하기

### 사전 요구사항
- Node.js 18+
- MongoDB
- Docker (프론트엔드 배포 시)
- PM2 (`npm install -g pm2`)

### 백엔드

```bash
cd boilerplate/backend
npm install
npm run start:dev       # 개발 서버
npm run build           # 빌드
npm run start:prod      # 프로덕션
```

### 프론트엔드

```bash
cd boilerplate/frontend
npm install
npm run dev             # 개발 서버 (hot-reload)
npm run build           # 프로덕션 빌드
```

---

## 📡 WebSocket 이벤트

|
 이벤트 
|
 방향 
|
 설명 
|
|
--------
|
------
|
------
|
|
`sensor_data`
|
 Server → Client 
|
 실시간 센서 데이터 브로드캐스트 
|
|
`client_command`
|
 Client → Server 
|
 디바이스 제어 명령 전송 
|

### 센서 데이터 페이로드

```json
{
  "deviceId": "string",
  "sessionId": "string",
  "pressure": 1.2,
  "temperature": 36.5,
  "humidity": 45.0,
  "o2Level": 21.0,
  "co2Level": 0.04,
  "flowRate": 5.0,
  "elapsedTime": 120,
  "setPoint": 1.5
}
```

---

## 🔌 API 엔드포인트

서버 실행 후 Swagger 문서 확인: **`http://localhost:3000/api`**

|
 메서드 
|
 경로 
|
 설명 
|
|
--------
|
------
|
------
|
|
 POST 
|
`/auth/login`
|
 로그인 (JWT 발급) 
|
|
 GET/POST 
|
`/user`
|
 사용자 조회/생성 
|
|
 GET/POST/PATCH/DELETE 
|
`/pressure-profile`
|
 압력 프로파일 관리 
|
|
 GET 
|
`/health`
|
 헬스 체크 
|
|
 GET 
|
`/metrics`
|
 Prometheus 메트릭 
|

---

## 📦 배포

### 쉘 스크립트 자동 배포

```bash
# 백엔드 배포 (PM2)
bash script/backend.sh

# 프론트엔드 배포 (Docker, port 3000)
bash script/frontend.sh
```

### Docker

```bash
# 프론트엔드
cd boilerplate/frontend
docker build -t frontend:latest .
docker run -p 3000:80 frontend:latest
```

### Helm (K3s)

자세한 내용은 `document/` 디렉토리 참고

---

## 📚 문서

|
 문서 
|
 위치 
|
|
------
|
------
|
|
 설치 가이드 
|
`document/`
|
|
 Docker 설정 
|
`document/`
|
|
 K3s / Kubernetes 
|
`document/`
|
|
 Helm Chart 
|
`document/`
|
|
 PM2 설정 
|
`document/`
|

---

## 📄 라이선스

MIT License
