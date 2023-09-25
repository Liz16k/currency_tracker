import React from 'react';

import IconMail from './IconMail';
import S from './styled';

const Contact = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const [name, email, msg] = e.target.elements;
    if (name.value !== '' && email.value !== '' && msg.value !== '') {
      alert(
        `We get your message, ${name.value}, thank you!\nYou are getting our response on email: ${email.value}`,
      );
      name.value = '';
      email.value = '';
      msg.value = '';
    }
  };
  return (
    <S.ContactWrapper>
      <div>
        <h3>Contact us</h3>
        <form onSubmit={handleSubmit}>
          <S.Input type="text" name="name" placeholder="Full Name" />
          <S.Input type="email" name="email" placeholder="E-mail" />
          <S.Textarea name="msg" id="msg" cols={30} rows={6} placeholder="Your message" />
          <S.Button>Contact us</S.Button>
        </form>
      </div>
      <div>
        <IconMail />
        <p>
          Contact <p>example@currency.com</p>
        </p>
        <p>
          Based in <p>123 Main Street Anytown, USA Postal Code: 12345</p>
        </p>
      </div>
    </S.ContactWrapper>
  );
};

export default Contact;
