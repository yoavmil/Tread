import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="about-card" dir="rtl">
      <button mat-icon-button class="back-btn" (click)="close()">
        <mat-icon>close</mat-icon>
      </button>

      <h1>למה צריך עוד מפה?</h1>

      <p>
        לא באנו להתחרות עם גוגל מפות וגם לא עם
        <a href="https://amudanan.co.il/" target="_blank" rel="noopener">עמוד ענן המעולה</a>.
      </p>
      <p>
        המפה הזו באה לרכז את 1000 המקומות שכל ישראלי חייב לבקר בהם,
        והיא מאפשרת מעקב איפה היינו ומה כבר עשינו.
        <span>Been there, done that.</span>
      </p>
      <p>
        מטרת המפה היא לעודד טיולים לאורכה ולרוחבה של ארץ ישראל,
        ולעודד את אהבת הארץ.
      </p>
      <p class="invite">
        האתר עדיין בבניה, ואתם מוזמנים להיות שותפים —
        להציע מקומות חדשים ולערוך מקומות קיימים.
      </p>
    </div>
  `,
  styles: [`
    .about-card {
      padding: 28px 32px 36px;
      position: relative;
    }

    .back-btn {
      color: #555;
      margin-bottom: 8px;
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1a3a2a;
      margin: 0 0 24px;
    }

    p {
      font-size: 16px;
      line-height: 1.75;
      color: #333;
      margin: 0 0 16px;
    }

    a {
      color: #1a3a2a;
      font-weight: 600;
      text-underline-offset: 3px;
    }

    em {
      font-style: normal;
      color: #888;
      font-size: 14px;
    }

    .invite {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;
      color: #555;
    }
  `]
})
export class AboutComponent {
  constructor(private dialogRef: MatDialogRef<AboutComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
