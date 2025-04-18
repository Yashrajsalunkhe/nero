import transporter from "./mailer";
import dotenv from 'dotenv';
dotenv.config();

export async function sendWelcomeEmail(to: string, id: string, name: string, yearOfStudy:string, phone:string, eventName: string, college: string, ): Promise<void> {
    try {
        await transporter.sendMail({
            from: `"Neuroverse 2025" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Welcome to Neuroverse 2K25 🎉',
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                        <title>Welcome to Neuroverse 2025!</title>
                        <style>
                        body {
                            margin: 0;
                            padding: 40px 20px;
                            background: linear-gradient(135deg, indigo, blue, purple, gold);
                            background-size: 400% 400%;
                            animation: gradientBG 20s ease infinite;
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        }

                        @keyframes gradientBG {
                            0% {
                            background-position: 0% 50%;
                            }
                            50% {
                            background-position: 100% 50%;
                            }
                            100% {
                            background-position: 0% 50%;
                            }
                        }

                        .container {
                            max-width: 640px;
                            margin: auto;
                            background: #ffffffdd;
                            border-radius: 16px;
                            padding: 30px;
                            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }

                        .logo-wrapper {
                            display: flex;
                            justify-content: center;
                            margin-bottom: 20px;
                        }

                        .logo {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            background: white;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        }

                        .gradient-text {
                            font-size: 26px;
                            font-weight: bold;
                            letter-spacing: 0.5px;
                            margin-bottom: 20px;
                            background: linear-gradient(90deg, #4b0082, #1e90ff, #8e44ad, #f1c40f);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            display: inline-block;
                        }

                        .content {
                            text-align: left;
                            font-size: 16px;
                            color: #2f3640;
                            line-height: 1.6;
                            font-family: monospace;
                        }

                        .highlight-card {
                            margin: 24px 0;
                            background: #f5f7fa;
                            border-radius: 12px;
                            padding: 20px;
                            border-left: 5px solid #1e90ff;
                            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                        }

                        .btn {
                            display: inline-block;
                            background-color: #1e90ff;
                            color: white;
                            padding: 12px 24px;
                            text-decoration: none;
                            border-radius: 8px;
                            font-weight: 600;
                            font-size: 15px;
                            margin-top: 15px;
                            box-shadow: 0 2px 8px rgba(30, 144, 255, 0.3);
                        }

                        .footer {
                            text-align: center;
                            margin-top: 40px;
                            font-size: 13px;
                            color: #555;
                        }

                        .footer span {
                            display: block;
                            margin-top: 8px;
                            font-style: italic;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <div class="logo-wrapper">
                            <img
                            alt="Event Logo"
                            src="https://nero-henna.vercel.app/logo.png"
                            class="logo"
                            />
                        </div>

                        <div class="gradient-text">Neuroverse 2025: Welcome Onboard! 🎉</div>

                        <div class="content">
                            Hello <strong>${name}</strong>,
                            <br /><br />
                            <span>
                            You’ve successfully registered for
                            <strong>${eventName}</strong> as part of
                            <strong>Neuroverse 2025</strong>! We’re super excited to have you
                            onboard.
                            </span>
                            🚀
                            <br /><br />
                            Here's your registration summary:
                            <div class="highlight-card">
                            <strong>Registration ID:</strong> ${id}<br />
                            <strong>College:</strong> ${college}<br />
                            <strong>Year of Study:</strong> ${yearOfStudy}<br />
                            <strong>Phone Number:</strong> ${phone}<br />
                            </div>
                            🔔 Stay tuned for further updates, schedules, and announcements via
                            email and our official page.
                            <div style="margin-top: 20px; text-align: center">
                            <a href="https://nero-henna.vercel.app/" class="btn"
                                >View Event Details</a
                            >
                            </div>
                        </div>

                        <div class="footer">
                            Have questions? Just reply to this email. 💬
                            <br />
                            <span>We’ll see you at the event – Team Neuroverse 🧠✨</span>
                        </div>
                        </div>
                    </body>
                    </html>`

        });
    } catch (error) {
        console.error('Failed to send welcome email:', error);
    }
}

export default transporter;
