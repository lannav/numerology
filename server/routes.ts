import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Since this is a client-side numerology application with localStorage,
  // we don't need additional server routes for data persistence
  // All calculations and storage are handled on the frontend

  const httpServer = createServer(app);
  return httpServer;
}
