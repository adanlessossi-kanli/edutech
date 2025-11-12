import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load notifications on init', () => {
    component.ngOnInit();

    expect(component.notifications().length).toBeGreaterThan(0);
  });

  it('should display notifications', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const notificationItems = fixture.nativeElement.querySelectorAll('.notification-item');
    expect(notificationItems.length).toBeGreaterThan(0);
  });

  it('should show unread notifications with special styling', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const unreadNotifications = fixture.nativeElement.querySelectorAll('.notification-item.unread');
    expect(unreadNotifications.length).toBeGreaterThan(0);
  });

  it('should mark notification as read', () => {
    component.ngOnInit();
    const notification = component.notifications()[0];
    notification.read = false;

    component.markAsRead(notification);

    expect(notification.read).toBe(true);
  });

  it('should mark all notifications as read', () => {
    component.ngOnInit();

    component.markAllAsRead();

    const allRead = component.notifications().every((n) => n.read);
    expect(allRead).toBe(true);
  });

  it('should get correct notification icon', () => {
    expect(component.getNotificationIcon('workshop_reminder')).toBe('⏰');
    expect(component.getNotificationIcon('new_workshop')).toBe('🆕');
    expect(component.getNotificationIcon('completion')).toBe('🎉');
    expect(component.getNotificationIcon('payment')).toBe('💳');
    expect(component.getNotificationIcon('unknown')).toBe('📢');
  });

  it('should display notification icons', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('.notification-icon');
    expect(icons.length).toBeGreaterThan(0);
    expect(icons[0].textContent).toBeTruthy();
  });

  it('should show read button for unread notifications', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const readButtons = fixture.nativeElement.querySelectorAll('.read-btn');
    expect(readButtons.length).toBeGreaterThan(0);
  });

  it('should display notification content', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const titles = fixture.nativeElement.querySelectorAll('.notification-content h4');
    const messages = fixture.nativeElement.querySelectorAll('.notification-content p');

    expect(titles.length).toBeGreaterThan(0);
    expect(messages.length).toBeGreaterThan(0);
    expect(titles[0].textContent).toBeTruthy();
    expect(messages[0].textContent).toBeTruthy();
  });

  it('should show mark all read button', () => {
    fixture.detectChanges();

    const markAllBtn = fixture.nativeElement.querySelector('.mark-read-btn');
    expect(markAllBtn).toBeTruthy();
    expect(markAllBtn.textContent).toBe('Mark All Read');
  });

  it('should display notification timestamps', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const timestamps = fixture.nativeElement.querySelectorAll('.notification-time');
    expect(timestamps.length).toBeGreaterThan(0);
  });

  it('should show no notifications message when empty', () => {
    spyOn(component, 'loadNotifications');
    fixture.detectChanges();
    component.notifications.set([]);
    fixture.detectChanges();

    const noNotifications = fixture.nativeElement.querySelector('.no-notifications');
    expect(noNotifications).toBeTruthy();
    expect(noNotifications.textContent).toContain('No notifications');
  });

  it('should handle click on mark as read button', () => {
    component.ngOnInit();
    const notification = component.notifications()[0];
    notification.read = false;
    fixture.detectChanges();

    spyOn(component, 'markAsRead');
    const readBtn = fixture.nativeElement.querySelector('.read-btn');
    if (readBtn) {
      readBtn.click();
    }
    expect(component.markAsRead).toHaveBeenCalled();
  });
});
