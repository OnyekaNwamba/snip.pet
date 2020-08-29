import React from "react";
import {
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
} from "shards-react";

export default () => (
  <Form className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none" style={{ display: "flex", minHeight: "45px" }}>
    <InputGroup seamless className="ml-3">
      <InputGroupAddon type="prepend">
        <FormInput
          className="navbar-search"
          placeholder="Snippet Name"
          aria-label="snippet-name"
        />
      </InputGroupAddon>
    </InputGroup>
  </Form>
);
