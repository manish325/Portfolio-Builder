import { Injectable } from "@angular/core";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class LocalStorageService {
  constructor() {}

  /**
   * @description
   * Save data to local storage
   * @param key
   * @param value
   */
  public save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getLocaleState(key : string, skipParsing ?: false) {
    const value = localStorage.getItem(key);
    if(value) {
        if (skipParsing) {
            return value;
        }
        return JSON.parse(value);
    }
    return value;
  }

  public clearItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * @description
   * Get data from local storage
   * @param key
   */
}