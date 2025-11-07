import { Review, Instructor, Payment, Progress, Notification } from './enhanced.model';

describe('Review Model', () => {
  it('should create review with all required properties', () => {
    const review: Review = {
      id: '1',
      workshopId: 'workshop1',
      userId: 'user1',
      userName: 'Test User',
      rating: 5,
      comment: 'Great workshop!',
      createdAt: new Date()
    };

    expect(review.id).toBe('1');
    expect(review.rating).toBe(5);
    expect(review.comment).toBe('Great workshop!');
  });

  it('should validate rating range', () => {
    const review: Review = {
      id: '1',
      workshopId: 'workshop1',
      userId: 'user1',
      userName: 'Test User',
      rating: 3,
      comment: 'Average workshop',
      createdAt: new Date()
    };

    expect(review.rating).toBeGreaterThanOrEqual(1);
    expect(review.rating).toBeLessThanOrEqual(5);
  });
});

describe('Instructor Model', () => {
  it('should create instructor with all required properties', () => {
    const instructor: Instructor = {
      id: '1',
      name: 'John Doe',
      bio: 'Experienced developer',
      rating: 4.8,
      totalStudents: 1500,
      specialties: ['React', 'Node.js']
    };

    expect(instructor.id).toBe('1');
    expect(instructor.name).toBe('John Doe');
    expect(instructor.specialties.length).toBe(2);
  });

  it('should support optional avatar', () => {
    const instructor: Instructor = {
      id: '1',
      name: 'Jane Smith',
      bio: 'Frontend expert',
      rating: 4.9,
      totalStudents: 2000,
      specialties: ['Vue.js', 'CSS'],
      avatar: 'https://example.com/avatar.jpg'
    };

    expect(instructor.avatar).toBe('https://example.com/avatar.jpg');
  });
});

describe('Payment Model', () => {
  it('should create payment with all required properties', () => {
    const payment: Payment = {
      id: '1',
      userId: 'user1',
      workshopId: 'workshop1',
      amount: 99.99,
      status: 'completed',
      createdAt: new Date()
    };

    expect(payment.id).toBe('1');
    expect(payment.amount).toBe(99.99);
    expect(payment.status).toBe('completed');
  });

  it('should support different payment statuses', () => {
    const statuses: Payment['status'][] = ['pending', 'completed', 'failed', 'refunded'];
    
    statuses.forEach(status => {
      const payment: Payment = {
        id: '1',
        userId: 'user1',
        workshopId: 'workshop1',
        amount: 99.99,
        status,
        createdAt: new Date()
      };
      
      expect(payment.status).toBe(status);
    });
  });
});

describe('Progress Model', () => {
  it('should create progress with all required properties', () => {
    const progress: Progress = {
      id: '1',
      userId: 'user1',
      workshopId: 'workshop1',
      completionPercentage: 75,
      lastAccessed: new Date()
    };

    expect(progress.id).toBe('1');
    expect(progress.completionPercentage).toBe(75);
  });

  it('should support optional certificate flag', () => {
    const progress: Progress = {
      id: '1',
      userId: 'user1',
      workshopId: 'workshop1',
      completionPercentage: 100,
      lastAccessed: new Date(),
      certificateIssued: true
    };

    expect(progress.certificateIssued).toBe(true);
  });

  it('should validate completion percentage range', () => {
    const progress: Progress = {
      id: '1',
      userId: 'user1',
      workshopId: 'workshop1',
      completionPercentage: 50,
      lastAccessed: new Date()
    };

    expect(progress.completionPercentage).toBeGreaterThanOrEqual(0);
    expect(progress.completionPercentage).toBeLessThanOrEqual(100);
  });
});

describe('Notification Model', () => {
  it('should create notification with all required properties', () => {
    const notification: Notification = {
      id: '1',
      userId: 'user1',
      type: 'workshop_reminder',
      title: 'Workshop Starting Soon',
      message: 'Your workshop starts in 1 hour',
      read: false,
      createdAt: new Date()
    };

    expect(notification.id).toBe('1');
    expect(notification.type).toBe('workshop_reminder');
    expect(notification.read).toBe(false);
  });

  it('should support different notification types', () => {
    const types: Notification['type'][] = [
      'workshop_reminder',
      'new_workshop',
      'completion',
      'payment'
    ];
    
    types.forEach(type => {
      const notification: Notification = {
        id: '1',
        userId: 'user1',
        type,
        title: 'Test Notification',
        message: 'Test message',
        read: false,
        createdAt: new Date()
      };
      
      expect(notification.type).toBe(type);
    });
  });

  it('should track read status', () => {
    const unreadNotification: Notification = {
      id: '1',
      userId: 'user1',
      type: 'new_workshop',
      title: 'New Workshop Available',
      message: 'Check out the new workshop',
      read: false,
      createdAt: new Date()
    };

    const readNotification: Notification = {
      ...unreadNotification,
      id: '2',
      read: true
    };

    expect(unreadNotification.read).toBe(false);
    expect(readNotification.read).toBe(true);
  });
});