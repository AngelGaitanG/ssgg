import 'dotenv/config';
import * as Joi from 'joi';

export interface EnvVars {
  PORT: number;
  RESTAURANT_URL_API: string;
  DB_NAME: string;
  MONGODB: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  FRONTEND_URL: string;
  JWT_SECRET: string;
  GROQ_API_KEY: string;
  AZURE_ENDPOINT: string;
  AZURE_API_KEY: string;
  AZURE_OPENAI_API_VERSION: string;
  AZURE_MODEL: string;
  AZURE_WHISPER_DEPLOY: string;
  PINECONE_INDEX_NAME: string;
  PINECONE_API_KEY: string;
  OPENAI_API_KEY: string;
  POST_DELIVERY: string;
  ENVIRONMENT: string;
  DEEPSEEK_ENDPOINT?: string;
  DEEPSEEK_API_KEY?: string;
  DEEPSEEK_MODEL?: string;
}

export const envSchema = Joi.object({
  PORT: Joi.number().required(),
  RESTAURANT_URL_API: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  MONGODB: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  GROQ_API_KEY: Joi.string().required(),
  AZURE_ENDPOINT: Joi.string().required(),
  AZURE_API_KEY: Joi.string().required(),
  AZURE_OPENAI_API_VERSION: Joi.string().required(),
  AZURE_MODEL: Joi.string().required(),
  AZURE_WHISPER_DEPLOY: Joi.string().required(),
  PINECONE_INDEX_NAME: Joi.string().required(),
  PINECONE_API_KEY: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().required(),
  POST_DELIVERY: Joi.string().required(),
  ENVIRONMENT: Joi.string().required(),
  DEEPSEEK_ENDPOINT: Joi.string().default('https://api.deepseek.com'),
  DEEPSEEK_API_KEY: Joi.string().default(''),
  DEEPSEEK_MODEL: Joi.string().default('deepseek-chat'),
}).unknown(true);

export const envConfig = () => {
  const { error, value } = envSchema.validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    port: value.PORT,
    restaurantUrlApi: value.RESTAURANT_URL_API,
    database: {
      name: value.DB_NAME,
      uri: value.MONGODB,
    },
    cloudinary: {
      cloudName: value.CLOUDINARY_CLOUD_NAME,
      apiKey: value.CLOUDINARY_API_KEY,
      apiSecret: value.CLOUDINARY_API_SECRET,
    },
    frontendUrl: value.FRONTEND_URL,
    jwtSecret: value.JWT_SECRET,
    groqApiKey: value.GROQ_API_KEY,
    azure: {
      endpoint: value.AZURE_ENDPOINT,
      apiKey: value.AZURE_API_KEY,
      apiVersion: value.AZURE_OPENAI_API_VERSION,
      model: value.AZURE_MODEL,
      whisperDeploy: value.AZURE_WHISPER_DEPLOY,
    },
    pinecone: {
      indexName: value.PINECONE_INDEX_NAME,
      apiKey: value.PINECONE_API_KEY,
    },
    openaiApiKey: value.OPENAI_API_KEY,
    postDelivery: value.POST_DELIVERY,
    environment: value.ENVIRONMENT,
    deepseek: {
      endpoint: value.DEEPSEEK_ENDPOINT,
      apiKey: value.DEEPSEEK_API_KEY,
      model: value.DEEPSEEK_MODEL,
    },
  };
};
