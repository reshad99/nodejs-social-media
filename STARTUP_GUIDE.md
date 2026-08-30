# 🚀 Project Startup Guide

This guide will help you get the NestJS project up and running.

## Prerequisites

- Docker & Docker Compose installed (recommended)
- OR Node.js 20+, PostgreSQL 16+ (for local development)

## Quick Start with Docker

### 1. Start the Application

```bash
docker-compose up -d
```

This will start:
- PostgreSQL (port 5432)
- NestJS API (port 3000)
- Nginx reverse proxy (port 80)

### 2. Initialize Database

```bash
# First time setup - create and migrate the database
docker-compose exec nestjs-api npm run prisma:migrate

# Or view the database with Prisma Studio
docker-compose exec nestjs-api npm run prisma:studio
```

### 3. Test the API

```bash
# Get all users (empty initially)
curl http://localhost/users

# Create a new user
curl -X POST http://localhost/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Get user by ID
curl http://localhost/users/1

# Update user
curl -X PATCH http://localhost/users/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Jane"}'

# Delete user
curl -X DELETE http://localhost/users/1
```

## Useful Commands

### Docker Commands

```bash
# View logs
docker-compose logs -f nestjs-api

# Access app shell
docker-compose exec nestjs-api sh

# Access database
docker-compose exec postgres psql -U user -d nestjs_db

# Stop services
docker-compose stop

# Restart services
docker-compose restart

# Remove everything (including data)
docker-compose down -v
```

### Development Commands

```bash
# Run tests
docker-compose exec nestjs-api npm test

# Lint code
docker-compose exec nestjs-api npm lint

# Format code
docker-compose exec nestjs-api npm run format

# Install new package
docker-compose exec nestjs-api npm install package-name
```

### Using Makefile (if available)

```bash
make up          # Start services
make down        # Stop services
make logs        # View logs
make shell       # Access app
make shell-db    # Access database
make test        # Run tests
make clean       # Remove everything
```

## Local Development (Without Docker)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

- Install PostgreSQL locally
- Create database: `nestjs_db`
- Update `.env` with your database credentials

### 3. Run Migrations

```bash
npm run prisma:migrate
```

### 4. Start the Application

```bash
npm run start:dev
```

Access at: http://localhost:3000

## Troubleshooting

### Port Already in Use

If port 80, 3000, or 5432 is already in use, modify `docker-compose.yml`:

```yaml
ports:
  - "8080:80"        # Change 80 to 8080
  - "3001:3000"      # Change 3000 to 3001
  - "5433:5432"      # Change 5432 to 5433
```

### Database Connection Failed

1. Check if PostgreSQL is running:
   ```bash
   docker-compose ps
   ```

2. Verify database credentials in `.env`

3. Check logs:
   ```bash
   docker-compose logs postgres
   ```

### Application Won't Start

1. View logs:
   ```bash
   docker-compose logs nestjs-api
   ```

2. Rebuild images:
   ```bash
   docker-compose up -d --build
   ```

3. Clear everything and start fresh:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

## Next Steps

1. **Add Authentication**
   - Implement JWT
   - Add Login/Register endpoints

2. **Add More Models**
   - Products, Orders, Categories, etc.
   - Define relationships

3. **Add Testing**
   - Unit tests for services
   - Integration tests

4. **Add API Documentation**
   - Swagger/OpenAPI

5. **Add Logging**
   - Implement logging service

## Directory Structure

```
.
├── src/
│   ├── users/           # User module
│   ├── prisma/          # Prisma service
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   └── schema.prisma
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── package.json
└── README.md
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com)
- [Nginx Documentation](https://nginx.org)

## Support

For issues or questions:
1. Check the logs: `docker-compose logs`
2. Verify `.env` configuration
3. Review API documentation in README.md
