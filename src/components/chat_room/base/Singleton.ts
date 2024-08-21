class Singleton<T> {
  private static _instance: any;

  public static get Instance(): any {
    if (this._instance == null) {
      this._instance = new this();
    }
    return this._instance;
  }
}

export default Singleton;
