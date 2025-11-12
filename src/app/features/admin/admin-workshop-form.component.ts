import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../../core/services/workshop.service';
import { Workshop } from '../../core/models/workshop.model';

@Component({
  selector: 'app-admin-workshop-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>Publish New Workshop</h2>

      <form (ngSubmit)="onSubmit()" class="workshop-form">
        <input
          type="text"
          placeholder="Workshop Title"
          [(ngModel)]="title"
          name="title"
          required
          class="form-input"
        />

        <textarea
          placeholder="Description"
          [(ngModel)]="description"
          name="description"
          required
          class="form-textarea"
        ></textarea>

        <input
          type="text"
          placeholder="Instructor Name"
          [(ngModel)]="instructor"
          name="instructor"
          required
          class="form-input"
        />

        <div class="form-row">
          <input
            type="number"
            placeholder="Duration (minutes)"
            [(ngModel)]="duration"
            name="duration"
            required
            class="form-input"
          />

          <input
            type="number"
            placeholder="Price ($)"
            [(ngModel)]="price"
            name="price"
            required
            class="form-input"
          />
        </div>

        <div class="form-row">
          <select [(ngModel)]="category" name="category" required class="form-select">
            <option value="">Select Category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="DevOps">DevOps</option>
            <option value="Mobile">Mobile</option>
            <option value="Data Science">Data Science</option>
          </select>

          <select [(ngModel)]="level" name="level" required class="form-select">
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Max Participants"
          [(ngModel)]="maxParticipants"
          name="maxParticipants"
          required
          class="form-input"
        />

        <div class="form-row">
          <input
            type="datetime-local"
            [(ngModel)]="startDate"
            name="startDate"
            required
            class="form-input"
          />

          <input
            type="datetime-local"
            [(ngModel)]="endDate"
            name="endDate"
            required
            class="form-input"
          />
        </div>

        <input
          type="text"
          placeholder="Tags (comma separated)"
          [(ngModel)]="tagsInput"
          name="tags"
          class="form-input"
        />

        <button type="submit" class="submit-btn">Publish Workshop</button>
      </form>
    </div>
  `,
  styles: [
    `
      .form-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .form-container h2 {
        margin-bottom: 24px;
        color: #333;
      }
      .workshop-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .form-input,
      .form-textarea,
      .form-select {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
      }
      .form-textarea {
        min-height: 100px;
        resize: vertical;
      }
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .submit-btn {
        background: #10b981;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 8px;
      }
      .submit-btn:hover {
        background: #059669;
      }
    `,
  ],
})
export class AdminWorkshopFormComponent {
  private workshopService = inject(WorkshopService);

  title = '';
  description = '';
  instructor = '';
  duration = 0;
  price = 0;
  category = '';
  level = '';
  maxParticipants = 0;
  startDate = '';
  endDate = '';
  tagsInput = '';

  onSubmit() {
    const workshop: Workshop = {
      id: Date.now().toString(),
      title: this.title,
      description: this.description,
      instructor: this.instructor,
      duration: this.duration,
      price: this.price,
      category: this.category,
      level: this.level as 'Beginner' | 'Intermediate' | 'Advanced',
      maxParticipants: this.maxParticipants,
      currentParticipants: 0,
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate),
      tags: this.tagsInput.split(',').map((tag) => tag.trim()),
      isLive: false,
    };

    this.workshopService.addWorkshop(workshop);
    this.resetForm();
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.instructor = '';
    this.duration = 0;
    this.price = 0;
    this.category = '';
    this.level = '';
    this.maxParticipants = 0;
    this.startDate = '';
    this.endDate = '';
    this.tagsInput = '';
  }
}
