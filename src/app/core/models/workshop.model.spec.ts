import { Workshop, User, Enrollment } from './workshop.model';

describe('Workshop Model', () => {
  it('should create workshop with all required properties', () => {
    const workshop: Workshop = {
      id: '1',
      title: 'Test Workshop',
      description: 'Test Description',
      instructor: 'Test Instructor',
      duration: 120,
      price: 99,
      category: 'Testing',
      level: 'Beginner',
      maxParticipants: 20,
      currentParticipants: 5,
      startDate: new Date(),
      endDate: new Date(),
      tags: ['test'],
      isLive: false
    };

    expect(workshop.id).toBe('1');
    expect(workshop.title).toBe('Test Workshop');
    expect(workshop.level).toBe('Beginner');
    expect(workshop.isLive).toBe(false);
  });

  it('should allow optional properties', () => {
    const workshop: Workshop = {
      id: '1',
      title: 'Test Workshop',
      description: 'Test Description',
      instructor: 'Test Instructor',
      duration: 120,
      price: 99,
      category: 'Testing',
      level: 'Beginner',
      maxParticipants: 20,
      currentParticipants: 5,
      startDate: new Date(),
      endDate: new Date(),
      tags: ['test'],
      isLive: false,
      imageUrl: 'https://example.com/image.jpg',
      meetingUrl: 'https://zoom.us/meeting'
    };

    expect(workshop.imageUrl).toBe('https://example.com/image.jpg');
    expect(workshop.meetingUrl).toBe('https://zoom.us/meeting');
  });
});

describe('User Model', () => {
  it('should create user with all required properties', () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'student',
      enrolledWorkshops: ['1', '2'],
      completedWorkshops: ['3']
    };

    expect(user.id).toBe('1');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('student');
    expect(user.enrolledWorkshops.length).toBe(2);
    expect(user.completedWorkshops.length).toBe(1);
  });

  it('should support different user roles', () => {
    const student: User = {
      id: '1',
      email: 'student@example.com',
      name: 'Student',
      role: 'student',
      enrolledWorkshops: [],
      completedWorkshops: []
    };

    const instructor: User = {
      id: '2',
      email: 'instructor@example.com',
      name: 'Instructor',
      role: 'instructor',
      enrolledWorkshops: [],
      completedWorkshops: []
    };

    const admin: User = {
      id: '3',
      email: 'admin@example.com',
      name: 'Admin',
      role: 'admin',
      enrolledWorkshops: [],
      completedWorkshops: []
    };

    expect(student.role).toBe('student');
    expect(instructor.role).toBe('instructor');
    expect(admin.role).toBe('admin');
  });
});

describe('Enrollment Model', () => {
  it('should create enrollment with all required properties', () => {
    const enrollment: Enrollment = {
      id: '1',
      userId: 'user1',
      workshopId: 'workshop1',
      enrolledAt: new Date(),
      status: 'enrolled',
      progress: 50
    };

    expect(enrollment.id).toBe('1');
    expect(enrollment.userId).toBe('user1');
    expect(enrollment.workshopId).toBe('workshop1');
    expect(enrollment.status).toBe('enrolled');
    expect(enrollment.progress).toBe(50);
  });

  it('should support different enrollment statuses', () => {
    const enrolled: Enrollment = {
      id: '1',
      userId: 'user1',
      workshopId: 'workshop1',
      enrolledAt: new Date(),
      status: 'enrolled',
      progress: 25
    };

    const completed: Enrollment = {
      id: '2',
      userId: 'user1',
      workshopId: 'workshop2',
      enrolledAt: new Date(),
      status: 'completed',
      progress: 100
    };

    const cancelled: Enrollment = {
      id: '3',
      userId: 'user1',
      workshopId: 'workshop3',
      enrolledAt: new Date(),
      status: 'cancelled',
      progress: 0
    };

    expect(enrolled.status).toBe('enrolled');
    expect(completed.status).toBe('completed');
    expect(cancelled.status).toBe('cancelled');
  });
});