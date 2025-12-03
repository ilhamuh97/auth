import { verificationEmailTemplate } from "./mail.template";
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
