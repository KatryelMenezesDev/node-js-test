import { Sequelize } from "sequelize";

let instance: Sequelize | undefined;

const SequelizeClient = {
  getInstance(): Sequelize {
    if (!instance) {
      instance = new Sequelize({
        dialect: "mysql",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER || "app_user",
        password: process.env.DB_PASS || "app_password",
        database: process.env.DB_NAME || "node_js_test",
        logging: process.env.NODE_ENV === "development" ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: true,
          underscored: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      });
    }

    return instance;
  },

  async syncModels(): Promise<void> {
    try {
      await import("./models");

      const sequelize = SequelizeClient.getInstance();

      await sequelize.sync({ alter: false });
      console.log("📋 Tabelas sincronizadas com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao sincronizar tabelas:", error);
      throw error;
    }
  },

  async authenticate(): Promise<void> {
    try {
      const sequelize = SequelizeClient.getInstance();
      await sequelize.authenticate();
      console.log("✅ Conexão com MySQL estabelecida com sucesso!");

      await SequelizeClient.syncModels();
    } catch (error) {
      console.error("❌ Erro ao conectar com MySQL:", error);
      throw error;
    }
  },

  async close(): Promise<void> {
    if (instance) {
      await instance.close();
      console.log("🔌 Conexão com MySQL fechada.");
    }
  },
};

export { SequelizeClient };
export const sequelize = SequelizeClient.getInstance();
