import IconMail from '@assets/IconMail';
import { CONTACTS } from '@config/constants';
import { APP_CONTACT_ADDRESS, APP_CONTACT_EMAIL } from '@config/environment';
import { generateSuccessReceiptMessage } from '@utils/index';
import React, { type FormEvent } from 'react';

import {
  Button, ContactWrapper, Input, Textarea,
} from './styled';

const Contact: React.FC = () => {
  const {
    FORM_DATA: { PLACEHOLDERS, BUTTON }, ADDRESS_PREFIX, EMAIL_PREFIX, TITLE,
  } = CONTACTS;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, msg } = e.currentTarget.elements as unknown as {
      name: HTMLInputElement
      email: HTMLInputElement
      msg: HTMLTextAreaElement
    };

    if (name.value !== '' && email.value !== '' && msg.value !== '') {
      alert(generateSuccessReceiptMessage(name.value, email.value));
      name.value = '';
      email.value = '';
      msg.value = '';
    }
  };
  return (
    <ContactWrapper>
      <div>
        <h3>{TITLE}</h3>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder={PLACEHOLDERS.NAME} />
          <Input type="email" name="email" placeholder={PLACEHOLDERS.EMAIL} />
          <Textarea name="msg" id="msg" cols={30} rows={6} placeholder={PLACEHOLDERS.MSG} />
          <Button type="submit">{BUTTON}</Button>
        </form>
      </div>
      <div>
        <IconMail />
        <p>
          {EMAIL_PREFIX} <span>{APP_CONTACT_EMAIL}</span>
        </p>
        <p>
          {ADDRESS_PREFIX} <span>{APP_CONTACT_ADDRESS}</span>
        </p>
      </div>
    </ContactWrapper>
  );
};

export default Contact;
