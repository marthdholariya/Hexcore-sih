# SIH 26135 Backend API Documentation

## Base URL

http://localhost:5000

## Authentication

### Register

POST /api/auth/register

Authentication: Not required

### Login

POST /api/auth/login

Authentication: Not required

Returns a JWT token.

## Protected APIs

### Users

GET /api/users

Authentication: Required

Role: Admin

### Education

GET /api/education

Authentication: Required

### Training

GET /api/training

Authentication: Required

### Employment

GET /api/employment

Authentication: Required

### Follow-up

GET /api/followup

Authentication: Required

### Jobs

GET /api/jobs

Authentication: Required

### Planning

GET /api/planning

Authentication: Required

### Analytics

GET /api/analytics

Authentication: Required