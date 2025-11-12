import { Review, Instructor, Payment, Progress, Notification } from './enhanced.model';

describe('Enhanced Models', () => {
  it('should create review', () => {
    const review: Review = {
      id: '1',
      workshopId: '1',
      userId: '1',
      userName: 'Test',
      rating: 5,
      comment: 'Great',
      createdAt: new Date(),
    };
    expect(review.rating).toBe(5);
  });

  it('should create instructor', () => {
    const instructor: Instructor = {
      id: '1',
      name: 'John',
      bio: 'Expert',
      rating: 4.5,
      totalStudents: 100,
      specialties: ['Tech'],
    };
    expect(instructor.specialties).toContain('Tech');
  });

  it('should create payment', () => {
    const payment: Payment = {
      id: '1',
      userId: '1',
      workshopId: '1',
      amount: 100,
      status: 'completed',
      createdAt: new Date(),
    };
    expect(payment.status).toBe('completed');
  });

  it('should create progress', () => {
    const progress: Progress = {
      id: '1',
      userId: '1',
      workshopId: '1',
      completionPercentage: 50,
      lastAccessed: new Date(),
    };
    expect(progress.completionPercentage).toBe(50);
  });

  it('should create notification', () => {
    const notification: Notification = {
      id: '1',
      userId: '1',
      type: 'new_workshop',
      title: 'New',
      message: 'Check it',
      read: false,
      createdAt: new Date(),
    };
    expect(notification.read).toBe(false);
  });
});
