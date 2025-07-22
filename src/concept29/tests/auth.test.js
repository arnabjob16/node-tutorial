const request = require('supertest');
const app = require('../../concept29'); // Ensure this exports your Express app
const mongoose = require('mongoose');
const path = require('path'); 

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Routes', () => {
  let token = '';
  let testEmail = 'test@mail.com';
  let resetToken = '';

  it('should signup a user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: testEmail,
        password: 'secret123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(testEmail);
  });

  it('should login and get JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'secret123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should reject invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'wrong' });

    expect(res.statusCode).toBe(401);
  });

  it('should upload profile image', async () => {
    const res = await request(app)
      .post('/api/users/upload-profile')
      .set('Authorization', `Bearer ${token}`)
      .attach('profile', path.join(__dirname, '../../../public/uploads/test-image.jpg'));

    expect(res.statusCode).toBe(200);
    expect(res.body.filename).toBeDefined();
    expect(res.body.message).toBe('File uploaded successfully');
  });

  it('should reject upload without file', async () => {
    const res = await request(app)
      .post('/api/users/upload-profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No file uploaded');
  });

  it('should reject upload without token', async () => {
    try {
      const res = await request(app)
        .post('/api/users/upload-profile')
        .attach('profile', path.join(__dirname, '../fixtures/test-image.jpg'));

        expect(res.statusCode).toBe(401); // Match your middleware response
        expect(res.body.message).toBe('No token provided');
    } catch (err) {
      console.error('❌ Upload test failed:', err);
      throw err;
    }
  });

  it('should generate reset password token', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: testEmail });

    expect(res.statusCode).toBe(200);
    expect(res.body.resetLink).toBeDefined();

    // Extract token from reset link
    const parts = res.body.resetLink.split('/');
    resetToken = parts[parts.length - 1];
    expect(resetToken.length).toBeGreaterThan(0);
  });

  it('should reset the password with token', async () => {
    const res = await request(app)
      .post(`/api/auth/reset-password/${resetToken}`)
      .send({ newPassword: 'newsecret123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Password reset successful/i);
  });

  it('should login with new password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'newsecret123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
