import { Workshop, User, Enrollment } from './workshop.model';

describe('Workshop Model', () => {
  it('should create workshop instance', () => {
    const workshop: Workshop = {
      id: '1',
      title: 'Test',
      description: 'Desc',
      instructor: 'John',
      duration: 60,
      price: 100,
      category: 'Tech',
      level: 'Beginner',
      maxParticipants: 20,
      currentParticipants: 5,
      startDate: new Date(),
      endDate: new Date(),
      tags: ['test'],
      isLive: true,
    };
    expect(workshop.id).toBe('1');
  });

  it('should create user instance', () => {
    const user: User = {
      id: '1',
      email: 'test@test.com',
      name: 'Test',
      role: 'student',
      enrolledWorkshops: [],
      completedWorkshops: [],
    };
    expect(user.role).toBe('student');
  });

  it('should create enrollment instance', () => {
    const enrollment: Enrollment = {
      id: '1',
      userId: '1',
      workshopId: '1',
      enrolledAt: new Date(),
      status: 'enrolled',
      progress: 0,
    };
    expect(enrollment.status).toBe('enrolled');
  });
});
