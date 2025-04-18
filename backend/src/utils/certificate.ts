import { Request, Response, NextFunction, RequestHandler } from 'express';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import { Registration } from '../register';
import mongoose, { ConnectionStates } from 'mongoose';

/**
 * Ensures that a MongoDB connection is active before performing database operations
 * @returns Promise that resolves when connection is ready
 * @throws Error if connection cannot be established
 */
async function ensureDbConnection(): Promise<void> {
    if (mongoose.connection.readyState === 1) { // 1 is the value for connected state
        return;
    }

    console.log('MongoDB connection not ready, attempting to connect...');
    
    // Import using destructuring to avoid circular dependency issues
    const { connectToMongoDB } = require('../register');
    
    try {
        await connectToMongoDB();
        // @ts-ignore
        if (mongoose.connection.readyState !== 1) { // 1 is the value for connected state
            throw new Error('MongoDB connection failed after connection attempt');
        }
        
        console.log('MongoDB connection established successfully');
    } catch (error: unknown) {
        console.error('Failed to establish MongoDB connection:', error);
        throw new Error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export const generateCertificate: RequestHandler = async (req, res, next) => {
    const enabled = process.env.CERTIFICATE_DOWNLOAD_ENABLED === 'ON';
    if (req.method === 'PUT') {
        res.status(200).json({ success: enabled });
        return;
    }
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, error: 'Method not allowed' });
        return;
    }
    if (!enabled) {
        res.status(403).json({ success: false, error: 'Certificate downloads are disabled' });
        return;
    }

    const { name, email, phone, event: eventName } = req.body;

    if (!name || !email || !phone || !eventName) {
        res.status(400).json({ success: false, error: 'Name, email, phone, and event are required' });
        return;
    }

    // Verify user registration exists
    try {
        // Ensure DB connection is active before querying
        await ensureDbConnection();

        const existing = await Registration.findOne({ name, email, phone, event_name: eventName });
        if (!existing) {
            res.status(404).json({ success: false, error: 'User not registered for this event' });
            return;
        }
    } catch (err) {
        console.error('Error checking registration:', err);
        res.status(500).json({ success: false, error: 'Error checking registration' });
        return;
    }

    try {
        const templatePath = path.join(__dirname, '..', '..', 'templates', 'certificate_template.png');
        const image = await loadImage(templatePath);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        // Draw the template image
        ctx.drawImage(image, 0, 0, image.width, image.height);

        // Configure the text
        ctx.font = 'bold 42px Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        // Draw the name
        ctx.fillText(name, image.width / 2, image.height / 2 + 10);

        // Set headers and stream back the PNG
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${name}_certificate.png"`);

        canvas.createPNGStream().pipe(res);
    } catch (err) {
        console.error('Error generating certificate:', err);
        res.status(500).send('Error generating certificate');
    }
};
