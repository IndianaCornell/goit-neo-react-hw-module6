import React from "react";
import Contact from "../Contact/Contact";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import css from "./ContactList.module.css";

function ContactList() {
  const contacts = useSelector((state) => state.contacts);

  const filter = useSelector((state) => state.filter);

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={clsx(css.contactList)}>
      {visibleContacts.map((contact) => (
        <Contact key={contact.id} name={contact.name} number={contact.number} />
      ))}
    </ul>
  );
}

export default ContactList;
