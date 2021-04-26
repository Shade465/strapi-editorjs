import Undo from 'editorjs-undo';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import EditorJs from 'react-editor-js';
import { auth, request } from 'strapi-helper-plugin';
import styled from 'styled-components';
import { EditorTools } from './tools';
const isEqual = require('react-fast-compare');

const EditorWrapper = styled.div`
  .codex-editor {
    min-height: 200px;
    padding-top: 50px;
    border: 1px solid rgb(227, 233, 243);
    border-radius: 2px;
    color: rgb(56 56 56);
    .codex-editor__redactor {
      padding-bottom: 100px !important;
    }
  }
`;

const Editor = ({ onChange, name, value }) => {
  const [enabledReinitialize, setEnabledReinitialize] = useState(true);
  console.log(strapi.backendURL);

  const onSave = (api, data) => {
    try {
      const dataString = JSON.stringify(data);
      onChange({ target: { name, value: dataString } });
    } catch (e) {}
  };

  const onCompareBlocks = (oldBLocks, newBLocks) => {
    setEnabledReinitialize(false);
    return isEqual(oldBLocks, newBLocks);
  };

  const onReady = () => {
    const waitDataInterval = setInterval(() => {
      if (enabledReinitialize || data) {
        clearInterval(waitDataInterval);
        const undo = new Undo({ editor });
        undo.initialize(JSON.parse(value));
      }
    });
  };

  return (
    <EditorWrapper>
      <EditorJs
        data={JSON.parse(value)}
        onChange={onSave}
        onCompareBlocks={onCompareBlocks}
        enableReInitialize={enabledReinitialize}
        tools={EditorTools(auth, request)}
        onReady={onReady}
        editorInstance={(editorInstance) => {
          editor = editorInstance;
        }}
      />
    </EditorWrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Editor;
