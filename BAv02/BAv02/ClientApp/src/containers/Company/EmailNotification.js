import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const EmailNotification = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pse5655",
        "contact_form",
        form.current,
        "T3f7YHoKAEaq1EEmI"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="to_name" />
      <label>Email</label>
      <input type="email" name="from_name" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
export default EmailNotification;
