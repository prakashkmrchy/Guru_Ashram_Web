const sgMail = require('@sendgrid/mail');
const key = require('../utils/config');

sgMail.setApiKey(key.key);

function send(emailId, sub, msg, name){
    console.log(key.key);
    ///console.log(sgMail);
    const message = {
        to: "rasrok4@gmail.com",
        from: "satyamkumar13254@gmail.com",
        subject: sub,
        text: `You got a below response from Mr./Ms./Mrs. ${name} from ${emailId}: \n ${msg}`
      };
	return new Promise((resolve,reject)=>{
        sgMail
            .send(message)
            .then(resolve)
            .catch(reject => {
                console.log(reject);
            });
	});
};


exports.sendResponse = (req, res, next) => {
    console.log(req.body);
    const name = req.body.Name;
    const email = req.body.email;
    const sub = req.body.subject;
    const msg = req.body.message;
    console.log(name, email, sub, msg);
    send(email, sub, msg, name)
        .then(() => {
            console.log("EMail Sent");
    })
    .catch(err => {
        console.log(err);
    })
    res
        .status(200)
        .redirect('/');
}
