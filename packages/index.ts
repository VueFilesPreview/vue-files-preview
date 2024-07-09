import Preview from "./preview/index";

const install = app => {
  app.use(Preview)
};

const Vue3Preview = {
  install,
  Preview
};

export {
  Preview
};

export default Vue3Preview;
