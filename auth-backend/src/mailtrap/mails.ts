import { forgotPasswordEmailTemplate, verificationEmailTemplate, welcomeEmailTemplate } from "./mail.template";
import { mailtrapClient, sender } from "./mailtrap.config";

export const sendVerificationEmail = async (to: string, token: string) => {
    const recipient = [{
        email: to
    }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            text: `Please verify your email using this token: ${token}`,
            html: verificationEmailTemplate(token),
            category: "Email Verification",
        });

        return response;
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Could not send verification email");
    }
}

export const sendWelcomeEmail = async (to: string, name: string) => {
    const recipient = [{
        email: to
    }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Our Platform",
            text: `Welcome ${name}! Your account has been successfully verified.`,
            html: welcomeEmailTemplate(name),
            category: "Welcome Email",
        });
        return response;
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Could not send welcome email");
    }
}

export const sendForgotPasswordEmail = async (to: string, resetTokenLink: string) => {
    const recipient = [{
        email: to
    }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Request",
            text: `You can reset your password using this link: ${resetTokenLink}`,
            html: forgotPasswordEmailTemplate(resetTokenLink),
            category: "Password Reset",
        });

        return response;
    } catch (error) {
        console.error("Error sending forgot password email:", error);
        throw new Error("Could not send forgot password email");
    }
}