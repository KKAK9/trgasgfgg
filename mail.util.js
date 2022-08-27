import mailgun from 'mailgun-js';

const mailgunOptions = {
    apiKey: process.env.MAILGUN_KEY || '40655ac93b6dd743fc1ea449415ffdef-2bf328a5-4f9b72c3',
    domain: process.env.MAILGUN_DOMAIN || 'sandboxa3eb9f4674f9451ba94597ee3f8f23ba.mailgun.org',
};
export default class MailUtil {
    static async sendEmail({
                               from, to, subject, text, html, attachments,
                           }) {
        const mg = mailgun(mailgunOptions);
        const mailOptions = {
            from: `${from} <no-reply@${mailgunOptions.domain}>`, to, subject, text, html, attachments,
        };
        return mg.messages().send(mailOptions);
    }
}
