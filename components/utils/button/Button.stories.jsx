import Button from '/components/utils/button/Button';

//eslint-disable-next-line
export default {
  title: 'utils/Button',
  component: Button,
};

const PrimaryTemplate = (args) => (
  <Button {...args} icon="utils/chevron-right.svg" />
);
const SecondaryTemplate = (args) => <Button {...args} variant="secondary" />;
const TertiaryTemplate = (args) => <Button {...args} variant="tertiary" />;

export const Primary = PrimaryTemplate.bind({});
export const Secondary = SecondaryTemplate.bind({});
export const Tertiary = TertiaryTemplate.bind({});
