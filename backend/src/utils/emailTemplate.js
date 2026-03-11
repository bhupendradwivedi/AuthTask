const verificationEmailTemplate = (link) => {

 return `
  <div style="background:#f4f6f8;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
    
    <div style="
      max-width:500px;
      margin:auto;
      background:white;
      padding:30px;
      border-radius:8px;
      text-align:center;
      box-shadow:0 2px 10px rgba(0,0,0,0.08);
    ">

      <h2 style="color:#333;margin-bottom:10px;">
        Email Verification
      </h2>

      <p style="color:#555;font-size:15px;margin-bottom:25px;">
        Thank you for registering. Please verify your email address by clicking the button below.
      </p>

      <div style="text-align:center;margin:25px 0;">
        <a href="${link}"
           style="
           display:inline-block;
           padding:12px 28px;
           background:#2563eb;
           color:white;
           text-decoration:none;
           border-radius:6px;
           font-size:15px;
           font-weight:600;
           ">
           Verify Email
        </a>
      </div>

      <p style="font-size:13px;color:#888;margin-top:20px;">
        If you did not create this account, you can safely ignore this email.
      </p>

    </div>

  </div>
 `
}

module.exports = {
 verificationEmailTemplate
}