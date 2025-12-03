export const verificationEmailTemplate = (token: string) => {
    return `
    <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        border: 1px solid #eaeaea;
    ">
        <h2 style="color: #333; text-align: center;">Verify Your Email</h2>

        <p style="font-size: 15px; color: #555;">
            Please use the verification token below to verify your email address.
        </p>

        <div style="
            text-align: center;
            margin: 30px 0;
            padding: 14px;
            background-color: #f4f4f4;
            border-radius: 6px;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 1px;
            color: #333;
        ">
            ${token}
        </div>

        <p style="font-size: 14px; color: #777;">
            If you did not request this, you can safely ignore this email.
        </p>
    </div>
    `;
};
