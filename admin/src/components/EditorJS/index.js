import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { InputDescription, InputErrors, Label } from 'strapi-helper-plugin';
import EditorJS from './editor';

const EditorContainer = ({
  inputDescription,
  errors,
  label,
  name,
  noErrorsDescription,
  onChange,
  value,
}) => {
  let spacer = !isEmpty(inputDescription) ? (
    <div style={{ height: '.4rem' }} />
  ) : (
    <div />
  );

  if (!noErrorsDescription && !isEmpty(errors)) {
    spacer = <div />;
  }

  return (
    <div>
      <Label htmlFor={name} message={label} style={{ marginBottom: 10 }} />
      <EditorJS name={name} onChange={onChange} value={value} />
      <InputDescription
        message={inputDescription}
        style={!isEmpty(inputDescription) ? { marginTop: '1.4rem' } : {}}
      />
      <InputErrors
        errors={(!noErrorsDescription && errors) || []}
        name={name}
      />
      {spacer}
    </div>
  );
};

EditorContainer.defaultProps = {
  errors: [],
  label: '',
  noErrorsDescription: false,
};

EditorContainer.propTypes = {
  errors: PropTypes.array,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  noErrorsDescription: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default EditorContainer;
