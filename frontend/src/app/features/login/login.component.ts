import { Component, OnInit, OnDestroy } from "@angular/core";
import taglines from "./taglines.json";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="logo-area">
          <span class="logo-icon">🗺️</span>
          <h1 class="app-name">תִּדְרֹךְ</h1>
          <p class="tagline" [class.hidden]="!taglineVisible">
            {{ currentTagline }}
          </p>
        </div>

        <div class="map-preview">
          <div class="map-dots">
            @for (dot of previewDots; track dot.id) {
              <div
                class="dot"
                [class.visited]="dot.visited"
                [style.left.%]="dot.x"
                [style.top.%]="dot.y"
              ></div>
            }
          </div>
        </div>

        <div class="cta">
          <a href="/auth/google" class="google-btn">
            <svg
              class="google-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            כניסה עם Google
          </a>
        </div>

        <p class="disclaimer">
          כניסה מהווה הסכמה לתיעוד ההרפתקאות שלך ברחבי ארץ ישראל.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .login-page {
        min-height: 100vh;
        background: linear-gradient(
          135deg,
          #1a3a2a 0%,
          #0d2418 50%,
          #162b1e 100%
        );
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }

      .login-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 48px 40px;
        max-width: 420px;
        width: 100%;
        text-align: center;
      }

      .logo-area {
        margin-bottom: 32px;
      }

      .logo-icon {
        font-size: 48px;
        display: block;
        margin-bottom: 12px;
      }

      .app-name {
        font-size: 42px;
        font-weight: 700;
        color: #fff;
        margin: 0 0 8px;
        letter-spacing: -1px;
      }

      .tagline {
        color: rgba(255, 255, 255, 0.6);
        font-size: 15px;
        margin: 0;
        min-height: 1.6em;
        transition: opacity 0.4s ease;
        opacity: 1;

        &.hidden {
          opacity: 0;
        }
      }

      .map-preview {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 16px;
        height: 160px;
        position: relative;
        overflow: hidden;
        margin-bottom: 32px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .map-dots {
        position: absolute;
        inset: 0;
      }

      .dot {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: all 0.3s;
      }

      .dot.visited {
        background: #4caf50;
        box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
      }

      .google-btn {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        background: #fff;
        color: #333;
        text-decoration: none;
        padding: 14px 28px;
        border-radius: 50px;
        font-size: 15px;
        font-weight: 500;
        transition:
          box-shadow 0.2s,
          transform 0.1s;
        width: 100%;
        justify-content: center;
      }

      .google-btn:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-1px);
      }

      .google-btn:active {
        transform: translateY(0);
      }

      .google-icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .disclaimer {
        margin-top: 20px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
        line-height: 1.5;
      }
    `,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  taglines: string[] = taglines;

  currentTagline = this.taglines[0];
  taglineVisible = true;
  private taglineIndex = 0;
  private interval: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.taglineVisible = false;
      setTimeout(() => {
        this.taglineIndex = (this.taglineIndex + 1) % this.taglines.length;
        this.currentTagline = this.taglines[this.taglineIndex];
        this.taglineVisible = true;
      }, 400);
    }, 3500);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  previewDots = [
    { id: 1, x: 20, y: 30, visited: true },
    { id: 2, x: 35, y: 55, visited: true },
    { id: 3, x: 50, y: 25, visited: false },
    { id: 4, x: 60, y: 70, visited: true },
    { id: 5, x: 75, y: 40, visited: false },
    { id: 6, x: 45, y: 80, visited: false },
    { id: 7, x: 80, y: 65, visited: true },
    { id: 8, x: 25, y: 75, visited: false },
    { id: 9, x: 65, y: 20, visited: false },
    { id: 10, x: 55, y: 50, visited: true },
  ];
}
