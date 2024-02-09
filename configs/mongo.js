'use strict';

import mongoose from 'mongoose';

export const connect = async () => {
  try {
    mongoose.connection.on('error', (error) => {
      console.log('Error connecting to the database');
      mongoose.disconnect();
    });

    mongoose.connection.on('connecting', () => {
      console.log('Connecting to the database');
    });

    mongoose.connection.on('connected', () => {
      console.log('Connected to the database');
    });

    mongoose.connection.on('open', () => {
      console.log('Database connection opened');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Database connection disconnected');
    });
    
    await mongoose.connect('mongodb://localhost:27017/AdoptionSystem');
    console.log('Connected to the database');

  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}
