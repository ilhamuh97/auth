import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN || "";

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "ilham@ilham-muhammad.com",
    name: "Ilham Muhammad",
};