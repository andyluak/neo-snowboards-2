import BaseTemplate from '/components/templates/base/BaseTemplate';

export default {
  title: 'templates/BaseTemplate',
  component: BaseTemplate,
};

const Template = (args) => <BaseTemplate {...args} />;

export const Base = Template.bind({});
