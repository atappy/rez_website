export const prerender = false; // Forces this route to run on the server dynamically

import type {APIRoute} from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({request}) => {
    try {
        let email = '';
        const contentType = request.headers.get('content-type') || '';

        // Safely parse email whether sent via standard HTML form or JavaScript JSON
        if (contentType.includes('application/json')) {
            const body = await request.json();
            email = body.email;
        } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
            const data = await request.formData();
            email = data.get('email') as string;
        }

        if (!email || typeof email !== 'string') {
            return new Response(JSON.stringify({message: 'Adresse email invalide'}), {status: 400});
        }

        const transporter = nodemailer.createTransport({
            host: import.meta.env.SMTP_HOST,
            port: Number(import.meta.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: import.meta.env.SMTP_USER,
                pass: import.meta.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: import.meta.env.SMTP_USER,
            to: import.meta.env.SMTP_USER,
            subject: 'Nouvelle inscription newsletter - La Troupe du Rez',
            text: `Nouvelle inscription à la newsletter : ${email}`,
            html: `<p><strong>Nouvelle inscription à la newsletter :</strong> ${email}</p>`,
        });

        return new Response(JSON.stringify({message: 'Inscription réussie !'}), {status: 200});
    } catch (error) {
        console.error('Erreur API Newsletter:', error);
        return new Response(JSON.stringify({message: 'Erreur lors de l\'envoi'}), {status: 500});
    }
};