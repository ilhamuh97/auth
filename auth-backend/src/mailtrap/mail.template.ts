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


export const welcomeEmailTemplate = (name: string) => {
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
        <h2 style="color: #333; text-align: center;">Welcome to Our Platform</h2>

        <p style="font-size: 15px; color: #555;">
            Hello <strong>${name}</strong>,
        </p>

        <p style="font-size: 15px; color: #555;">
            Your account has been successfully verified. We are happy to have you with us!
        </p>

        <p style="font-size: 15px; color: #555;">
            You can now sign in and start using all available features.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
            If you did not create this account, please ignore this email.
        </p>
    </div>
    `;
};

export const forgotPasswordEmailTemplate = (resetTokenLink: string) => {
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

        <h2 style="color: #333; text-align: center;">Reset Your Password</h2>

        <p style="font-size: 15px; color: #555;">
            A request has been received to reset your password. If you made this request, click the button below:
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetTokenLink}" 
                style="
                    display: inline-block;
                    padding: 12px 22px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                ">
                Reset Password
            </a>
        </div>

        <p style="font-size: 14px; color: #777;">
            Or copy and paste this link into your browser:
        </p>

        <p style="
            word-break: break-all;
            font-size: 13px;
            color: #555;
        ">
            ${resetTokenLink}
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
            If you did not request a password reset, no action is needed and your account remains secure.
        </p>
    </div>
    `;
};

export const resetPasswordSuccessEmailTemplate = (name: string) => {
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

        <h2 style="color: #333; text-align: center;">Password Reset Successful</h2>

        <p style="font-size: 15px; color: #555;">
            Hello <strong>${name}</strong>,
        </p>

        <p style="font-size: 15px; color: #555; line-height: 1.6;">
            Your password has been successfully reset. You may now sign in using your new credentials.
        </p>

        <p style="font-size: 15px; color: #555; line-height: 1.6;">
            If this action was not performed by you, please contact our support team immediately.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
    `;
};
