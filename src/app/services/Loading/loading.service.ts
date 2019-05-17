/**
 * A service that controls the logic of the
 * loading component
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: boolean;
  constructor() {
    this.isLoading = false;
  }

  /**
   * Shows the loading component
   */
  startLoading(): void {
    this.isLoading = true;
  }

  /**
   * Hides the loading component
   */
  stopLoading(): void {
    this.isLoading = false;
  }
}
