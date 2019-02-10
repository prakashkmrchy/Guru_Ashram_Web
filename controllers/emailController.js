const sgMail = require('@sendgrid/mail');

const key = "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";

sgMail.setApiKey(key);

function send(emailId, sub, msg, name){
    console.log(msg);
    console.log(sgMail);
    const message = {
        to: "satyamvats5@gmail.com",
        from: 'admin@guruaashram.com',
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
    const name = req.body.name;
    const email = req.body.email;
    const sub = req.body.sub;
    const msg = req.body.msg;
    send(email, sub, msg, name)
        .then(() => {
            console.log("EMail Sent");
    })
    res
        .status(200)
        .redirect('/');
}
