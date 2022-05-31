import BaseTemplate from '/components/templates/base/BaseTemplate';

//eslint-disable-next-line
export default {
    title: 'templates/BaseTemplate',
    component: BaseTemplate,
};

const Template = (args) => <BaseTemplate {...args} />;

export const Base = Template.bind({});
