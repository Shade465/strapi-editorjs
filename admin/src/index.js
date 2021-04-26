import pluginPkg from '../../package.json';
import EditorJS from './components/EditorJS';
import pluginId from './pluginId';

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: icon,
    id: pluginId,
    initializer: () => null,
    injectedComponents: [],
    isReady: true,
    isRequired: pluginPkg.strapi.required || false,
    mainComponent: null,
    name: name,
    preventComponentRendering: false,
    settings: null,
    trads: {},
    menu: {},
  };

  strapi.registerField({ type: 'wysiwyg', Component: EditorJS });

  return strapi.registerPlugin(plugin);
};
