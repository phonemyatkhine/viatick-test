declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: Number;
      DB_DRIVER: String;
      DB_HOST: String;
      DB_PORT: Number;
      DB_USER: String;
      DB_PASSWORD: String;
      DB_NAME: String;
      GRAPH_THRESHOLD: String;
    }
  }
}

export {};
