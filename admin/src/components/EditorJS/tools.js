import CheckList from '@editorjs/checklist';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Raw from '@editorjs/raw';
import SimpleImage from '@editorjs/simple-image';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';

export const EditorTools = (auth, request) => {
  return {
    embed: {
      class: Embed,
      inlineToolbar: true,
    },
    table: {
      class: Table,
      inlineToolbar: true,
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    warning: {
      class: Warning,
      inlineToolbar: true,
    },
    code: {
      class: Code,
      inlineToolbar: true,
    },
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: `${strapi.backendURL}/editorjs/fetchUrl`,
      },
    },
    raw: {
      class: Raw,
      inlineToolbar: true,
    },
    header: {
      class: Header,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
    },
    marker: {
      class: Marker,
      inlineToolbar: true,
    },
    checklist: {
      class: CheckList,
      inlineToolbar: true,
    },
    delimiter: {
      class: Delimiter,
      inlineToolbar: true,
    },
    inlineCode: {
      class: InlineCode,
      inlineToolbar: true,
    },
    simpleImage: {
      class: SimpleImage,
      inlineToolbar: true,
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: `${strapi.backendURL}/upload`,
          byUrl: `${strapi.backendURL}/upload`,
        },
        additionalRequestHeaders: {
          authorization: `Bearer ${auth.getToken()}`,
        },
        uploader: {
          uploadByFile(file) {
            const formData = new FormData();
            formData.append('files', file);
            const headers = {};

            return request(
              '/upload',
              { method: 'POST', headers, body: formData },
              false,
              false
            ).then((resp) => {
              return {
                success: 1,
                file: {
                  url: `${strapi.backendURL}${resp[0].url}`,
                },
              };
            });
          },
        },
      },
    },
  };
};
