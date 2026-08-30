# NestJS API with PostgreSQL, Prisma, and Docker

A production-ready NestJS application with PostgreSQL, Prisma ORM, Nginx reverse proxy, and Docker containerization.

## 🚀 Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Web Server**: Nginx (reverse proxy)
- **Containerization**: Docker & Docker Compose
- **Validation**: class-validator
- **Transformation**: class-transformer
- **Password Hashing**: bcryptjs

## 📋 Prerequisites

- Docker & Docker Compose installed
- Or Node.js 20+ and PostgreSQL 16+ (for local development)

## 🏗️ Project Structure

```
.
├── src/
│   ├── users/                 # Users module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── prisma/               # Prisma service and module
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts         # Root module
│   └── main.ts               # Application entry point
├── prisma/
│   └── schema.prisma         # Prisma schema
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # NestJS application Docker image
├── nginx.conf                # Nginx configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── .env.example              # Environment variables example
└── README.md                 # This file
```

## 🚀 Quick Start

### Using Docker Compose (Recommended)

1. **Clone or download this project**

2. **Start the application**:
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations**:
   ```bash
   docker-compose exec nestjs-api npm run prisma:migrate
   ```

4. **Verify the setup**:
   - API: http://localhost (via Nginx)
   - Direct API: http://localhost:3000
   - PostgreSQL: localhost:5432

### Local Development (without Docker)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up PostgreSQL**:
   - Create a database named `nestjs_db`
   - Update `.env` file with your database credentials

3. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

4. **Start the application**:
   ```bash
   npm run start:dev
   ```

5. **Access the API**:
   ```
   http://localhost:3000
   ```

## 📚 API Endpoints

### Users

- **Create User**
  ```
  POST /users
  Content-Type: application/json
  
  {
    "email": "user@example.com",
    "password": "securepassword123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

- **Get All Users**
  ```
  GET /users
  ```

- **Get User by ID**
  ```
  GET /users/:id
  ```

- **Update User**
  ```
  PATCH /users/:id
  Content-Type: application/json
  
  {
    "firstName": "Jane",
    "lastName": "Smith"
  }
  ```

- **Delete User**
  ```
  DELETE /users/:id
  ```

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  firstName String?
  lastName  String?
  password  String
  isActive  Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛠️ Available Commands

### Development
```bash
npm run start:dev          # Start with watch mode
npm run start:debug        # Start with debugging
npm run build              # Build the project
```

### Production
```bash
npm run start:prod         # Start production build
```

### Database
```bash
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate Prisma client
npx prisma studio         # Open Prisma Studio (GUI)
```

### Linting & Formatting
```bash
npm run lint               # Run ESLint
npm run format             # Format with Prettier
```

### Testing
```bash
npm test                   # Run tests
npm run test:watch         # Watch mode
npm run test:cov           # Coverage report
npm run test:e2e           # E2E tests
```

## 🐳 Docker Compose Services

### postgres
- **Image**: postgres:16-alpine
- **Port**: 5432
- **User**: user
- **Password**: password
- **Database**: nestjs_db

### nestjs-api
- **Image**: Built from Dockerfile
- **Port**: 3000
- **Environment**: Production ready
- **Dependencies**: Depends on PostgreSQL

### nginx
- **Image**: nginx:alpine
- **Port**: 80 (HTTP), 443 (HTTPS)
- **Role**: Reverse proxy for NestJS API
- **Features**: Gzip compression, security headers, SSL support

## 🔧 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@postgres:5432/nestjs_db
DB_HOST=postgres
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=nestjs_db

# Application
NODE_ENV=development
PORT=3000
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ Input validation with class-validator
- ✅ Non-root Docker user
- ✅ Security headers in Nginx
- ✅ HTTPS support in Nginx
- ✅ Environment variable protection

## 📝 Next Steps

1. **Add Authentication**
   - JWT implementation
   - Login/Register endpoints
   - Auth guards

2. **Add Authorization**
   - Role-based access control (RBAC)
   - Permission system

3. **Add More Modules**
   - Products, Orders, etc.
   - Relationships between models

4. **Add Testing**
   - Unit tests for services
   - Integration tests for API endpoints
   - E2E tests

5. **Add Logging**
   - Structured logging with Winston or Pino
   - Log rotation and management

6. **Add API Documentation**
   - Swagger/OpenAPI integration
   - API documentation endpoints

## 📞 Support & Documentation

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Nginx Documentation](https://nginx.org/en/docs)
- [Docker Documentation](https://docs.docker.com)

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.
